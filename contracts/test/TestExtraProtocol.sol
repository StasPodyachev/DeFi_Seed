pragma solidity ^0.8.9;
pragma abicoder v2;

import "../extra/ExtraProtocol.sol";

import "hardhat/console.sol";

contract TestExtraProtocol is ExtraProtocol {
    constructor(address resolver) ExtraProtocol(resolver) {}

    function mockDeposit(uint256 amount, address token) external {
        TransferHelper.safeTransferFrom(
            token,
            msg.sender,
            address(this),
            amount
        );

        uint256 size = _protocols.length;

        for (uint256 i = 0; i < size; ) {
            TransferHelper.safeTransfer(token, _protocols[i], amount);
            break;
        }
    }
}
