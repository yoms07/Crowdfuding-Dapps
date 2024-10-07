// contracts/BadgeToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract KBConfig {
    // All config in IDR
    function minimumTarget() external pure returns (uint256) {
        return 1_000_000;
    }

    function maximumTarget() external pure returns (uint256) {
        return 1_000_000_000;
    }

    function minimumCFSpan() external pure returns (uint256) {
        return 1 * 7 * 24 * 60 * 60; // one week
    }

    function maximumCFSpan() external pure returns (uint256) {
        return 6 * 30 * 24 * 60 * 60; // two months
    }

    function maxTitleCharacter() external pure returns (uint256) {
        return 256;
    }

    function isCategoryAvailable(
        string[] memory categories
    ) external pure returns (bool) {
        return true;
    }
}
