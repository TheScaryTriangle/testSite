// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Voting.sol";

contract VotingController {
    VoteData[] public votingContracts;

    struct VoteData {
        string name;
        address votingContract; // Use address to store the Voting contract's address
    }

    function getAllVotingContracts() public view returns (VoteData[] memory) {
        return votingContracts;
    }

    function createNewVote(string memory _name) public {
        Voting newContract = new Voting();
        votingContracts.push(VoteData(_name, address(newContract))); // Store the Voting contract's address
    }

    constructor() {
        createNewVote("First");
        createNewVote("Second");
        createNewVote("Third");
    }
}
