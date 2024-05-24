// contracts/AIAuth.sol
pragma solidity ^0.8.0;

contract AIAuth {
    struct Block {
        uint256 index;
        uint256 timestamp;
        string data;
        string previousHash;
        string hash;
    }

    Block[] public blockchain;

    constructor() {
        // Genesis block
        blockchain.push(Block(0, block.timestamp, "Genesis Block", "0", calculateHash(0, block.timestamp, "Genesis Block", "0")));
    }

    function addBlock(string memory data, string memory previousHash, string memory hash) public {
        uint256 index = blockchain.length;
        blockchain.push(Block(index, block.timestamp, data, previousHash, hash));
    }

    function getBlock(uint256 index) public view returns (Block memory) {
        require(index < blockchain.length, "Index out of bounds");
        return blockchain[index];
    }

    function calculateHash(uint256 index, uint256 timestamp, string memory data, string memory previousHash) public pure returns (string memory) {
        return string(abi.encodePacked(index, timestamp, data, previousHash));
    }

    function isChainValid() public view returns (bool) {
        for (uint256 i = 1; i < blockchain.length; i++) {
            Block memory currentBlock = blockchain[i];
            Block memory previousBlock = blockchain[i - 1];

            if (keccak256(abi.encodePacked(currentBlock.hash)) != keccak256(abi.encodePacked(calculateHash(currentBlock.index, currentBlock.timestamp, currentBlock.data, currentBlock.previousHash)))) {
                return false;
            }

            if (keccak256(abi.encodePacked(currentBlock.previousHash)) != keccak256(abi.encodePacked(previousBlock.hash))) {
                return false;
            }
        }
        return true;
    }
}
