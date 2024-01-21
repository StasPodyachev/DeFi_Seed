// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.9;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@uniswap/lib/contracts/libraries/TransferHelper.sol";

import {IAavePool} from "./../interfaces/IAavePool.sol";

import "./../interfaces/IInsuranceFund.sol";
import "./../interfaces/IBorrowFund.sol";
import "./../interfaces/IAaveOracle.sol";
import "./../interfaces/IWrappedTokenGatewayV3.sol";
import "./../interfaces/ID4X.sol";

import "./../resolver/MixinResolver.sol";
import "./../interfaces/IFactory.sol";
import "./../security/Pausable.sol";
import "./../WithdrawForce.sol";

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
    bytes32 private constant FACTORY_CONTRACT = "Factory";
    bytes32 private constant D4X_CONTRACT = "D4X";

    uint256 public undecollateralRiskParameter = 150;

    address public _weth;

    IAavePool public _aavePool;
    IWrappedTokenGatewayV3 public _gateway;
    ID4X public _d4x;
    IAaveOracle public _oracle;
    IFactory public _factory;

    struct BorrowData {
        address asset;
        uint256 amount;
        uint256 collateral;
    }

    mapping(uint256 => BorrowData) public borrowsData;

    constructor(address resolver, address weth) MixinResolver(resolver) {
        _weth = weth;
    }

    function setAavePool(address addr) external onlyOwner whenNotPaused {
        if (address(_aavePool) == addr) revert SameValue();

        _aavePool = IAavePool(addr);
    }

    function setOracle(address addr) external onlyOwner whenNotPaused {
        if (address(_oracle) == addr) revert SameValue();

        _oracle = IAaveOracle(addr);
    }

    function setWrappedTokenGatewayV3(
        address addr
    ) external onlyOwner whenNotPaused {
        if (address(_gateway) == addr) revert SameValue();

        _gateway = IWrappedTokenGatewayV3(addr);
    }

    function setUndecollateralRiskParameter(
        uint256 value
    ) external onlyOwner whenNotPaused {
        undecollateralRiskParameter = value;
    }

    function borrow(
        uint256 leverageAmountNeeded,
        uint256 leverageNeed,
        address borrowToken
    ) external {
        if (msg.sender != _factory.getAlp(borrowToken))
            revert WrongCaller(msg.sender);

        require(borrowToken != _weth, "BorrowFund: Only GHO token");

        (, , , uint256 currentLiquidationThreshold, uint256 ltv, ) = IAavePool(
            _aavePool
        ).getUserAccountData(address(this));

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

        _gateway.depositETH{value: supplyForLeveragePositionToken}(
            address(_aavePool),
            address(this),
            0
        );

        uint256 amount = 0;

        _aavePool.borrow(borrowToken, amount, 0, 0, address(this));

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

    function repay(uint256 positionId, uint256 amount) external {
        BorrowData memory data = borrowsData[positionId];

        _aavePool.repay(data.asset, data.amount, 0, address(this));

        address aToken = _aavePool.getReserveData(_weth).aTokenAddress;

        uint256 balance = IERC20(aToken).balanceOf(address(this));

        if (balance > data.collateral) {
            balance = data.collateral;
        }

        _gateway.withdrawETH(address(_aavePool), balance, address(this));
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
        addresses = new bytes32[](2);
        addresses[0] = D4X_CONTRACT;
        addresses[1] = FACTORY_CONTRACT;
    }

    /**
     * @dev This function is called when rebuildCache or rebuildCaches functions called
     */
    function _resolveAddressesFinish() internal override {
        _factory = IFactory(requireAndGetAddress(FACTORY_CONTRACT));
        _d4x = ID4X(requireAndGetAddress(D4X_CONTRACT));
    }
}
