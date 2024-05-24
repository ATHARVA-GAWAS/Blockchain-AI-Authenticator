// src/js/app.js
document.addEventListener('DOMContentLoaded', async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable(); // Request account access if needed
        } catch (error) {
            console.error('User denied account access');
        }
    } else {
        alert('Please install MetaMask to use this dApp!');
        return;
    }

    // Contract ABI and Address (replace with your own)
    const contractABI = [
        // Add your contract's ABI here
        {
            "constant": true,
            "inputs": [],
            "name": "getBlockCount",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "getBlock",
            "outputs": [
                {
                    "components": [
                        {
                            "name": "index",
                            "type": "uint256"
                        },
                        {
                            "name": "timestamp",
                            "type": "uint256"
                        },
                        {
                            "name": "data",
                            "type": "string"
                        },
                        {
                            "name": "previousHash",
                            "type": "string"
                        },
                        {
                            "name": "hash",
                            "type": "string"
                        }
                    ],
                    "name": "",
                    "type": "tuple"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    const contractAddress = '0x6cDC0c81717bFfA2F42AD6863D29b462eB974021';

    // Initialize contract
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Fetch and display blocks
    const blocksDiv = document.getElementById('blocks');
    try {
        const blockCount = await contract.methods.getBlockCount().call();
        for (let i = 0; i < blockCount; i++) {
            const block = await contract.methods.getBlock(i).call();
            displayBlock(block);
        }
    } catch (error) {
        console.error('Error fetching blocks', error);
    }

    // Display block data in HTML
    function displayBlock(block) {
        const blockDiv = document.createElement('div');
        blockDiv.classList.add('block');
        blockDiv.innerHTML = `
            <h2>Block ${block.index}</h2>
            <p>Timestamp: ${new Date(block.timestamp * 1000)}</p>
            <p>Data: ${block.data}</p>
            <p>Previous Hash: ${block.previousHash}</p>
            <p>Hash: ${block.hash}</p>
        `;
        blocksDiv.appendChild(blockDiv);
    }
});
