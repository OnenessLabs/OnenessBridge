let metaMaskProvider = window.ethereum;
const okxProvider = window.okxwallet;
const uniSatProvider = window.unisat;
if (window.ethereum?.providers?.length) {
  metaMaskProvider = window.ethereum.providers.find(
    (item) => item.isMetaMask
  );
}

const providerMap = new Map([
  ['ethereum', window.ethereum],
  ['okx', okxProvider],
  ['uniSat', uniSatProvider],
  ['metaMask', metaMaskProvider]
]);

const installedList = {
  metaMask: metaMaskProvider?.isMetaMask,
  okx: typeof window.okxwallet !== 'undefined',
  uniSat: typeof window.unisat !== 'undefined',
}

export {
  metaMaskProvider,
  providerMap,
  installedList
}