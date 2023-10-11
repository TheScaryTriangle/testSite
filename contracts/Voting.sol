// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Voting {
    struct choiceData {
        string name;
        uint8 votes;
    }

    mapping(address => bool) public hasVoted;
    choiceData[] public choices;
    uint8 public numberOfChoices;

    function vote(uint8 _choice) public {
        // require(!hasVoted[msg.sender]);
        hasVoted[msg.sender] = true;
        choices[_choice].votes++;
    }

    function getAllChoices() public view returns (choiceData[] memory) {
        return choices;
    }

    constructor() {
        numberOfChoices = 2;
        choices[0] = choiceData("Test", 0);
        choices[1] = choiceData("Test2", 0);
    }
}
