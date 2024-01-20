// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.9;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {IAavePool} from "./../interfaces/IAavePool.sol";

import "@uniswap/lib/contracts/libraries/TransferHelper.sol";

import "./CreditSystem.sol";

import "./../interfaces/IInsuranceFund.sol";
import "./../interfaces/IBorrowFund.sol";
import "./../interfaces/ID4X.sol";

import "./../resolver/MixinResolver.sol";

interface IWrappedTokenGatewayV3 {
    function depositETH(
        address pool,
        address onBehalfOf,
        uint16 referralCode
    ) external payable;

    function withdrawETH(
        address pool,
        uint256 amount,
        address onBehalfOf
    ) external;

    function repayETH(
        address pool,
        uint256 amount,
        uint256 rateMode,
        address onBehalfOf
    ) external payable;

    function borrowETH(
        address pool,
        uint256 amount,
        uint256 interestRateMode,
        uint16 referralCode
    ) external;

    function withdrawETHWithPermit(
        address pool,
        uint256 amount,
        address to,
        uint256 deadline,
        uint8 permitV,
        bytes32 permitR,
        bytes32 permitS
    ) external;
}

interface IAaveOracle {
    function getAssetsPrices(
        address[] calldata assets
    ) external view returns (uint256[] memory);
}

/**
 * @title D4X Insurance Fund
 *
 * This contract contains the main profit of the service that can be used to cover the risks
 * of the protocol. If there are not enough funds on this contract, the risks will be assigned
 * to the ALP contract. This contract is not public because there are restrictions on calling
 * methods.
 *
 **/
contract BorrowFund is
    IBorrowFund,
    Ownable,
    MixinResolver,
    Pausable,
    WithdrawForce
{
    bytes32 private constant D4X_CONTRACT = "D4X";

    address public _aavePool;
    uint256 public undecollateralRiskParameter;

    address public _weth;

    IWrappedTokenGatewayV3 public gateway;
    ID4X public _d4x;
    IAaveOracle public _oracle;

    struct BorrowData {
        address asset;
        uint256 amount;
        uint256 collateral;
    }

    mapping(uint256 => BorrowData) public borrowsData;

    constructor(address resolver) MixinResolver(resolver) {}

    /**
     * @param pool Address from Deployments https://docs.aave.com/developers/
     * deployed-contracts/v3-testnet-addresses or https://docs.aave.com/
     * developers/deployed-contracts/v3-mainnet
     */
    function setAavePool(address pool) external onlyOwner whenNotPaused {
        if (pool == _aavePool) revert SameValue();

        emit AavePoolUpdated(_aavePool, pool);

        _aavePool = pool;
    }

    function setOracle(address addr) external {
        _oracle = IAaveOracle(addr);
    }

    function setWrappedTokenGatewayV3(address value) external {
        gateway = IWrappedTokenGatewayV3(value);
    }

    function setUndecollateralRiskParameter(uint256 value) external {
        undecollateralRiskParameter = value;
    }

    function borrow(
        uint256 leverageAmountNeeded,
        uint256 leverageNeed,
        address borrowToken
    ) external {
        // TODO: only alps

        (
            uint256 totalCollateralBase,
            uint256 totalDebtBase,
            uint256 availableBorrowsBase,
            uint256 currentLiquidationThreshold,
            uint256 ltv,
            uint256 healthFactor
        ) = IAavePool(_aavePool).getUserAccountData(address(this));

        uint256 minimumLeverage = ((100 * 1e18) /
            (10000 - currentLiquidationThreshold)) *
            undecollateralRiskParameter;

        require(
            minimumLeverage <= leverageNeed * 1e18,
            "BorrowFund: leverage too small"
        );

        address[] memory addr = new address[](2);

        addr[0] = _weth;
        addr[1] = borrowToken;

        uint256[] memory prices = _oracle.getAssetsPrices(addr);

        uint256 supplyForLeveragePositionToken = ((leverageAmountNeeded *
            10000) / ltv) / prices[0];

        gateway.depositETH{value: supplyForLeveragePositionToken}(
            _aavePool,
            address(this),
            0
        );

        uint256 amount = 0;

        IAavePool(_aavePool).borrow(borrowToken, amount, 0, 0, address(this));

        // fix data for position

        uint256 nextPositionId = _d4x.lastPositionId() + 1;

        TransferHelper.safeTransfer(
            borrowToken,
            address(_d4x),
            leverageAmountNeeded
        );

        borrowsData[nextPositionId] = BorrowData({
            asset: borrowToken,
            amount: amount,
            collateral: supplyForLeveragePositionToken
        });
    }

    function repay(uint256 positionId) external {
        BorrowData memory data = borrowsData[positionId];

        IAavePool(_aavePool).repay(data.asset, data.amount, 0, address(this));

        address aToken = IAavePool(_aavePool)
            .getReserveData(_weth)
            .aTokenAddress;

        uint256 balance = IERC20(aToken).balanceOf(address(this));

        if (balance > data.collateral) {
            balance = data.collateral;
        }

        gateway.withdrawETH(_aavePool, balance, address(this));
    }

    function checkBorrowed(uint256 positionId) external view returns (bool) {
        return borrowsData[positionId].asset != address(0);
    }

    /**
     * @notice to set the addresses required for the contract
     * @dev This function is called when rebuildCache or rebuildCaches functions called
     */
    function resolverAddressesRequired()
        public
        pure
        override
        returns (bytes32[] memory addresses)
    {
        bytes32[] memory prev = super.resolverAddressesRequired();
        addresses = new bytes32[](prev.length + 1);

        uint256 i = 0;
        for (; i < prev.length; i++) {
            addresses[i] = prev[i];
        }

        addresses[i] = D4X_CONTRACT;
    }

    /**
     * @dev This function is called when rebuildCache or rebuildCaches functions called
     */
    function _resolveAddressesFinish() internal override {
        super._resolveAddressesFinish();

        _d4x = ID4X(requireAndGetAddress(D4X_CONTRACT));
    }

    // LINE_SALT_PROD_{1695991730}
}
