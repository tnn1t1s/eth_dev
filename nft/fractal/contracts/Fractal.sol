//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";

contract Fractal is ERC721 {
  uint256[] public fractals;
  mapping(uint256 => bool) _fractalExists;

  constructor() ERC721("Fractal", "FRACTAL") public {
  }

  function mint() public {
    // TODO: get this fractal from chainlink randomness
    uint _fractal = 0;
    require(!_fractalExists[_fractal]);
    // push this fractal to the fractals array
    fractals.push(_fractal);
    // send this token to the msg.sender address
    _mint(msg.sender, fractals.length - 1);
    // bookkeep on this 'fractal'
    _fractalExists[_fractal] = true;
  }
}
