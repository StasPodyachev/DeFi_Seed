// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.9;

interface IAaveOracle {
    function getAssetsPrices(
        address[] calldata assets
    ) external view returns (uint256[] memory);
}
