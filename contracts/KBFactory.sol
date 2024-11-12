// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";
import "./interfaces/IKBConfig.sol";
import "./library/String.sol";
import "./Crowdfunding.sol";

contract KBFactory is Ownable {
    error SafeTransferFailed();
    event ConfigChanged(address);
    event CrowdfundingCreated(
        address starter,
        string title,
        string description,
        string[] categories,
        address newCfAddress,
        string ipfsHash,
        uint256 target,
        uint256 deadline
    );

    modifier cfMustExist(address cfAddress) {
        require(cfExist[cfAddress], "KBFactory.cfMustExist");
        _;
    }

    address tokenAddress;
    address[] public cfList;

    IKBConfig config;

    uint256 feePercentage = 3;
    mapping(address => bool) cfExist;

    constructor(address _tokenAddress) Ownable(msg.sender) {
        tokenAddress = _tokenAddress;
    }

    function setConfig(address cfgAddress) public onlyOwner {
        config = IKBConfig(cfgAddress);
        emit ConfigChanged(cfgAddress);
    }

    function createCrowdfunding(
        string memory title,
        string memory shortDescription,
        string[] memory categories,
        string memory metadataCID,
        uint256 target,
        uint256 deadline
    ) public returns (address cfAddress) {
        console.log(address(config));
        require(
            address(config) != address(0),
            "KBFactory.createCrowdfunding: config not set yet"
        );
        require(
            deadline > block.timestamp,
            "KBFactory.createCrowdfunding: deadline must be in future"
        );
        require(
            target >= config.minimumTarget(),
            "KBFactory.createCrowdfunding: not reach minimum target"
        );
        require(
            target <= config.maximumTarget(),
            "KBFactory.createCrowdfunding: exceed maximum target"
        );

        uint256 cfSpan = deadline - block.timestamp;
        require(
            cfSpan >= config.minimumCFSpan(),
            "KBFactory.createCrowdfunding: not reach minimum lifespan"
        );
        require(
            cfSpan <= config.maximumCFSpan(),
            "KBFactory.createCrowdfunding: exceed maximum lifespan"
        );

        address starter = msg.sender;

        Crowdfunding cf = new Crowdfunding(
            starter,
            title,
            shortDescription,
            categories,
            metadataCID,
            target,
            deadline,
            tokenAddress
        );

        cfAddress = address(cf);
        cfList.push(cfAddress);
        cfExist[cfAddress] = true;

        emit CrowdfundingCreated(
            starter,
            title,
            shortDescription,
            categories,
            address(cf),
            metadataCID,
            target,
            deadline
        );
    }

    function isCFExist(address cfAddress) public view returns (bool) {
        return cfExist[cfAddress];
    }

    function donate(
        address cfAddress,
        uint256 amount
    ) public cfMustExist(cfAddress) returns (uint256) {
        address by = msg.sender;
        Crowdfunding cf = Crowdfunding(cfAddress);
        return cf.addContribution(by, amount);
    }

    function withdraw(
        address to,
        address cfAddress,
        uint256 amount
    ) public cfMustExist(cfAddress) returns (uint256) {
        Crowdfunding cf = Crowdfunding(cfAddress);
        require(
            !cf.isOpen(),
            "KBFactory.withdraw: Crowdfunding is still on sale"
        );
        require(cf.starter() == msg.sender, "only allowed for starter");
        cf.removeContribution(to, amount);
        return amount;
    }

    function getAllCrowdfundingAddress()
        public
        view
        returns (address[] memory)
    {
        return cfList;
    }
}
