// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./ERC721.sol";

//import "./presets/ERC721PresetMinterPauserAutoId.sol";

contract NFT is ERC721 {
    constructor()ERC721(
        "Passport","T2P"
    ){

    }
}
