// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IBorrowFund {
    event AavePoolUpdated(address oldValue, address newValue);

    error WrongCaller(address caller);
    error SameValue();

    function borrow(
        uint256 leverageAmountNeeded,
        uint256 leverageNeed,
        address borrowToken
    ) external;

    function repay(uint256 positionId, uint256 amount) external;

    function checkBorrowed(uint256 positionId) external view returns (bool);
}
