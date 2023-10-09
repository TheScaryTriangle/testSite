// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @dev This contract stores a number
 */
contract SecretNumber {

    address public owner;
    uint8 secretNumber;

    /**
     * @param _initalValues The inital value for secret number
     */
    constructor(address _initalOwner, uint8 _initalValues){
        owner = _initalOwner;
        secretNumber = _initalValues;
    }

    function getSecretNumber () public view returns(uint8 _secretNumber){
        return secretNumber;
    }

    function changeSecretNumber (uint8 _updatedValue) public{
        secretNumber = _updatedValue;
    } 
}