// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IInsuranceFund {
    event CoverLoss(
        address indexed sender,
        address token,
        uint256 totalAmount,
        uint256 creditAmount
    );
    event Withdraw(address indexed sender, address token, uint256 value);

    error InsufficientFunds();

    function coverLoss(
        address token,
        uint256 amount
    ) external returns (uint256);

    function withdraw(address token, uint256 value) external;
}
