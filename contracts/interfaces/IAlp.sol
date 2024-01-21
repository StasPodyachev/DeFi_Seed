// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IAlp {
    event Deposit(address indexed sender, uint256 val);
    event Withdraw(address indexed sender, uint256 val);
    event RequestReserve(address indexed sender, uint256 amount);
    event ReturnReserve(address indexed sender, uint256 amount);
    event Sync(uint256 reserve);
    event TokensUpdate();

    error TooMuchLeverage();
    error WrongValue();
    error WrongCaller();
    error InsufficientFunds();
    error NoShares();

    function requestReserve(
        uint256 leverage,
        uint256 amount,
        address trader
    ) external returns (uint256 leverageAmount, uint256 leverageAv);

    function getIFPercent() external view returns (uint256); //

    function setIFPercent(uint256 percent) external;

    function getBaseToken() external returns (address);

    function deposit(uint256 val) external returns (uint256);

    function getMaxLeverage(uint256 tradeAmount) external returns (uint256);

    function withdraw(uint256 val) external;

    function addAvailableTokens(address[] calldata tokens) external;

    function removeAvailableTokens(address[] calldata tokens) external;

    function isTokenAvailable(address token) external view returns (bool);

    function setLimitMaxDeposit(uint256 amount) external;

    function setLimitMaxLeverageAmount(uint256 amount) external;

    function setLimitMaxTotalAlpPercent(uint256 amount) external;

    function setLimitMaxFreeAlpPercent(uint256 amount) external;

    function returnReserve(
        uint256 leverageAmount,
        uint256 alpAmount,
        address trader,
        uint256 positionId
    ) external;

    function getAvailableTokens() external view returns (address[] memory);

    function getTimePositionLimit() external view returns (uint256);
}
