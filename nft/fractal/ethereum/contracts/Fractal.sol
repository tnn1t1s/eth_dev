//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Fractal is ERC721Enumerable {
  string[] public fractals;
  mapping(string => bool) _fractalExists;

  constructor() ERC721("Fractal", "FRACTAL") {
  }

  function mint() public {
    require(!_fractalExists[_fractal]);
    // push this fractal to the fractals array
    fractals.push(_fractal);
    // send this token to the msg.sender address
    _mint(msg.sender, fractals.length - 1);
    // bookkeep on this 'fractal'
    _fractalExists[_fractal] = true;
  }
}
