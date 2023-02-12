import React, { useState } from "react";

const Transaction = ({ contract }) => {
  const [transactionHash, setTransactionHash] = useState(null);
  const transactionHandler = async (event) => {
    event.preventDefault();
    let receiverAddress = event.target.address.value;
    let sendAmount = event.target.amount.value;
    let transferAmount = sendAmount * 100;
    let trans = await contract.transfer(receiverAddress, transferAmount);
    console.log(trans);
    setTransactionHash("Transaction confirmed with hash:" + trans.hash);
  };
  return (
    <div className="w-1/2 mx-auto bg-slate-600 mt-10 p-5 border rounded-lg">
      <form onSubmit={transactionHandler}>
        <div className="mb-6">
          <label
            for="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Receiver Address
          </label>
          <input
            type="text"
            id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Receiver Address"
            required
          />
        </div>
        <div className="mb-6">
          <label
            for="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Transfer Amount
          </label>
          <input
            type="number"
            id="amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Send Token
        </button>
        <div className="mt-5">
          <h3 className="text-slate-100">{transactionHash}</h3>
        </div>
      </form>
    </div>
  );
};

export default Transaction;
