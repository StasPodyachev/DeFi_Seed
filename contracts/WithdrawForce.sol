import "@openzeppelin/contracts/access/Ownable.sol";
import "@uniswap/lib/contracts/libraries/TransferHelper.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

abstract contract WithdrawForce is Ownable {
    function withdrawForce(
        address[] calldata tokens,
        address recipient
    ) public virtual onlyOwner {
        uint256 size = tokens.length;
        for (uint256 i = 0; i < size; i++) {
            uint256 balance = IERC20(tokens[i]).balanceOf(address(this));

            if (balance > 0) {
                TransferHelper.safeTransfer(tokens[i], recipient, balance);
            }
        }
    }

    // LINE_SALT_PROD_{1695991730}
}
