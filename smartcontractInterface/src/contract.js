import {provider, contractInterface, CONTRACT_ADDRESS} from './blockchain';

console.log(contractInterface)
export const mintNFT = async (from, to, data) => {
  const params = [
    {
      from: from,
      // to: to,
      to: CONTRACT_ADDRESS,
      data: data,
    },
  ];
  const transactionHash = await provider.send('eth_sendTransaction', params);
  // const tx  = await provider.signTransaction(params)
  // console.log('transactionHash is ' + transactionHash);

  // const tokenURI = await contractInterface.tokenURI(tokenID);

  return {
    // tokenURI,
    transactionHash,
  };
};
export const startLending=async (id,price)=>{
  let res
  try {
    res=await contractInterface.startLending(id,price)
    return res
  }catch (e) {
    return e
  }
}

export const cancelLending=async (id)=>{
  let res
  try {
    res=await contractInterface.cancelLending(id)
    return res
  }catch (e) {
    return e
  }
}
export const startSellingNFT=async (id,price)=>{
  let res
  try {
    res=await contractInterface.startSellingNFT(id,price)
    return res
  }catch (e) {
    return e
  }
}
export const cancelSellingNFT=async (id)=>{
  let res
  try {
    res=await contractInterface.cancelSellingNFT(id)
    return res
  }catch (e) {
    return e
  }
}
export const getLendingPrice=async (id)=>{
  let res
  try {
    res=await contractInterface.getLendingPrice( id);
    return res
  }catch (e) {
    return e
  }
}
export const getSellingPrice=async (id)=>{
  let res
  try {
    res=await contractInterface.getSellPrice(id);
    return res
  }catch (e) {
    return e
  }
}
export const toWie=(eth)=>{
  return eth*1000000000000000000
}
export const BuyNFT=async (id,value)=>{
  console.log(id,"buyNFt = ", id,value)
  let res
  const accounts = await provider.listAccounts();
  let override={
    from:accounts[0],
    value:value
  }
  try {
    res=await contractInterface.buyNFT(id,override);
    return res
  }catch (e) {
    return e
  }
}
export const lend=async (id,time,value)=>{
  console.log(id,time,"lend")
  let res
  const accounts = await provider.listAccounts();
  let override={
    from:accounts[0],
    value:value*time
  }
  try {
    res=await contractInterface.lend( id,time,override);
    return res
  }catch (e) {
    return e
  }
}
