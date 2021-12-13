// (c) AzureKn1ght
const nsgdBal = document.getElementById("nsgdBal");
const ethBal = document.getElementById("ethBal");
const wbtcBal = document.getElementById("wbtcBal");
const web3 = new Web3(window.ethereum);

//PHIL CONTRACT
const philAddress = "0xF5C318b1806f892bFFF1B8A82BA0368dF6CDCB5D"; //TO REPLACE WITH TOKEN ADDRESS
const philContract = new web3.eth.Contract(tokenABI, philAddress);

//Initialize the page on load
function init() {
  //Get user name and id
  var accountHash = sessionStorage.getItem("accountId") || "accountid";

  //Get account balance from token contracts
  getTokenBal(accountHash, "eth", ethBal, 5);
  getTokenBal(accountHash, philContract, wbtcBal, 0);
}

//Function to get token balance
function getTokenBal(id, tokContract, elm, dec) {
  if (tokContract === "eth") {
    web3.eth
      .getBalance(id)
      .then((result) => {
        let bal = Number.parseFloat(web3.utils.fromWei(result)).toFixed(dec);
        console.log(bal);
        elm.innerText = `${bal}`;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    tokContract.methods
      .balanceOf(id)
      .call()
      .then((result) => {
        let bal = Number.parseFloat(web3.utils.fromWei(result)).toFixed(dec);
        console.log(bal);
        elm.innerText = `${bal}`;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

//PLEASE KEEP THE LOGOUT FUNCTION THANKS
function logout() {
  //Logout and redirect to login page
  sessionStorage.clear();
  window.location.href = "index.html";
}

init();
