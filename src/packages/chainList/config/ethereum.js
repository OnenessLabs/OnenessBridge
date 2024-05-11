import chainId from "./chainId.js";

const { ethereumMain, ethereumTest } = chainId;
const prdChain = {
  "chainId": ethereumMain,
  env: "Mainnet",
  "chainName": "Ethereum Mainnet",
  "nativeCurrency": {
    "name": "Ether",
    "symbol": "ETH",
    "decimals": 18
  },
  "rpcUrls": [
    "https://eth.drpc.org",
    "https://eth.meowrpc.com",
    "https://1rpc.io/eth",
    "https://api.securerpc.com/v1"
  ],
  "blockExplorerUrls": ["https://etherscan.io/"]
}

const testChain = {
  "chainId": ethereumTest,
  env: "Testnet",
  "chainName": "Goerli",
  "nativeCurrency": {
    "name": "Goerli",
    "symbol": "ETH",
    "decimals": 18
  },
  "rpcUrls": [
    "https://goerli.drpc.org",
    "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    "https://eth-goerli.public.blastapi.io",
    "https://rpc.ankr.com/eth_goerli",
    "https://goerli.blockpi.network/v1/rpc/public"
  ],
  "blockExplorerUrls": ["https://goerli.etherscan.io/"]
}

const isPrdEnv = import.meta.env.VITE_APP_ENV === "prd";
export default isPrdEnv ? prdChain : testChain;
