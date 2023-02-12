import { React, useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "./contracts/SilverToken.json";
import { Web3Provider } from "@ethersproject/providers";
import Transaction from "./componenets/Transaction";

function App() {
  const [activeAccount, setActiveAccount] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);

  const contractAddress = "0xC16322799f2645D5b7a1287392072aA668F8144B";
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const connectMetamask = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result) => {
            setActiveAccount(result[0]);
          });
        const provider = new Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setProvider(provider);
        setSigner(signer);
        setContract(contract);
      } else {
        console.log("Need to install Metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getBalance = async () => {
    const balanceInBig = await contract.balanceOf(activeAccount);
    const balanceInNum = Number(balanceInBig) / 100;
    setTokenBalance(balanceInNum);
  };
  useEffect(() => {
    if (contract != null) {
      getBalance();
    }
  }, [contract]);
  return (
    <div>
      <div className="text-center mt-10">
        <button
          type="button"
          onClick={connectMetamask}
          className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Connect to Metamask
        </button>
      </div>
      <div className="items-center mt-5 py-3 px-4 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 w-1/2 m-auto">
        <h3>Wallet Address: {activeAccount} </h3>
      </div>
      <div className="items-center mt-5 py-3 px-4 text-sm font-medium text-center text-white bg-sky-500 rounded-lg hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 w-1/2 m-auto">
        <h3>Token Balance: {tokenBalance} </h3>
      </div>
      <Transaction contract={contract}></Transaction>
    </div>
  );
}

export default App;
