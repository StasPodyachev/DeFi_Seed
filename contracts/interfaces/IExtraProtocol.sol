// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IExtraProtocol {
    event Deposit(address indexed sender, uint256 val);
    event Withdraw(address indexed sender, uint256 val);
    event ProtocolsUpdated();

    error WrongCaller(address caller);
    error WrongPositionId();
    error InsufficientFunds();

    function setProtocols(address[] calldata protocols) external;

    function deposit(
        uint256 amount,
        uint256 positionId,
        address token
    ) external;

    function deposit(uint256 amount, address token) external;

    function withdraw(uint256 positionId) external;

    function withdraw(
        uint256 amount,
        address token,
        address recipient
    ) external;

    function balanceOf(uint256 positionId) external view returns (uint256);

    function balanceOf(
        address token,
        address alp
    ) external view returns (uint256);

    function balanceOf(address token) external view returns (uint256);
}
