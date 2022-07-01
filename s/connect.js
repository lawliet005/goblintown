const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;
let web3Modal;
let provider2;
let selectedAccount;
function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 500);
  });
}
function init() {
  document.getElementById("Check-Claim").style.display = "flex";
  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("Fortmatic is", Fortmatic);
  console.log(
    "window.web3 is",
    window.web3,
    "window.ethereum is",
    window.ethereum
  );
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: { infuraId: "75ed72222fb6416387281db4a951319f" },
    },
  };
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions,
    theme: "dark",
    disableInjectedProvider: false,
  });
  console.log("Web3Modal instance is", web3Modal);
}
async function fetchAccountData() {
  const web3 = new Web3(provider2);
  console.log("Web3 instance is", web3);
  const chainId = await web3.eth.getChainId();
  const accounts = await web3.eth.getAccounts();
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];
  document.querySelector("#Connect").innerHTML =
    selectedAccount.substring(0, 3) +
    "..." +
    selectedAccount.substring(selectedAccount.length - 3);
  document.getElementById("Who-Hungy").style.display = "inline";
  document.getElementById("Connect").classList.add("disabled");
  document.getElementById("Connect").removeAttribute("onclick");
}
async function refreshAccountData() {
  await fetchAccountData(provider2);
}
async function onConnect() {
  init();
  console.log("Opening a dialog", web3Modal);
  try {
    provider2 = await web3Modal.connect();
  } catch (e) {
    console.log("Could not get a wallet connection", e);
    return;
  }
  provider2.on("accountsChanged", (accounts) => {
    window.location.reload();
    fetchAccountData();
  });
  provider2.on("chainChanged", (chainId) => {
    window.location.reload();
    fetchAccountData();
  });
  provider2.on("networkChanged", (networkId) => {
    window.location.reload();
    fetchAccountData();
  });
  await refreshAccountData();
}
async function onDisconnect() {
  console.log("Killing the wallet connection", provider2);
  if (provider2.close) {
    await provider2.close();
    await web3Modal.clearCachedProvider();
    provider2 = null;
    selectedAccount = null;
  }
  selectedAccount = null;
}
window.addEventListener("load", async () => {
  document.querySelector("#Connect").addEventListener("click", onConnect);
});
