import { createPinia } from 'pinia'
export default createPinia();

export { useWeb3Store } from "./web3/index.js";
export { useInviteCodePopup } from "@/components/InviteCodePopup/store.js";
export { useHomeStore } from "./home/index.js";
