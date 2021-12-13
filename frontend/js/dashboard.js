// (c) AzureKn1ght
const balance = document.getElementById("balance");
const titleName = document.getElementById("titleName");
const b1 = document.getElementById("b1");
const web3 = new Web3(window.ethereum);
const tokAddress = "0xF5C318b1806f892bFFF1B8A82BA0368dF6CDCB5D";
const tokContract = new web3.eth.Contract(abi, tokAddress);

var total_balance = 6999;
var accountHash = 0;

//Initialize the page on load
function init() {
  //Get user name and id
  accountHash = sessionStorage.getItem("accountId") || "accountid";
  titleName.innerHTML = `${tokAddress}`;
  titleName.href = `https://ropsten.etherscan.io/address/${tokAddress}`;

  //Get total supply from token contract
  getTotalSupply();
}

//Function to get total supply
function getTotalSupply() {
  tokContract.methods
    .totalSupply()
    .call()
    .then((result) => {
      let bal = Math.trunc(web3.utils.fromWei(result));
      console.log(bal);

      sessionStorage.setItem("balance", bal);
      total_balance = sessionStorage.getItem("balance");
      balance.innerText = `₿ ${total_balance}`;
    })
    .catch((error) => {
      console.log(error);
    });
}

function logout() {
  //Logout and redirect to login page
  sessionStorage.clear();
  window.location.href = "index.html";
}

init();
b1.addEventListener("click", function (e) {
  e.preventDefault();
  location.href = "mint.html";
});
