// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Token {

    constructor(uint256 _initalSupply){
        mint(_initalSupply);
    }

    uint256 public totalSupply;
    mapping (address => uint256) public balance;

    function transfer(address _to, uint256 _amount) public {
        balance[_to] += _amount;
        balance[msg.sender] -= _amount;
    }

    function mint(uint256 _amount) public {
        balance[msg.sender] += _amount;
        totalSupply += _amount;
    }

    function balanceOf(address _address) public view returns(uint256){
        return balance[_address];
    }
}