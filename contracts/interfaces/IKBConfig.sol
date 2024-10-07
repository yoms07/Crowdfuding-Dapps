// contracts/BadgeToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IKBConfig {
    function minimumTarget() external pure returns (uint256);
    function maximumTarget() external pure returns (uint256);
    function minimumCFSpan() external pure returns (uint256);
    function maximumCFSpan() external pure returns (uint256);
    function maxTitleCharacter() external pure returns (uint256);
    function isCategoryAvailable(
        string[] memory categories
    ) external pure returns (bool);
}
