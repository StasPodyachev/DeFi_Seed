// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.9;
pragma abicoder v2;

import "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import "./../quoter/interfaces/IQuoter.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";
import "@uniswap/v3-periphery/contracts/interfaces/IQuoterV2.sol";

contract TestQuoterV2 is IQuoter {
    int256 num = 1;
    int256 den = 1;

    function setRate(int256 num_, int256 den_) external {
        num = num_;
        den = den_;
    }

    function getAmountOut(
        SwapParams memory params
    ) external view returns (int256 amount0, int256 amount1) {
        amount0 = 0;
        amount1 = (params.amountSpecified * num) / den; // params.amountIn * rate = < 1
    }

    function quoteExactInput(
        bytes memory path,
        int256 amountIn
    ) external view returns (int256 amountOut) {
        return 0;
    }
}
