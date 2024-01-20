pragma solidity ^0.8.9;

import "./../interfaces/KeeperRegistryBaseInterface.sol";

contract TestKeeperRegistryBase is KeeperRegistryBaseInterface {
    uint96 _balance;

    function setBalance(uint96 val) external {
        _balance = val;
    }

    function registerUpkeep(
        address target,
        uint32 gasLimit,
        address admin,
        bytes calldata checkData
    ) external returns (uint256 id) {
        return 0;
    }

    function performUpkeep(
        uint256 id,
        bytes calldata performData
    ) external returns (bool success) {
        return true;
    }

    function cancelUpkeep(uint256 id) external {}

    function addFunds(uint256 id, uint96 amount) external {}

    function getUpkeep(
        uint256 id
    )
        external
        view
        returns (
            address target,
            uint32 executeGas,
            bytes memory checkData,
            uint96 balance,
            address lastKeeper,
            address admin,
            uint64 maxValidBlocknumber
        )
    {
        target = address(this);
        executeGas = 0;
        checkData = "0x";
        balance = 0;
        lastKeeper = address(this);
        admin = address(this);
        maxValidBlocknumber = 0;
    }

    function getUpkeepCount() external view returns (uint256) {
        return 1;
    }

    function getCanceledUpkeepList() external view returns (uint256[] memory) {
        uint256[] memory res = new uint256[](0);
        return res;
    }

    function getKeeperList() external view returns (address[] memory) {
        address[] memory res = new address[](0);
        return res;
    }

    function getKeeperInfo(
        address query
    ) external view returns (address payee, bool active, uint96 balance) {
        payee = address(this);
        active = false;
        balance = _balance;
    }

    function getConfig()
        external
        view
        returns (
            uint32 paymentPremiumPPB,
            uint24 checkFrequencyBlocks,
            uint32 checkGasLimit,
            uint24 stalenessSeconds,
            uint16 gasCeilingMultiplier,
            uint256 fallbackGasPrice,
            uint256 fallbackLinkPrice
        )
    {
        paymentPremiumPPB = 1;
        checkFrequencyBlocks = 1;
        checkGasLimit = 1;
        stalenessSeconds = 1;
        gasCeilingMultiplier = 1;
        fallbackGasPrice = 1;
        fallbackLinkPrice = 1;
    }
}
