// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Voting {

    struct ChoiceData {
        string name;
        uint8 votes;
    }

    mapping (address => bool) public hasVoted;
    ChoiceData[] public choices;
    uint8 public numberOfChoices;

    constructor() {
        numberOfChoices = 2;
        choices.push(ChoiceData("Test", 0));  // Use push to add choices
        choices.push(ChoiceData("Test2", 0)); // Use push to add choices
    }

    function vote(uint8 _choice) public {
        require(!hasVoted[msg.sender], "Already voted");
        require(_choice < numberOfChoices, "Invalid choice");
        hasVoted[msg.sender] = true;
        choices[_choice].votes++;
    }

    function getAllChoices() public view returns (ChoiceData[] memory) {
        return choices;
    }
}
