// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.9;
pragma abicoder v2;

import "./../interfaces/exchange/curve/ICurve.sol";
import "@uniswap/lib/contracts/libraries/TransferHelper.sol";

contract MockCurve is ICurve {
    int128 N_COINS = 3;
    address[] public _coins;
    mapping(address => uint256) public _indexForTokens;

    uint _dy = 1;

    constructor(address[] memory coins_) {
        _coins = coins_;
    }

    function coins(uint256 i) external view returns (address) {
        return _coins[i];
    }

    function underlying_coins(uint256 i) external view returns (address) {
        return _coins[i];
    }

    function exchange(int128 i, int128 j, uint256 dx, uint256 min_dy) external {
        TransferHelper.safeTransferFrom(
            _coins[uint256(uint128(i))],
            msg.sender,
            address(this),
            dx
        );

        uint dy = _dy == 0 ? 0 : dx;

        TransferHelper.safeTransfer(
            _coins[uint256(uint128(j))],
            msg.sender,
            dy
        );
    }

    function exchange_underlying(
        int128 i,
        int128 j,
        uint256 dx,
        uint256 min_dy
    ) external {
        TransferHelper.safeTransferFrom(
            _coins[uint256(uint128(i))],
            msg.sender,
            address(this),
            dx
        );

        uint dy = _dy == 0 ? 0 : dx;

        TransferHelper.safeTransfer(
            _coins[uint256(uint128(j))],
            msg.sender,
            dy
        );
    }

    function get_dy(
        int128 i,
        int128 j,
        uint256 dx
    ) external view returns (uint256) {
        return _dy;
    }

    function get_dy_underlying(
        int128 i,
        int128 j,
        uint256 dx
    ) external view returns (uint256) {
        return _dy;
    }

    function set_dy(uint dy) external {
        _dy = dy;
    }
}
