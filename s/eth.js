
const contract = {
  address: "0xbCe3781ae7Ca1a5e050Bd9C4c77369867eBc307e",
  abi: [
    "function tokenOfOwnerByIndex(address owner, uint256 index) public view override returns (uint256)",
    "function balanceOf(address owner) public view virtual override returns (uint256)",
  ],
};
const burger = {
  address: "0xc5B52253f5225835cc81C52cdb3d6A22bc3B0c93",
  abi: [
    "function esemblSNAK(uint yurGoblino, uint frize, uint slop, uint meet, uint meltee, uint stuf, uint grippe) external",
    "function chekfyerupder(uint256 yurGoblino) external view returns (bool)",
  ],
};
var hashBackground = 0;
var hashSauce = 0;
var hashMeat = 0;
var hashCheese = 0;
var hashToppings = 0;
var hashBun = 0;
var selectedGoblin = 0;
function setBackground(hash) {
  hashBackground = hash;
  console.log(hashBackground);
}
function setSauce(hash) {
  hashSauce = hash;
  console.log(hashSauce);
}
function setMeat(hash) {
  hashMeat = hash;
  console.log(hashMeat);
}
function setCheese(hash) {
  hashCheese = hash;
  console.log(hashCheese);
}
function setToppings(hash) {
  hashToppings = hash;
  console.log(hashToppings);
}
function setBun(hash) {
  hashBun = hash;
  console.log(hashBun);
}
function selectGoblin(token) {
  let image =
    `https://ipfs.io/ipfs/QmSifFzarzzen5Vv4TWWhpN56VksqZrF3Bmuuc4gdGTEv1/` +
    token +
    `.png`;
  selectedGoblin = token;
  console.log(selectedGoblin);
  document.getElementById("Hungy-Gobbies").style.display = "none";
  document.getElementById("Kustmer").style.display = "flex";
  document.getElementById("Who-Hungy").style.display = "none";
  document.getElementById("fillKustmer").innerHTML =
    `<div class="pfp">` +
    `<img src="` +
    image +
    `">` +
    `</div>` +
    `<div id="Kustmer__Token">#` +
    selectedGoblin +
    `</div>`;
  document.getElementById("Connect").classList.add("disabled");
  document.getElementById("Connect").removeEventListener("click", onConnect);
  document.getElementById("Claim-Burgur").style.display = "inline";
  document.getElementById("Triggers").style.display = "inline";
  document.getElementById("Check-Claim").style.display = "none";
}
function selectGoblinDemo(token) {
  let image = `https://goblintown.wtf/mcgoblin/favi.jpg`;
  console.log(selectedGoblin);
  document.getElementById("Hungy-Gobbies").style.display = "none";
  document.getElementById("Kustmer").style.display = "flex";
  document.getElementById("Who-Hungy").style.display = "none";
  document.getElementById("fillKustmer").innerHTML =
    `<div class="pfp">` +
    `<img src="` +
    image +
    `">` +
    `</div>` +
    `<div id="Kustmer__Token">Demo Mode</div>`;
  document.getElementById("Connect").classList.add("disabled");
  document.getElementById("Connect").removeEventListener("click", onConnect);
  document.getElementById("Claim-Burgur").style.display = "inline";
  document.getElementById("Triggers").style.display = "inline";
  document.getElementById("Check-Claim").style.display = "none";
}
async function getGoblins() {
  document.getElementById("Hungy-Gobbies").classList.toggle("active");
  document.getElementById("Who-Hungy").innerHTML = "Loading Goblins..";
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(
      contract.address,
      contract.abi,
      provider
    );
    const CONTRACT_ADDRESS_BURGERS = new ethers.Contract(
      burger.address,
      burger.abi,
      provider
    );
    var bal = await CONTRACT_ADDRESS.balanceOf(signer.getAddress());
    var total = parseInt(bal);
    console.log(total);
    if (total === 0) {
      document.getElementById("Who-Hungy").innerHTML = "No Goblino :(";
      let image = `https://goblintown.wtf/mcgoblin/favi.jpg`;
      document.getElementById("showGobs").innerHTML +=
        `<div class="item" onclick="selectGoblinDemo()">` +
        `<div class="pfp">` +
        `<img src="` +
        image +
        `">` +
        `</div>` +
        `<div class="pfp-token">Demo Mode</div>` +
        `</div>`;
    } else {
      for (var i = 0; i < total; i++) {
        let token = await CONTRACT_ADDRESS.tokenOfOwnerByIndex(
          signer.getAddress(),
          i
        );
        let image =
          `https://ipfs.io/ipfs/QmSifFzarzzen5Vv4TWWhpN56VksqZrF3Bmuuc4gdGTEv1/` +
          token +
          `.png`;
        let claimed = await CONTRACT_ADDRESS_BURGERS.chekfyerupder(token);
        console.log(claimed);
        if (claimed) {
          document.getElementById("showGobs").innerHTML +=
            `<div class="item claimed" onclick="selectGoblin(` +
            token +
            `)">` +
            `<div class="pfp">` +
            `<img src="` +
            image +
            `">` +
            `</div>` +
            `<div class="pfp-token">#` +
            token +
            `</div>` +
            `</div>`;
        } else {
          document.getElementById("showGobs").innerHTML +=
            `<div class="item" onclick="selectGoblin(` +
            token +
            `)">` +
            `<div class="pfp">` +
            `<img src="` +
            image +
            `">` +
            `</div>` +
            `<div class="pfp-token">#` +
            token +
            `</div>` +
            `</div>`;
        }
      }
      document.getElementById("Who-Hungy").innerHTML = "Select Goblin";
      document.getElementById("Who-Hungy").classList.add("disabled");
      document.getElementById("Who-Hungy").removeAttribute("onclick");
    }
  } catch (err) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: { infuraId: "944aeb0b43d54d28a7768d5df3dc7320" },
      },
    };
    const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions });
    const providerConnect = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(providerConnect);
    const signer = providerConnect.accounts[0];
    const CONTRACT_ADDRESS = new ethers.Contract(
      contract.address,
      contract.abi,
      provider.getSigner()
    );
    const CONTRACT_ADDRESS_BURGERS = new ethers.Contract(
      burger.address,
      burger.abi,
      provider
    );
    var bal = await CONTRACT_ADDRESS.balanceOf(providerConnect.accounts[0]);
    var bal = await CONTRACT_ADDRESS.balanceOf(providerConnect.accounts[0]);
    var total = parseInt(bal);
    console.log(total);
    if (total === 0) {
      document.getElementById("Who-Hungy").innerHTML = "No Goblino :(";
      let image = `https://goblintown.wtf/mcgoblin/favi.jpg`;
      document.getElementById("showGobs").innerHTML +=
        `<div class="item" onclick="selectGoblinDemo()">` +
        `<div class="pfp">` +
        `<img src="` +
        image +
        `">` +
        `</div>` +
        `<div class="pfp-token">Demo Mode</div>` +
        `</div>`;
    } else {
      for (var i = 0; i < total; i++) {
        let token = await CONTRACT_ADDRESS.tokenOfOwnerByIndex(
          providerConnect.accounts[0],
          i
        );
        let image =
          `https://ipfs.io/ipfs/QmSifFzarzzen5Vv4TWWhpN56VksqZrF3Bmuuc4gdGTEv1/` +
          token +
          `.png`;
        let claimed = await CONTRACT_ADDRESS_BURGERS.chekfyerupder(token);
        console.log(claimed);
        if (claimed) {
          document.getElementById("showGobs").innerHTML +=
            `<div class="item claimed" onclick="selectGoblin(` +
            token +
            `)">` +
            `<div class="pfp">` +
            `<img src="` +
            image +
            `">` +
            `</div>` +
            `<div class="pfp-token">#` +
            token +
            `</div>` +
            `</div>`;
        } else {
          document.getElementById("showGobs").innerHTML +=
            `<div class="item" onclick="selectGoblin(` +
            token +
            `)">` +
            `<div class="pfp">` +
            `<img src="` +
            image +
            `">` +
            `</div>` +
            `<div class="pfp-token">#` +
            token +
            `</div>` +
            `</div>`;
        }
      }
      document.getElementById("Who-Hungy").innerHTML = "Select Goblin";
      document.getElementById("Who-Hungy").classList.add("disabled");
      document.getElementById("Who-Hungy").removeAttribute("onclick");
    }
  }
}
function showclaim() {
  document.getElementById("claim").style.display = "inline";
}
async function checkClaim() {
  try {
    var token = document.getElementById("check").value;
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
    const CONTRACT_ADDRESS = new ethers.Contract(
      contract.address,
      contract.abi,
      provider
    );
    const CONTRACT_ADDRESS_BURGERS = new ethers.Contract(
      burger.address,
      burger.abi,
      provider
    );
    let isClaimed = await CONTRACT_ADDRESS_BURGERS.chekfyerupder(token);
    if (token > 9999 || token < 0 || isNaN(token)) {
      document.getElementById("Avail-Btn").innerHTML = "Goblin No Exist";
      await delay(3);
      document.getElementById("check").value = "";
      document.getElementById("Avail-Btn").innerHTML = "Check If Goblin Orderd";
    } else {
      if (isClaimed === false) {
        document.getElementById("Avail-Btn").innerHTML = "Goblin Hungry";
        document.getElementById("Avail-Btn").style.color = "green";
        await delay(3);
        document.getElementById("Avail-Btn").style.color = "black";
        document.getElementById("check").value = "";
        document.getElementById("Avail-Btn").innerHTML =
          "Check If Goblin Orderd";
      } else {
        document.getElementById("Avail-Btn").innerHTML = "Goblin Orderd";
        document.getElementById("Avail-Btn").style.color = "red";
        await delay(3);
        document.getElementById("Avail-Btn").style.color = "black";
        document.getElementById("check").value = "";
        document.getElementById("Avail-Btn").innerHTML =
          "Check If Goblin Orderd";
      }
    }
  } catch (err) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: { infuraId: "944aeb0b43d54d28a7768d5df3dc7320" },
      },
    };
    const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions });
    const providerConnect = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(providerConnect);
    const signer = providerConnect.accounts[0];
    const CONTRACT_ADDRESS = new ethers.Contract(
      contract.address,
      contract.abi,
      provider.getSigner()
    );
    const CONTRACT_ADDRESS_BURGERS = new ethers.Contract(
      burger.address,
      burger.abi,
      provider.getSigner()
    );
    let isClaimed = await CONTRACT_ADDRESS_BURGERS.chekfyerupder(token);
    if (token > 9999 || token < 0 || isNaN(token)) {
      document.getElementById("Avail-Btn").innerHTML = "Goblin No Exist";
      await delay(3);
      document.getElementById("check").value = "";
      document.getElementById("Avail-Btn").innerHTML = "Check If Goblin Orderd";
    } else {
      if (isClaimed === false) {
        document.getElementById("Avail-Btn").innerHTML = "Goblin Hungry";
        document.getElementById("Avail-Btn").style.color = "green";
        await delay(3);
        document.getElementById("Avail-Btn").style.color = "black";
        document.getElementById("check").value = "";
        document.getElementById("Avail-Btn").innerHTML =
          "Check If Goblin Orderd";
      } else {
        document.getElementById("Avail-Btn").innerHTML = "Goblin Orderd";
        document.getElementById("Avail-Btn").style.color = "red";
        await delay(3);
        document.getElementById("Avail-Btn").style.color = "black";
        document.getElementById("check").value = "";
        document.getElementById("Avail-Btn").innerHTML =
          "Check If Goblin Orderd";
      }
    }
  }
}
async function esemblSNAK() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    let userAddress = await signer.getAddress();
  } catch (err) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: { infuraId: "944aeb0b43d54d28a7768d5df3dc7320" },
      },
    };
    const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions });
    const providerConnect = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(providerConnect);
    const signer = providerConnect.accounts[0];
  }
}
async function connect() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
  } catch (err) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: { infuraId: "944aeb0b43d54d28a7768d5df3dc7320" },
      },
    };
    const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions });
    const providerConnect = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(providerConnect);
    const signer = providerConnect.accounts[0];
  }
}
function delay(n) {
  return new Promise(function (resolve) {
    setTimeout(resolve, n * 500);
  });
}
function MakeQuerablePromise(promise) {
  if (promise.isFulfilled) return promise;
  var isPending = true;
  var isRejected = false;
  var isFulfilled = false;
  var result = promise.then(
    function (v) {
      isFulfilled = true;
      isPending = false;
      return v;
    },
    function (e) {
      v;
      isRejected = true;
      isPending = false;
      throw e;
    }
  );
  result.isFulfilled = function () {
    return isFulfilled;
  };
  result.isPending = function () {
    return isPending;
  };
  result.isRejected = function () {
    return isRejected;
  };
  return result;
}
function hasNonDigit(str) {
  return /\D/g.test(str.toString());
}
class sign {
  constructor(contractAddress, chainId, signer) {
    this.contractAddress = contractAddress;
    this.chainId = chainId;
    this.signer = signer;
  }
  static async esembl() {
    try {
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      let userAddress = await signer.getAddress();
      const web3 = new Web3(provider2);
      const chainIdon2 = await web3.eth.getChainId();
      console.log(hashBackground);
      console.log(hashSauce);
      console.log(hashMeat);
      console.log(hashCheese);
      console.log(hashToppings);
      console.log(hashBun);
      if (chainIdon2 != 1) {
        document.getElementById("Claim-Burgur").innerHTML = "iz gotta b ETH";
      } else {
        const CONTRACT_ADDRESS = new ethers.Contract(
          contract.address,
          contract.abi,
          provider
        );
        const CONTRACT_ADDRESS_BURGER = new ethers.Contract(
          burger.address,
          burger.abi,
          provider
        );
        esemblSNAK(
          selectedGoblin,
          hashBackground,
          hashSauce,
          hashMeat,
          hashCheese,
          hashToppings,
          hashBun
        );
        document.getElementById("Claim-Burgur").removeAttribute("onclick");
        const hash = new ethers.Contract(burger.address, burger.abi, signer);
        const tx = await hash.esemblSNAK(
          selectedGoblin,
          hashBackground,
          hashSauce,
          hashMeat,
          hashCheese,
          hashToppings,
          hashBun
        );
        goblinSong.pause();
        makinBurgurs.play();
        document.getElementById("Claim-Burgur").innerHTML =
          "burger beeing made..";
        document.getElementById("Sauce-Thumbs").classList.remove("active");
        document.getElementById("Topping-Thumbs").classList.remove("active");
        document.getElementById("Meat-Thumbs").classList.remove("active");
        document.getElementById("Cheese-Thumbs").classList.remove("active");
        document.getElementById("Bun-Thumbs").classList.remove("active");
        document.getElementById("Sides-Thumbs").classList.remove("active");
        document.getElementById("Sauce-Trigger").style.display = "none";
        document.getElementById("Meat-Trigger").style.display = "none";
        document.getElementById("Cheese-Trigger").style.display = "none";
        document.getElementById("Topping-Trigger").style.display = "none";
        document.getElementById("Sides-Trigger").style.display = "none";
        document.getElementById("Buns-Trigger").style.display = "none";
        document.getElementById("Claim-Burgur").removeAttribute("onclick");
        const receipt = await tx.wait();
        document.getElementById("Claim-Burgur").innerHTML = "hear u go";
        document.getElementById("Talky-Talky").style.display = "flex";
      }
    } catch (err) {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider,
          options: { infuraId: "944aeb0b43d54d28a7768d5df3dc7320" },
        },
      };
      const web3Modal = new Web3Modal({ cacheProvider: true, providerOptions });
      const providerConnect = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(providerConnect);
      const signer = providerConnect.accounts[0];
      const CONTRACT_ADDRESS = new ethers.Contract(
        contract.address,
        contract.abi,
        provider.getSigner()
      );
      const CONTRACT_ADDRESS_BURGER = new ethers.Contract(
        burger.address,
        burger.abi,
        provider.getSigner()
      );
      esemblSNAK(
        selectedGoblin,
        hashBackground,
        hashSauce,
        hashMeat,
        hashCheese,
        hashToppings,
        hashBun
      );
      document.getElementById("Claim-Burgur").removeAttribute("onclick");
      const hash = new ethers.Contract(
        burger.address,
        burger.abi,
        provider.getSigner()
      );
      const tx = await hash.esemblSNAK(
        selectedGoblin,
        hashBackground,
        hashSauce,
        hashMeat,
        hashCheese,
        hashToppings,
        hashBun
      );
      goblinSong.pause();
      makinBurgurs.play();
      document.getElementById("Claim-Burgur").innerHTML =
        "burger beeing made..";
      document.getElementById("Sauce-Thumbs").classList.remove("active");
      document.getElementById("Topping-Thumbs").classList.remove("active");
      document.getElementById("Meat-Thumbs").classList.remove("active");
      document.getElementById("Cheese-Thumbs").classList.remove("active");
      document.getElementById("Bun-Thumbs").classList.remove("active");
      document.getElementById("Sides-Thumbs").classList.remove("active");
      document.getElementById("Sauce-Trigger").style.display = "none";
      document.getElementById("Meat-Trigger").style.display = "none";
      document.getElementById("Cheese-Trigger").style.display = "none";
      document.getElementById("Topping-Trigger").style.display = "none";
      document.getElementById("Sides-Trigger").style.display = "none";
      document.getElementById("Buns-Trigger").style.display = "none";
      document.getElementById("Claim-Burgur").removeAttribute("onclick");
      const receipt = await tx.wait();
      document.getElementById("Claim-Burgur").innerHTML = "hear u go";
      document.getElementById("Talky-Talky").style.display = "flex";
    }
  }
  async _signingDomain() {
    if (this._domain != null) {
      return this._domain;
    }
    const chainId = await this.chainId;
    this._domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contractAddress,
      chainId,
    };
    return this._domain;
  }
}
