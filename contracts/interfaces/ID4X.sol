// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface ID4X {
    enum PositionStatus {
        OPEN,
        CLOSE,
        LIQUIDATION
    }

    error ExchangeNotFound();
    error AlpNotFound();
    error TokenIsNotAvailable();
    error LiquidationCheck();
    error WrongCaller();
    error WrongPositionStatus();
    error OutOfSlippage();
    error OutOfPriceImpact();
    error ZeroAmountOut();
    error ZeroAutomateAddress();

    event PositionCreated(uint256 id);
    event LiquidationDeltaUpdated(uint256 oldValue, uint256 newValue);
    event LiquidatorFeePercentUpdated(uint256 oldValue, uint256 newValue);
    event AlpFeePercentUpdated(uint256 oldValue, uint256 newValue);
    event LiquidationCountUpdated(uint256 oldValue, uint256 newValue);
    event IfPercentUpdated(uint256 oldValue, uint256 newValue);
    event PriceImpactPercentUpdated(uint256 oldValue, uint256 newValue);

    struct PositionParams {
        uint256 amount; // amount without leverage
        uint256 leverage;
        uint256 amountOut; // amount tokens after swap
        uint256 timestamp;
        address tokenSell;
        address tokenBuy;
        address trader;
        PositionStatus status;
        uint256 dexType;
    }

    struct CreatePositionParams {
        address tokenSell;
        address tokenBuy;
        uint256 amount;
        uint256 leverage;
        uint256 slippage;
        uint256 amountOut;
        uint256 dexType;
        bytes path;
    }

    event PositionClose(
        uint256 id,
        uint256 amountOutFact,
        uint256 amountToAlp,
        uint256 amountToTrader,
        uint256 feeToIf
    );

    event PositionLiquidation(
        uint256 id,
        uint256 amountOut,
        uint256 alpAmount,
        uint256 traderAmount,
        uint256 liquidatorAmount,
        uint256 feeToIf,
        address liquidator
    );

    function createPosition(CreatePositionParams calldata param) external;

    function lastPositionId() external view returns (uint256);

    function closePosition(uint256 id, bytes calldata path) external;

    function liquidation(uint256 id, bytes calldata path) external;

    function liquidation(uint256[] memory ids, bytes[] calldata path) external;

    function getLiquidationPositions(
        address token0,
        address token1
    ) external view returns (uint256[] memory, bytes[] memory);
}
