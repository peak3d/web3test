export default {
  addresses: {
    // mainnet
    1: {
      DAIv2: {
        wolves: '0x50418A1a7A06b697e447bB2Ffdd2241547684691',
        token: '0x6b175474e89094c44da98b954eedeac495271d0f',
      },
      TUSDv2: {
        wolves: '0xDC3315BABDdA07b620EEFC2006C629889Cb684B1',
        token: '0x0000000000085d4780B73119b644AE5ecd22b376',
      },
      USDTv2: {
        wolves: '0x1b1A4586FD99f7e044868ac8e5E91EAc4863149b',
        token: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      },
      USDCv2: {
        wolves: '0xae1887e035385d2f7d3Ff057c6EE053842f30Af6',
        token: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      },
      tokenAddress: '0x468ab3b1f63A1C14b361bC367c3cC92277588Da1',
    },
    // Ropsten
    3: {
      DAIv2: {
        wolves: '0x98c2a42dEF062A692D53A4D122a25881dBa9448e',
        token: '0x31F42841c2db5173425b5223809CF3A38FEde360',
      },
      TUSDv2: {
        wolves: '',
        token: '',
      },
      USDTv2: {
        wolves: '',
        token: '',
      },
      USDCv2: {
        wolves: '0x24877cFd3E674fAA7B800d9df9647c5053164D53',
        token: '0x0D9C8723B343A8368BebE0B5E89273fF8D712e3C',
      },
      tokenAddress: '0x62B175D51aF4533085c71A3D00Fb96a113488B6e',
    },
    // rinkeby
    4: {
      DAIv2: {
        wolves: '',
        token: '',
      },
      TUSDv2: {
        wolves: '',
        token: '',
      },
      USDTv2: {
        wolves: '',
        token: '',
      },
      USDCv2: {
        wolves: '0xB4Fb352D7A488d231dea21D80C76A88A6e092a9E',
        token: '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
      },
      tokenAddress: '0xe17399850c9c12934901BC30c8e4ba8d9341Af7F',
    },
    // Kovan
    42: {
      DAIv2: {
        wolves: '0x5a201f1E6a0fA83393355D13C3E7eADa10CB730f',
        token: '0xC4375B7De8af5a38a93548eb8453a498222C4fF2',
      },
      TUSDv2: {
        wolves: '',
        token: '',
      },
      USDTv2: {
        wolves: '',
        token: '',
      },
      USDCv2: {
        wolves: '0x98edd562897162F1267C567AB95FEe75CD394476',
        token: '0xe22da380ee6B445bb8273C81944ADEB6E8450422',
      },
      tokenAddress: '0x62B175D51aF4533085c71A3D00Fb96a113488B6e',
    },
  },
  tokenAbi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      type: 'event',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
      ],
      name: 'allowance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'subtractedValue',
          type: 'uint256',
        },
      ],
      name: 'decreaseAllowance',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'addedValue',
          type: 'uint256',
        },
      ],
      name: 'increaseAllowance',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      payable: false,
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'transfer',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: false,
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  stableFarmAbi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amountIn',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amountOut',
          type: 'uint256',
        },
      ],
      name: 'Invest',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'token',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amountIn',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amountOut',
          type: 'uint256',
        },
      ],
      name: 'Redeem',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_amount',
          type: 'uint256',
        },
      ],
      name: 'deposit',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_user',
          type: 'address',
        },
      ],
      name: 'getUIData',
      outputs: [
        {
          internalType: 'uint256',
          name: 'yAmount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'assetAmount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'tokensEarned',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'apr',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'tvl',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_shares',
          type: 'uint256',
        },
      ],
      name: 'withdraw',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
};
