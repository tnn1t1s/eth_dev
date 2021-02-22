// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract Counter {
    uint value;

    function set(uint x) public {
        value = x;
    }

    function inc() public {
        value += 1;
    }

    function get() public view returns (uint) {
        return value;
    }    
}
