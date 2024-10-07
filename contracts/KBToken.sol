// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
/// @title Contract that store user wallet balance
/// @author Jason Stanley Yoman
/// @notice Used for payment usecase. Only admin can mint the token to user
contract KBToken is ERC20 {
    event TopUp(address to, uint256 amount);
    address public admin;

    modifier onlyAdmin() {
        require(
            msg.sender == admin,
            "KBToken: Action can only perform by admin"
        );
        _;
    }
    constructor() ERC20("KitaBisaToken", "KBTX") {
        admin = msg.sender;
    }

    function decimals() public pure override returns (uint8) {
        return 0;
    }

    /**
     *
     * TopUp onlyAdmin
     * // TODO: Security check?
     */

    /// @notice Increase balance of a user
    /// @dev Make sure receiver already create payment outside of contract
    /// @param to receiver address
    /// @param amount amount of KBToken received
    /// @return success whether topUp is success or not
    function topUp(
        address to,
        uint256 amount
    ) public onlyAdmin returns (bool success) {
        require(amount > 0, "KBToken.topUp: invalid amount to topUp");
        require(to != address(0), "KBToken.topUp: invalid address");
        _mint(to, amount);
        success = true;

        emit TopUp(to, amount);
    }
}
