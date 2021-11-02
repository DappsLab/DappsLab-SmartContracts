// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IOT {

    mapping(string => address) public modelVendors;
    mapping (address  => string) public vendorIP;
    mapping (address  => string) public distributerIP;
    mapping(address  => uint256) public distributerBalance;


    struct Firmware{
        string model;
        string version;
        bytes32 hash;
        string[] urls;
        uint256 reward;
        uint256 time;
    }
    struct Device{
        string model;
        address deviveAddress;
        address distributer;
        string version;
        bytes32 hash;
    }

    mapping(string =>Device[]) modelDevices;
    mapping(string =>Firmware[]) modelFirmware;

    constructor(){

    }
    function registerVendor(address vendorAddress, string memory model) public {
        modelVendors[model] = vendorAddress;
    }
    function getModelVendor(string memory model) public view returns(address){
        return modelVendors[model];
    }
    function registerDevices(string memory model,address[] memory devicesAddresses, uint256 count) public returns(bool){
        require(msg.sender == modelVendors[model],"sender is not a vendor or not registered as vendor");
        for(uint256 i=0; i < count; i++){
            bytes32 hash = bytes32(0);
            address devAddr = devicesAddresses[i];
            address zeroAddr = address(0);
            Device memory device = Device(model, devAddr, zeroAddr, "0", hash);
            device.model = model;
            modelDevices[model].push(device);
        }
        // emit event
        return true;
    }

    function getDevices(string memory model)public view returns(Device[] memory) {
        Device[] memory device = modelDevices[model];
        return device;
    }

    function updateVendor(string memory model, string memory version, bytes32 hash, string memory ip, uint256 reward, uint256 time) public returns(bool){
        require(msg.sender == modelVendors[model],"sender is not a vendor or not registered as vendor");
        string[] memory tempurls;
        Firmware memory firmware = Firmware(model, version, hash, tempurls, reward, time);
        firmware.model = model;
        firmware.version = version;
        firmware.hash = hash;
        firmware.reward = reward;
        firmware.time = time;
        modelFirmware[model].push(firmware);

        vendorIP[msg.sender] = ip;
        // emit Event
        return true;
    }

    function registURL(string memory moddel, string memory version, string memory ip, bytes memory sign) public returns(bool){

    }


    function verify() public pure returns (bool) {
        bytes32 message = ethMessageHash("3cf86118f44f91873205a2feda98a9c340e31cbbd42f0c6d7c0b1ebe9048a16e,0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");

        bytes memory sig = hex"7ef2abfa6056a7fd0a008366fa5a612ab50a1003d3063b6aa3ec9afba2ea4bfb6b616620b068f2bd7e09661dbb7ce0dbeb8d0f9ed9b91c403c68ebfd0c3b2a5800";
        address addr = 0xDd23780B150eEe40C35EDc223F495C9192064339;

        return recover(message, sig) == addr;
    }

    /**
     * @dev Recover signer address from a message by using their signature
     * @param hash bytes32 message, the hash is the signed message. What is recovered is the signer address.
     * @param sig bytes signature, the signature is generated using web3.eth.sign()
     */
    function recover(bytes32 hash, bytes memory sig) internal pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        // Check the signature length
        if (sig.length != 65) {
            return (address(0));
        }

        // Divide the signature in r, s and v variables
        // ecrecover takes the signature parameters, and the only way to get them
        // currently is to use assembly.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }

        // Version of signature should be 27 or 28, but 0 and 1 are also possible versions
        if (v < 27) {
            v += 27;
        }

        // If the version is correct return the signer address
        if (v != 27 && v != 28) {
            return (address(0));
        } else {
            // solium-disable-next-line arg-overflow
            return ecrecover(hash, v, r, s);
        }
    }

    /**
    * @dev prefix a bytes32 value with "\x19Ethereum Signed Message:" and hash the result
    */
    function ethMessageHash(string memory message) public pure returns (bytes32) {
        bytes32 hash = keccak256(abi.encodePacked(message));
        return keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
        );
    }



}