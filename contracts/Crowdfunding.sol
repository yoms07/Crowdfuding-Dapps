// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract Crowdfunding {
    error SafeTransferFailed();
    error SafeApproveFailed();

    event ContributionAdded(
        address cfAddress,
        Contribution contribution,
        bool isOpen
    );
    event Withdraw(address cfAddress, Burning burning);

    struct Contribution {
        address contributor;
        uint256 amount;
        uint256 timestamp;
    }

    struct Burning {
        address to;
        uint256 amount;
        uint256 timestamp;
    }

    modifier beforeDeadline() {
        require(
            block.timestamp < deadline,
            "Crowdfunding: already exceed deadline"
        );
        _;
    }

    modifier afterDeadline() {
        require(
            block.timestamp >= deadline,
            "Crowdfunding: must after deadline"
        );
        _;
    }

    modifier onlyStarter() {
        require(msg.sender == starter, "Crowdfunding: onlyStarter");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == factoryAddress, "Crowdfunding: onlyFactory");
        _;
    }
    string public metadataCID;
    uint256 public target;
    uint256 public current;
    uint256 public deadline; // in second since unix epoch
    uint256 public startAt;

    bool public isOpen;

    address public starter;
    address public tokenAddress;
    address public factoryAddress;

    Contribution[] public contributions;
    Burning[] public burnings;

    constructor(
        address _starter,
        string memory _metadataCID,
        uint256 _target,
        uint256 _deadline,
        address _tokenAddress
    ) {
        require(
            _deadline > block.timestamp,
            "Crowdfunding: Deadline must be in future"
        );

        starter = _starter;

        factoryAddress = msg.sender;
        metadataCID = _metadataCID;
        target = _target;
        current = 0;
        deadline = _deadline;
        tokenAddress = _tokenAddress;
        startAt = block.timestamp;
        isOpen = true;
    }

    function editCrowdfunding(
        uint256 _target,
        uint256 _deadline
    ) public onlyStarter {
        require(_target > current, "Crowdfunding: target is too small");
        require(
            _deadline > deadline,
            "Crowdfunding: new deadline is shorter than before"
        );
        target = _target;
        deadline = _deadline;
    }

    function editMetadataCID(string memory newCID) public {
        metadataCID = newCID;
    }

    function addContribution(
        address by,
        uint256 amount
    ) external beforeDeadline onlyFactory returns (uint256 contributionAdded) {
        require(
            isOpen,
            "Crowdfunding.addContribution: Crowdfunding is not for sale"
        );
        require(amount > 0, "Crowdfunding.addContribution: invalid amount");
        require(
            current < target,
            "Crowdfunding.addContribution: crowdfunding already reach target"
        );

        contributionAdded = contributionAllowed(amount);
        console.log(contributionAdded);

        current += contributionAdded;

        Contribution memory contribution;
        contribution.contributor = by;
        contribution.amount = contributionAdded;
        contribution.timestamp = block.timestamp;

        contributions.push(contribution);

        _safeTransferFrom(tokenAddress, by, address(this), contributionAdded);

        // close the crowdfunding sale
        if (current >= target) {
            isOpen = false;
        }

        emit ContributionAdded(address(this), contribution, isOpen);
    }

    function removeContribution(
        address to,
        uint256 amount
    ) external onlyFactory {
        require(
            !isOpen,
            "Crowdfunding.removeContribution: Crowdfunding is still in sale"
        );
        require(amount > 0, "Crowdfunding.removeContribution: invalid amount");
        require(
            current >= amount,
            "Crowdfunding.removeContribution: insufficient amount"
        );

        current -= amount;
        Burning memory burning;
        burning.amount = amount;
        burning.to = to;
        burning.timestamp = block.timestamp;

        _safeTransfer(tokenAddress, to, amount);

        emit Withdraw(address(this), burning);
    }

    function contributionAllowed(uint256 amount) public view returns (uint256) {
        if (current >= target) {
            return 0;
        }

        if (block.timestamp > deadline) {
            return 0;
        }

        uint256 allowedAmount = amount;
        if (current + allowedAmount > target) {
            allowedAmount = target - current;
        }

        return allowedAmount;
    }

    function getTarget() external view returns (uint256) {
        return target;
    }

    function getContributions() external view returns (Contribution[] memory) {
        return contributions;
    }

    function _safeApprove(
        address token,
        address spender,
        uint256 value
    ) private {
        console.log("SAMPE SAFEAPPROVE");
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSignature("approve(address,uint256)", spender, value)
        );
        console.log("SELESAI SAFE APPROVE");
        if (!success || (data.length != 0 && !abi.decode(data, (bool)))) {
            revert SafeApproveFailed();
        }
    }

    function _safeTransfer(address token, address to, uint256 value) private {
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSignature("transfer(address,uint256)", to, value)
        );
        if (!success || (data.length != 0 && !abi.decode(data, (bool)))) {
            revert SafeTransferFailed();
        }
    }

    function _safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) private {
        (bool success, bytes memory data) = token.call(
            abi.encodeWithSignature(
                "transferFrom(address,address,uint256)",
                from,
                to,
                value
            )
        );
        if (!success || (data.length != 0 && !abi.decode(data, (bool)))) {
            revert SafeTransferFailed();
        }
    }
}
