const Web3 = require('web3')
const web3 = new Web3('wss://speedy-nodes-nyc.moralis.io/0c737387b1a66a69fdc98ec9/bsc/testnet/ws');

const signAndSendTransaction = async (to, amount, gas, privateKey) => {
    const Signed = await signTransaction(to, amount, gas, privateKey);
    const receipt = await sendSignedTransaction(Signed.rawTransaction);
    const transaction = await getTransaction(receipt.transactionHash);
    return {signed: Signed, receipt: receipt, transaction: transaction}
}
const signTransaction = async (to, amount, gas, privateKey) => {
    return await web3.eth.accounts.signTransaction({
        to: to,
        value: amount,
        gas: gas
    }, privateKey);
}
const sendSignedTransaction = async (rawTx) => {
    return await web3.eth.sendSignedTransaction(rawTx);
}
const getTransaction = async (transactionHash) => {
    return await web3.eth.getTransaction(transactionHash)
}
const toWei = (eth) => {
    return eth * 1000000000000000000;
}
(async () => {
    // console.log("Syncing:",await isSyncing())
    // console.log("latest",await web3.eth.getBlock('latest'))
    // console.log(await getTransactionCount("0x1036970AD593e3033425153e5B3270829068946b"))
    // console.log("Transaction:",await getTransactionReceipt('0xe497f617c18cc658084a1178c0d5e7d19fe7bcfddfe553363812e884287c9a42'))
    console.log("Balance",await  web3.eth.getBalance("0x078425B1b19bA3361AD9ec9247f97510a8bFB583"));
    // console.log("test results:",await signTransaction("0xb19484680E1b8B0A85Ce713A85161e514Ef5fC7C","1000000000","1000","ab0a28843ec54420f179d029ec150e48ac7f2b3296c58a7db313fd35686e111a"))
    // const  data = await signAndSendTransaction("0xdb252F9fB7B81EfaDa66c6D0fFe37375C5dB82Bb", toWei(3).toString(), "21000", "0x4d282978e7dd0bf1d97511895a1af88bccb0f495dd0da0c6b5f316f8014c1a05")
    // console.log("transaction:",data)
    // console.log("recovered",await web3.eth.getTransactionReceipt(data.receipt.transactionHash));
    // console.log("test results:",await sendTransaction("0xb19484680E1b8B0A85Ce713A85161e514Ef5fC7C","0x32d31e8060f7a1255226988b1f522da0112ac59f","1000"))
})();
