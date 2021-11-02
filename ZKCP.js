const Web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const {randomBytes} = require('crypto')
const secp256k1 = require('secp256k1')
const util = require('ethereumjs-util')
const provider = new HDWalletProvider('detect surround mercy wing invite session subway final fragile fade buyer century', 'http://64.225.91.151:8545');
const async = require('async');
const web3 = new Web3(provider);
(async () => {
    console.log('hello')
    // Using eth.sign()
    // console.log(web3.utils.toChecksumAddress('0xdd23780b150eee40c35edc223f495c9192064339'))
    let msg = web3.utils.sha3('TEST')
    console.log(msg)
    // const sigObj = secp256k1.ecdsaSign(msg.toString(), privKey)


})();

const sign = async (privateKey, data) => {
    console.log('data:', ...data);
    const pubKey = secp256k1.publicKeyCreate(privateKey);
}

function toHexString(byteArray) {
    return Array.from(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}

function bytesToHex(bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        var current = bytes[i] < 0 ? bytes[i] + 256 : bytes[i];
        hex.push((current >>> 4).toString(16));
        hex.push((current & 0xF).toString(16));
    }
    return hex.join("");
}

// generate privKey
function getPrivateKey() {
    while (true) {
        const privKey = randomBytes(32)
        if (secp256k1.privateKeyVerify(privKey)) return privKey
    }
}