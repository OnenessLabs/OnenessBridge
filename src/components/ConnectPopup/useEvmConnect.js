export function useConnect (emit)  {
  const methods = {
    onConnectWallet({ accounts }) {
      
    }
  }
  return {
    // ElDialog,
    // web3Store,
    // $httpApi,
    // $tokenManage,
    // okxWalletDisabled,
    // uniSatWalletDisabled,
    methods,
    emit,
}
}