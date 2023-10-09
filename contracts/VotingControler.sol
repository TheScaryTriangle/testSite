// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Voting.sol";

contract VotingControler {

    Voting[] public votingContracts;

    function createNewVote() public {
          Voting newContract = new Voting();
          votingContracts.push(newContract);
    }

    constructor(
        //choiceData[] memory _initalChoices
    ){
        createNewVote();
        createNewVote();
    }
}