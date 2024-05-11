<script setup>
import {defineEmits} from "vue";
import {useConnect} from "@/components/ConnectPopup/useConnect.js";

import ConnectButton from "@/components/ConnectButton/index.vue";
import btnWrap from "./btnWrap.vue";
import iconUniSat from "./iconUnisat.vue";
import iconOkx from "./iconOkx.vue";

const emit = defineEmits(["loginSuccess"]);

const {
  web3Store,
  methods,
  $tokenManage
} = useConnect(emit);

const handleDisconnectWallet = () => {
  $tokenManage.removeToken();
  $tokenManage.removeTokenTs();
  web3Store.disconnect();
  methods.handleClose();
  window.location.reload();
};
</script>

<template>
  <div class="text-[#9c9c9c] text-base lg:text-[calc(24/1920*100vw)] 3xl:text-[24px]
     mb-[calc(24/750*100vw)] lg:mb-[calc(24/1920*100vw)] 3xl:mb-[24px]">
    <p>Bitcoin Wallet（Required）</p>
    <p v-if="web3Store.connectPop.btcFirstError" class="fade-in text-[#a10808] mt-1 text-base lg:text-lg">
      {{ web3Store.connectPop.btcFirstError }}
    </p>
  </div>

  <div class="connect-btn" v-if="!web3Store.currentAccount">
    <ConnectButton type="uniSat" @onConnectWallet="methods.onConnectWallet">
      <btn-wrap class="w-full" name="UniSat wallet">
        <template #icon>
          <icon-uni-sat />
        </template>
      </btn-wrap>
    </ConnectButton>

    <ConnectButton type="okx" @onConnectWallet="methods.onConnectWallet">
      <btn-wrap class="w-full" name="Okx wallet">
        <template #icon>
          <icon-okx />
        </template>
      </btn-wrap>
    </ConnectButton>
  </div>

  <div class="connect-btn" v-else>
    <ConnectButton type="uniSat" @onConnectWallet="methods.onConnectWallet">
      <btn-wrap class="w-full" :name="web3Store.currentAccountFake">
        <template #icon>
          <icon-uni-sat />
        </template>
        <template #right>
          <span
            @click="handleDisconnectWallet"
            class="cursor-pointer text-[#D6B635] text-base lg:text-[calc(24/1920*100vw)] 3xl:text-[24px]">
            Disconnect
          </span>
        </template>
      </btn-wrap>
    </ConnectButton>
  </div>
</template>
