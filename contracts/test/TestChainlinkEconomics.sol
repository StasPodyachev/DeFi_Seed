// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.9;
pragma abicoder v2;

import "./../interfaces/exchange/IExchange.sol";
import "hardhat/console.sol";

contract TestChainlinkEconomics {
    uint256 internal constant PERCENT_DECIMALS = 1e10;
    uint256 internal constant GAS_DECIMALS = 1e10;

    uint256 internal _premiumPercent = 1e9;
    uint256 internal _chainlinkConstant = 80000;

    address internal _native;
    address internal LINK;

    constructor(address native, address link) {
        _native = native;
        LINK = link;
    }

    function setPremiumPercent(uint256 value) external {
        _premiumPercent = value;
    }

    function setChainlinkConstant(uint256 value) external {
        _chainlinkConstant = value;
    }

    function getFee(
        address exchange,
        uint256 gasPrice,
        uint256 gasUsed
    ) external view returns (uint256) {
        gasPrice = 1e10;
        uint256 rate = IExchange(exchange).getAmountOut(_native, LINK, 1);

        // _premiumPercent = 0.7 + 1 = 1,7
        return
            ((gasUsed * gasPrice) / GAS_DECIMALS) *
            (1 + _premiumPercent / PERCENT_DECIMALS) +
            (((_chainlinkConstant * gasPrice) / GAS_DECIMALS) * rate);
    }
}
