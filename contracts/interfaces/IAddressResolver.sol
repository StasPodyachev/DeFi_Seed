// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity ^0.8.9;

interface IAddressResolver {
    error LengthError();

    function getAddress(bytes32 name) external view returns (address);

    function requireAndGetAddress(
        bytes32 name,
        string calldata reason
    ) external view returns (address);
}
