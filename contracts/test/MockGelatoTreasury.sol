// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.9;
pragma abicoder v2;

import "./../interfaces/ITreasury.sol";

contract MockGelatoTreasury is ITreasury {
    uint _userTokenBalance;

    function setTokenBalance(uint amount) external {
        _userTokenBalance = amount;
    }

    function depositFunds(
        address receiver,
        address token,
        uint256 amount
    ) external payable {}

    function userTokenBalance(
        address user,
        address token
    ) external view returns (uint256) {
        return _userTokenBalance;
    }
}
