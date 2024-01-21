// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.9;

import "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./../interfaces/IAlpDeployer.sol";
import "./../interfaces/IFactory.sol";
import "./../interfaces/IAlp.sol";
import "./../interfaces/IExtraProtocol.sol";
import "./../interfaces/IBorrowFund.sol";

import "./AlpToken.sol";
import "./../resolver/MixinResolver.sol";

import "hardhat/console.sol";

/**
 * @title Automatic Leveraging Pool
 *
 * ALP plays an important role in organizing the movement of funds of the D4X protocol
 * for issuing leverage. The ALP contract is a pool with one underlying token as well as
 * an ERC20 token. ERC20 features enable staking with dynamic balance.
 *
 * Since balances of all token holders change when the amount of total pooled Ether
 * changes, this token cannot fully implement ERC20 standard: it only emits `Transfer`
 * events upon explicit transfer between holders.
 */
contract ALP is AlpToken, IAlp, MixinResolver {
    bytes32 private constant D4X_CONTRACT = "D4X";
    bytes32 private constant BORROW_FUND_CONTRACT = "BorrowFund";
    bytes32 private constant EXTRA_PROTOCOL_CONTRACT = "ExtraProtocol";

    uint256 internal constant PERCENT_DECIMALS = 1e10;

    address public immutable _factory;
    address public immutable _token;
    address public _d4x;
    address public _borrowFund;

    uint256 public _positionBalances;

    uint256 private unlocked = 1;
    uint256 private _maxLeverage = 100;

    uint256 private _ifPercent;

    IExtraProtocol public _extraProtocol;

    /// @dev Holds a mapping of available tokens to indexes in availableTokensArr.
    mapping(address => uint256) public availableTokens;

    mapping(address => uint256) public deposits;

    uint256 public _limitMaxDeposit = type(uint256).max;
    uint256 public _limitMaxFreeAlpPercent = 1e10;
    uint256 public _limitMaxTotalAlpPercent = 1e10;
    uint256 public _limitMaxLeverageAmount = type(uint256).max;
    uint256 public _timePositionLimit = 30 days;

    mapping(address => uint256) public traderLeverageAmounts;

    /// @dev Array of all available tokens.
    address[] public availableTokensArr;

    constructor(address resolver) MixinResolver(resolver) {
        (_factory, _token, _name, _decimals) = IAlpDeployer(msg.sender)
            .parameters();
    }

    /// @dev Method can only be called by the D4X contract.
    modifier isD4X() {
        if (_d4x != msg.sender) revert WrongCaller();
        _;
    }

    /// @dev Method can only be called by the D4X contract or owner.
    modifier isD4XOrOwner() {
        if (msg.sender != owner() && msg.sender != _d4x) revert WrongCaller();
        _;
    }

    function setLimitMaxDeposit(uint256 amount) external onlyOwner {
        _limitMaxDeposit = amount;
    }

    function setLimitMaxLeverageAmount(uint256 amount) external onlyOwner {
        _limitMaxLeverageAmount = amount;
    }

    function setLimitMaxTotalAlpPercent(uint256 amount) external onlyOwner {
        _limitMaxTotalAlpPercent = amount;
    }

    function setLimitMaxFreeAlpPercent(uint256 amount) external onlyOwner {
        _limitMaxFreeAlpPercent = amount;
    }

    function setTimePositionLimit(uint256 limitInSeconds) external onlyOwner {
        _timePositionLimit = limitInSeconds;
    }

    function getTimePositionLimit() external view returns (uint256) {
        return _timePositionLimit;
    }

    function getIFPercent() external view returns (uint256) {
        return _ifPercent;
    }

    function setIFPercent(uint256 percent) external {
        _ifPercent = percent;
    }

    /**
     * @notice Set new address of extra protocol
     *
     * Requirements:
     *
     * - can only be called by the current owner.
     *
     */
    function setExtraProtocol(
        IExtraProtocol protocol
    ) external onlyOwner whenNotPaused {
        _extraProtocol = protocol;

        TransferHelper.safeApprove(
            _token,
            address(_extraProtocol),
            type(uint256).max
        );
    }

    /**
     * @notice to set the addresses required for the contract
     * @dev This function is called when rebuildCache or rebuildCaches functions called
     */
    function resolverAddressesRequired()
        public
        pure
        override
        returns (bytes32[] memory addresses)
    {
        addresses = new bytes32[](2);
        addresses[0] = D4X_CONTRACT;
        addresses[1] = EXTRA_PROTOCOL_CONTRACT;
    }

    /**
     * @dev This function is called when rebuildCache or rebuildCaches functions called
     */
    function _resolveAddressesFinish() internal override {
        _extraProtocol = IExtraProtocol(
            requireAndGetAddress(EXTRA_PROTOCOL_CONTRACT)
        );
        _d4x = requireAndGetAddress(D4X_CONTRACT);
        _borrowFund = getAddress(BORROW_FUND_CONTRACT);
    }

    function getBaseToken() external view returns (address) {
        return _token;
    }

    function getMaxLeverage(uint256 tradeAmount) public view returns (uint256) {
        return _maxLeverage;
    }

    function setMaxLeverage(uint256 leverage) external onlyOwner {
        _maxLeverage = leverage;
    }

    /**
     * @notice Requests tokens with the maximum allowed leverage
     *
     * @param leverage Leverage amount
     * @param amount Amount of tokens for which the leverage must be calculated
     *
     * @return leverageAmount Amount of tokens with leverage
     * @return leverageAv Leverage value
     *
     * @dev tokens will be transfered to msg.sender
     *
     * Requirements:
     *
     * - `amount` cannot be 0.
     * - can only be called by the D4X contract.
     * - `leverage` cannot be grater then return value in getMaxLeverage(`amount`)
     *
     */
    function requestReserve(
        uint256 leverage,
        uint256 amount,
        address trader
    )
        external
        whenNotPaused
        isD4X
        returns (uint256 leverageAmount, uint256 leverageAv)
    {
        if (leverage > getMaxLeverage(amount)) revert TooMuchLeverage();
        if (amount == 0) revert WrongValue();

        uint balance = _extraProtocol.balanceOf(_token, address(this));

        leverageAv = leverage - 1;
        leverageAmount = amount * leverageAv;

        traderLeverageAmounts[trader] += leverageAmount;

        uint256 currentTraderAmount = traderLeverageAmounts[trader] *
            PERCENT_DECIMALS;

        require(
            traderLeverageAmounts[trader] <= _limitMaxLeverageAmount,
            "ALP: limitMaxLeverageAmount"
        );

        require(
            currentTraderAmount <= balance * _limitMaxFreeAlpPercent,
            "ALP: limitMaxFreeAlpPercent"
        );

        require(
            currentTraderAmount <=
                (balance + _positionBalances) * _limitMaxTotalAlpPercent,
            "ALP: limitMaxTotalAlpPercent"
        );

        if (balance < leverageAmount) {
            if (_borrowFund != address(0)) {
                IBorrowFund(_borrowFund).borrow(
                    leverageAmount,
                    leverage,
                    _token
                );
            }

            return (leverageAmount, leverageAv);

            // revert InsufficientFunds();
        }

        _extraProtocol.withdraw(leverageAmount, _token, msg.sender);
        _positionBalances += leverageAmount;

        emit RequestReserve(msg.sender, leverageAmount);
    }

    /**
     * @notice Return reserve that were issued with leverage
     * @param leverageAmount Amount of tokens with leverage
     * @param alpAmount Current amount of tokens
     *
     * Requirements:
     *
     * - the caller must approve `_token` for at least `alpAmount`.
     *
     */
    function returnReserve(
        uint256 leverageAmount,
        uint256 alpAmount,
        address trader,
        uint256 positionId
    ) external whenNotPaused {
        TransferHelper.safeTransferFrom(
            _token,
            msg.sender,
            address(this),
            alpAmount
        );

        if (IBorrowFund(_borrowFund).checkBorrowed(positionId)) {
            TransferHelper.safeTransfer(
                _token,
                address(_borrowFund),
                alpAmount
            );

            IBorrowFund(_borrowFund).repay(positionId, alpAmount);
            return;
        }

        _positionBalances -= leverageAmount;
        traderLeverageAmounts[trader] -= leverageAmount;

        TransferHelper.safeApprove(_token, address(_extraProtocol), alpAmount);
        _extraProtocol.deposit(alpAmount, _token);

        emit ReturnReserve(msg.sender, alpAmount);
    }

    /**
     * @notice Move `value` of tokens
     * @param value Amount of tokens
     * @return amount of shares in ALP for this deposit
     * @dev AlpToken minting and then transfernig it to msg.sender
     *
     * Emits a `Deposit` event.
     *
     * Requirements:
     *
     * - `value` cannot be 0.
     * - `value` cannot be less then msg.sender balance.
     * - the caller must approve `_token` for at least `value`.
     *
     */
    function deposit(uint256 value) external whenNotPaused returns (uint256) {
        if (value == 0) revert WrongValue();

        deposits[msg.sender] += value;
        require(deposits[msg.sender] <= _limitMaxDeposit, "ALP: LIMIT");

        TransferHelper.safeTransferFrom(
            _token,
            msg.sender,
            address(this),
            value
        );

        uint256 sharesAmount = getSharesByPooled(value);
        if (sharesAmount == 0) {
            // totalControlledEther is 0: either the first-ever deposit or complete slashing
            // assume that shares correspond to Ether 1-to-1
            sharesAmount = value;
        }

        TransferHelper.safeApprove(_token, address(_extraProtocol), value);
        _extraProtocol.deposit(value, _token);

        _mintShares(msg.sender, sharesAmount);
        _emitTransferAfterMintingShares(msg.sender, sharesAmount);

        emit Deposit(msg.sender, value);

        return sharesAmount;
    }

    /**
     * @notice Withdraw `value` of tokens
     * @param value Amount of tokens
     * @dev AlpToken burning and then an equivalent amount of the
     * `_token` is transfered to msg.sender
     *
     * Emits a `Withdraw` event.
     *
     * Requirements:
     *
     * - `value` cannot be 0.
     * - `value` cannot be less then _extraProtocol balance.
     *
     */
    function withdraw(uint256 value) external whenNotPaused {
        if (value == 0) revert WrongValue();
        uint256 sharesAmount = getSharesByWithdrow(value);

        if (sharesAmount == 0) revert NoShares();

        _burnShares(msg.sender, sharesAmount);

        if (_extraProtocol.balanceOf(_token, address(this)) < value)
            revert InsufficientFunds();

        _extraProtocol.withdraw(value, _token, msg.sender);

        emit Withdraw(msg.sender, value);
    }

    /**
     * @notice Add available tokens
     * @param tokens Array of token addresses
     *
     * Requirements:
     *
     * - can only be called by the current owner.
     *
     */
    function addAvailableTokens(
        address[] calldata tokens
    ) external onlyOwner whenNotPaused {
        for (uint256 i = 0; i < tokens.length; i++) {
            if (availableTokens[tokens[i]] == 0 && tokens[i] != _token) {
                availableTokensArr.push(tokens[i]);
                availableTokens[tokens[i]] = availableTokensArr.length;

                IFactory(_factory).addToken(tokens[i]);
            }
        }

        emit TokensUpdate();
    }

    /**
     * @notice Remove available tokens
     * @param tokens Array of token addresses
     *
     * Requirements:
     *
     * - can only be called by the current owner.
     *
     */
    function removeAvailableTokens(
        address[] calldata tokens
    ) external onlyOwner whenNotPaused {
        uint256 index;
        for (uint256 i = 0; i < tokens.length; i++) {
            index = availableTokens[tokens[i]];
            if (index > 0) {
                index--;
                availableTokens[tokens[i]] = 0;
                availableTokensArr[index] = availableTokensArr[
                    availableTokensArr.length - 1
                ];
                availableTokens[availableTokensArr[index]] = index + 1;
                availableTokensArr.pop();

                IFactory(_factory).removeToken(tokens[i]);
            }
        }

        emit TokensUpdate();
    }

    /**
     * @notice Checking if `token` is available
     * @param token Token address
     * @return boolean to indicate if token is available
     */
    function isTokenAvailable(address token) external view returns (bool) {
        return availableTokens[token] > 0;
    }

    /**
     * @notice Get available tokens
     * @return Array of all available tokens
     */
    function getAvailableTokens() external view returns (address[] memory) {
        return availableTokensArr;
    }

    // ==========================================================

    /**
     * @dev Emits {Transfer} and {TransferShares} events where `from` is 0 address. Indicates mint events.
     */
    function _emitTransferAfterMintingShares(
        address _to,
        uint256 _sharesAmount
    ) internal {
        emit Transfer(address(0), _to, getPooledByShares(_sharesAmount));
        emit TransferShares(address(0), _to, _sharesAmount);
    }

    // reserve withot chnaged to position

    /**
     * @dev Gets the total amount of Token controlled by the system
     * @return total balance in wei
     */
    function _getTotalPooled() internal view override returns (uint256) {
        return
            _extraProtocol.balanceOf(_token, address(this)) + _positionBalances;
    }

    // LINE_SALT_PROD_{1695991730}
}
