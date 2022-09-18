//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
// caped contract for security

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract TokenReward is ERC20Capped, Ownable{
    constructor(uint256 cap) ERC20("TokenReward", "TKR") ERC20Capped(cap){
}

    function issueToken() public{
        _mint(msg.sender, 2*10** decimals());
    }
}
