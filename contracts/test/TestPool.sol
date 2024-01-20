// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/lib/contracts/libraries/TransferHelper.sol";

import {IAavePool} from "./../interfaces/IAavePool.sol";

import "./TestERC20.sol";

import "hardhat/console.sol";

contract TestPool is IAavePool {
    // ReserveData data =
    //     ReserveData({
    //         configuration: ReserveConfigurationMap({data: 0}),
    //         liquidityIndex: 0,
    //         currentLiquidityRate: 0,
    //         variableBorrowIndex: 0,
    //         currentVariableBorrowRate: 0,
    //         currentStableBorrowRate: 0,
    //         lastUpdateTimestamp: 0,
    //         id: 1,
    //         aTokenAddress: address(0),
    //         stableDebtTokenAddress: 0xD37616d809Fd1b1Ae21Cddf41D27CD4d9f5BF5C8,
    //         variableDebtTokenAddress: 0xD37616d809Fd1b1Ae21Cddf41D27CD4d9f5BF5C8,
    //         interestRateStrategyAddress: 0xD37616d809Fd1b1Ae21Cddf41D27CD4d9f5BF5C8,
    //         accruedToTreasury: 1,
    //         unbacked: 1,
    //         isolationModeTotalDebt: 1
    //     });

    mapping(address => ReserveData) _reserveDatas;

    function supply(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external {
        TransferHelper.safeTransferFrom(
            asset,
            msg.sender,
            address(this),
            amount
        );

        TestERC20(_reserveDatas[asset].aTokenAddress).mint(msg.sender, amount);
    }

    function withdraw(
        address asset,
        uint256 amount,
        address to
    ) external returns (uint256) {
        TransferHelper.safeTransfer(asset, to, amount);
        TestERC20(_reserveDatas[asset].aTokenAddress).burn(msg.sender, amount);
    }

    /**
     * @notice Returns the state and configuration of the reserve
     * @param asset The address of the underlying asset of the reserve
     * @return The state and configuration data of the reserve
     **/
    function getReserveData(
        address asset
    ) external view returns (ReserveData memory) {
        return _reserveDatas[asset];
    }

    function setAToken(address asset, address token) external {
        ReserveData storage tmp = _reserveDatas[asset];
        tmp.aTokenAddress = token;
    }
}
