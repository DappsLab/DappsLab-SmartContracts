export const hexToNumber = (hex) => {
  return parseInt(hex, 16);
}

export const toWie=(eth)=>{
  return eth*1000000000000000000
}
export const toEth=(wei)=>{
  return wei/1000000000000000000
}
