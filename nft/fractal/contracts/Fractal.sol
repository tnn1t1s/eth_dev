//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";


contract Fractal is ERC721, VRFConsumerBase {
    address public vrfCoordinator;
    bytes32 internal keyHash;

    uint256 public tokenCounter;
    uint256 randomVariable;
    // add other things
    mapping(bytes32 => address) public requestIdToSender;
    mapping(bytes32 => string) public requestIdToTokenURI;
    mapping(uint256 => uint256) public tokenIdToRandomVariable;
    mapping(bytes32 => uint256) public requestIdToTokenId;
    event requestedCollectible(bytes32 indexed requestId);

    uint256 internal fee;

    constructor(address _VRFCoordinator,
                address _linkToken,
                bytes32 _keyHash) public
    VRFConsumerBase(_VRFCoordinator, _linkToken)
    ERC721("Fractal", "FRACTAL")
    {
        tokenCounter = 0;
        vrfCoordinator =_VRFCoordinator;
        keyHash = _keyHash;
        fee = 0.1 * 10 ** 18;
    }

    function createCollectible(string memory tokenURI, uint256 userProvidedSeed)
        public returns (bytes32){
            bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
            requestIdToSender[requestId] = msg.sender;
            requestIdToTokenURI[requestId] = tokenURI;
            emit requestedCollectible(requestId);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomNumber) internal override {
        address owner = requestIdToSender[requestId];
        string memory tokenURI = requestIdToTokenURI[requestId];
        uint256 newItemId = tokenCounter;
        _safeMint(owner, newItemId);
        _setTokenURI(newItemId, tokenURI);
        randomVariable = randomNumber % 100;
        tokenIdToRandomVariable[newItemId] = randomVariable;
        requestIdToTokenId[requestId] = newItemId;
        tokenCounter = tokenCounter + 1;
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI) public {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: transfer caller is not owner nor approved"
        );
        _setTokenURI(tokenId, _tokenURI);
    }
}
