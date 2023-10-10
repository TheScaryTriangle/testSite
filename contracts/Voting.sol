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

    function vote() public {
        // require(!hasVoted[msg.sender]);
        hasVoted[msg.sender] = true;
        choices[1].votes++;
    }

    function getAllChoices() public view returns (choiceData[] memory) {
        return choices;
    }

    //choiceData[] memory _initalChoices
    constructor() {
        numberOfChoices = 2;
        choices.push(choiceData("Test", 0));
        choices.push(choiceData("Test2", 0));
    }
}
