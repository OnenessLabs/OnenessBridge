import chainId from "@/packages/chainList/config/chainId.js";

const { uniSatMain, uniSatTest } = chainId;

const isPrdEnv = import.meta.env.VITE_APP_ENV === "prd";
export default {
  chainId: isPrdEnv ? uniSatMain : uniSatTest,
  env: isPrdEnv ? 'Mainnet' : 'Testnet',
  chainName: "UniSat"
}