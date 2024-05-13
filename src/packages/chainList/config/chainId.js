import { mainnet, sepolia } from 'viem/chains'
const chainId = {
  ethereumMain: '0x1',
  ethereumTest: '0x5',
  uniSatMain: 'livenet',
  uniSatTest: 'testnet',
}
const  supportEvmNetworks = ['11155111','1','123666']
const tokenList = [
  {
    name: 'usdc',
    address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
    chainId: '11155111'
  },
  {
    name: 'usdc',
    address: '0xd4c702ab5272880ace5c8BA4742Ecc9eB7456850',
    chainId: '123666'
  }
]
const contractTokens=[
  {
    name: 'swap',
    address: '0x483c1FE0E455912A69De699DC967b6d0E1e4f94a',
    chainId: '11155111'
  },
  {
    name: 'swap',
    address: '0x4f0F26939BB50611124274E2051c42825130a1E8',
    chainId: '123666'
  }
]
const chains = [
  {
    chainId: 1,
    hexChainId: '0x' + mainnet.id.toString(16),
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: mainnet.explorerUrl,
    rpcUrl: mainnet.rpcUrls
  },
  {
    chainId: sepolia.id,
    hexChainId: '0x' + sepolia.id.toString(16),
    name: sepolia.name,
    currency: 'ETH',
    explorerUrl: sepolia.explorerUrl,
    rpcUrl: sepolia.rpcUrls
  },
  {
    chainId: '123666',
    hexChainId: '0x' + Number(123666).toString(16),
    name: 'Oneness Devnet',
    currency: 'BTC',
    explorerUrl: 'https://scan.devnet.onenesslabs.io',
    rpcUrl: ['https://rpc.devnet.onenesslabs.io']
  },

]
export {supportEvmNetworks,tokenList,contractTokens,chains};