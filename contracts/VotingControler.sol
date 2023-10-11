// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Voting.sol";

contract VotingControler {
    voteData[] public votingContracts;

    struct voteData {
        string name;
        Voting votingContracts;
    }

    function getAllVotingContracts() public view returns (voteData[] memory) {
        return votingContracts;
    }

    function createNewVote(string memory _name) public {
        Voting newContract = new Voting();
        votingContracts.push(voteData(_name, newContract));
    }

    constructor() {
        createNewVote("First");
        createNewVote("Second");
    }
}
