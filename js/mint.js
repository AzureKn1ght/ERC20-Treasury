// (c) AzureKn1ght
const add = document.getElementById("add");
const amt = document.getElementById("amt");
const b1 = document.getElementById("b1");
const web3 = new Web3(window.ethereum);
const conAddress = "0xF5C318b1806f892bFFF1B8A82BA0368dF6CDCB5D";
const contract = new web3.eth.Contract(abi, conAddress);

//Initialize on load
function init() {
  //Get user id
  accountHash = sessionStorage.getItem("accountId") || "accountid";
  add.value = accountHash;
}

// Function to mint new coins
const mintCoins = async (e) => {
  //to prevent form from submitting and refreshing the page
  e.preventDefault();

  //to prevent empty input from submitting
  if (!add.value || !amt.value) {
    alert("Error: Please check your inputs.");
    return;
  }

  //Step 1: Get the input data from the form
  var d = add.value;
  var a = amt.value;
  console.log(`Address: ${d}, Amount: ${a}`);

  //Convert the amount to wei
  a = web3.utils.toWei(a, "ether");

  //Step 2: Send transaction to smart contract
  contract.methods
    .mint(d, a)
    .send({
      from: currentAccount,
    })
    .then((receipt) => {
      console.log(receipt);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error);
    });

  //Alert user to confirm the transactions
  alert("Minting: please confirm your transaction.");
  console.log("mintCoins(): processing...");
};

//Add event listener for buttons
b1.addEventListener("click", mintCoins);
document.getElementById("b2").onclick = function () {
  location.href = "dashboard.html";
};
init();
