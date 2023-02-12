pragma solidity >=0.5.0 < 0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SilverToken is ERC20 {
    constructor (uint256 initialSupply) ERC20("silver", "SLV"){
        _mint(msg.sender, initialSupply);
    }
    function decimals() public pure override returns (uint8) {
        return 2;
    }
}
