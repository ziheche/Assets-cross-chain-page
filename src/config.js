
/* const abiCfgFile = require('../../../artifacts/contracts/AssetsCrossChainBridge.sol/AssetsCrossChainBridge.json')
const contractCfgFile = require('../../../config/alt-config.json')
export const CONTRACT_ADDRESS = contractCfgFile.sendUniversalPacket.optimism.portAddr;
export const ABI = abiCfgFile.abi; */
export const CONTRACT_ADDRESS = '0x062aF4E4527565c6F486f7f5b080006397402f2d'
export const ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_middleware",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "destPortAddr",
          "type": "address"
        },
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "TransferCNY",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "ackPackets",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "srcPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "mwBitmap",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "appData",
              "type": "bytes"
            }
          ],
          "internalType": "struct UniversalPacket",
          "name": "packet",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "success",
              "type": "bool"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "internalType": "struct AckPacket",
          "name": "ack",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "middleware",
          "type": "address"
        }
      ],
      "name": "authorizeMiddleware",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "authorizedMws",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "subtractedValue",
          "type": "uint256"
        }
      ],
      "name": "decreaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "addedValue",
          "type": "uint256"
        }
      ],
      "name": "increaseAllowance",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "mw",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "srcPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "mwBitmap",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "appData",
              "type": "bytes"
            }
          ],
          "internalType": "struct UniversalPacket",
          "name": "packet",
          "type": "tuple"
        }
      ],
      "name": "onRecvUniversalPacket",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bool",
              "name": "success",
              "type": "bool"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "internalType": "struct AckPacket",
          "name": "ackPacket",
          "type": "tuple"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "srcPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "mwBitmap",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "appData",
              "type": "bytes"
            }
          ],
          "internalType": "struct UniversalPacket",
          "name": "packet",
          "type": "tuple"
        }
      ],
      "name": "onTimeoutUniversalPacket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "srcPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "mwBitmap",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "appData",
              "type": "bytes"
            }
          ],
          "internalType": "struct UniversalPacket",
          "name": "packet",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "bool",
              "name": "success",
              "type": "bool"
            },
            {
              "internalType": "bytes",
              "name": "data",
              "type": "bytes"
            }
          ],
          "internalType": "struct AckPacket",
          "name": "ack",
          "type": "tuple"
        }
      ],
      "name": "onUniversalAcknowledgement",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "recvedPackets",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "srcPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "mwBitmap",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "appData",
              "type": "bytes"
            }
          ],
          "internalType": "struct UniversalPacket",
          "name": "packet",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_middleware",
          "type": "address"
        }
      ],
      "name": "setDefaultMw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "timeoutPackets",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "channelId",
          "type": "bytes32"
        },
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "srcPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "uint256",
              "name": "mwBitmap",
              "type": "uint256"
            },
            {
              "internalType": "bytes32",
              "name": "destPortAddr",
              "type": "bytes32"
            },
            {
              "internalType": "bytes",
              "name": "appData",
              "type": "bytes"
            }
          ],
          "internalType": "struct UniversalPacket",
          "name": "packet",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "stateMutability": "payable",
      "type": "receive"
    }
  ]