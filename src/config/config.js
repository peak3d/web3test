const config = {
 erc20ABI: [
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_spender",
  				"type": "address"
  			},
  			{
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "approve",
  		"outputs": [
  			{
  				"name": "success",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_to",
  				"type": "address"
  			},
  			{
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "showMeTheMoney",
  		"outputs": [],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_to",
  				"type": "address"
  			},
  			{
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "transfer",
  		"outputs": [
  			{
  				"name": "success",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"constant": false,
  		"inputs": [
  			{
  				"name": "_from",
  				"type": "address"
  			},
  			{
  				"name": "_to",
  				"type": "address"
  			},
  			{
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "transferFrom",
  		"outputs": [
  			{
  				"name": "success",
  				"type": "bool"
  			}
  		],
  		"payable": false,
  		"stateMutability": "nonpayable",
  		"type": "function"
  	},
  	{
  		"anonymous": false,
  		"inputs": [
  			{
  				"indexed": true,
  				"name": "_from",
  				"type": "address"
  			},
  			{
  				"indexed": true,
  				"name": "_to",
  				"type": "address"
  			},
  			{
  				"indexed": false,
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "Transfer",
  		"type": "event"
  	},
  	{
  		"anonymous": false,
  		"inputs": [
  			{
  				"indexed": true,
  				"name": "_owner",
  				"type": "address"
  			},
  			{
  				"indexed": true,
  				"name": "_spender",
  				"type": "address"
  			},
  			{
  				"indexed": false,
  				"name": "_value",
  				"type": "uint256"
  			}
  		],
  		"name": "Approval",
  		"type": "event"
  	},
  	{
  		"constant": true,
  		"inputs": [
  			{
  				"name": "_owner",
  				"type": "address"
  			},
  			{
  				"name": "_spender",
  				"type": "address"
  			}
  		],
  		"name": "allowance",
  		"outputs": [
  			{
  				"name": "remaining",
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
  				"name": "_owner",
  				"type": "address"
  			}
  		],
  		"name": "balanceOf",
  		"outputs": [
  			{
  				"name": "balance",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "decimals",
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
  		"inputs": [],
  		"name": "name",
  		"outputs": [
  			{
  				"name": "",
  				"type": "string"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "symbol",
  		"outputs": [
  			{
  				"name": "",
  				"type": "string"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	},
  	{
  		"constant": true,
  		"inputs": [],
  		"name": "totalSupply",
  		"outputs": [
  			{
  				"name": "",
  				"type": "uint256"
  			}
  		],
  		"payable": false,
  		"stateMutability": "view",
  		"type": "function"
  	}
  ],
  aggregatedContractAddress: '0x9cad8ab10daa9af1a9d2b878541f41b697268eec',
  aggregatedContractABI: [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":true,"inputs":[],"name":"APR","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"UNI","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"UNIAPR","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"UNIROI","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"aave","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"aaveUni","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"aToken","type":"address"}],"name":"addAToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"aToken","type":"address"}],"name":"addAUniToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"cToken","type":"address"}],"name":"addCToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"dToken","type":"uint256"}],"name":"addDToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"iToken","type":"address"}],"name":"addIToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"created","type":"uint256"}],"name":"addPool","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"compound","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"dydx","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"fulcrum","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"getAPROptions","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getBAT","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getDAI","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getETH","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getKNC","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getLINK","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMKR","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getREP","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSNX","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getSUSD","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUSDC","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUSDT","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getWBTC","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getZRX","outputs":[{"internalType":"uint256","name":"uniapr","type":"uint256"},{"internalType":"uint256","name":"capr","type":"uint256"},{"internalType":"uint256","name":"unicapr","type":"uint256"},{"internalType":"uint256","name":"iapr","type":"uint256"},{"internalType":"uint256","name":"uniiapr","type":"uint256"},{"internalType":"uint256","name":"aapr","type":"uint256"},{"internalType":"uint256","name":"uniaapr","type":"uint256"},{"internalType":"uint256","name":"dapr","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"inCaseETHGetsStuck","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"_TokenAddress","type":"address"}],"name":"inCaseTokenGetsStuck","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"pools","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_new_APR","type":"address"}],"name":"set_new_APR","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_new_UNI","type":"address"}],"name":"set_new_UNI","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_new_UNIAPR","type":"address"}],"name":"set_new_UNIAPR","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_new_UNIROI","type":"address"}],"name":"set_new_UNIROI","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_token","type":"address"}],"name":"viewPool","outputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"address","name":"unipool","type":"address"},{"internalType":"uint256","name":"created","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
};

export default config;
