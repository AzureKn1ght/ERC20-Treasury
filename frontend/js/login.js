// (c) AzureKn1ght
const b1 = document.getElementById("b1");
const tokAddress = "0xF5C318b1806f892bFFF1B8A82BA0368dF6CDCB5D";
const apiToken = "W6DIYT6D88MUQD4J11H7DPW6F8VP1NVNW2";

function init() {
  //Initialize the page
  titleName.href = `https://ropsten.etherscan.io/address/${tokAddress}`;

  //Get total supply of tokens
  getTotalSupply();
}

const getTotalSupply = async () => {
  let url = `https://api-ropsten.etherscan.io/api?module=stats&action=tokensupply&contractaddress=${tokAddress}&apikey=${apiToken}`;
  console.log(url);

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.result);
    totalSuppy = parseInt(data.result * Math.pow(10, -18));
    console.log(totalSuppy);
    titleName.innerHTML = `Total Supply: ${totalSuppy}`;
  } catch (err) {
    console.log(err);
  }
};

//Login function
function login() {
  ethereum
    .request({ method: "eth_requestAccounts" })
    .then(() => {
      handleAccountsChanged;
      console.log("connection done");
      window.location.href = "dashboard.html";
    })
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        alert("Please connect to MetaMask.");
      } else {
        alert("Error connecting to MetaMask. Please try again.");
        console.error(err);
      }
    });
}

//Add event listener for login btn
b1.addEventListener("click", login);
init();
