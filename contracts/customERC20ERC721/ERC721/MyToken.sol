// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./presets/ERC721PresetMinterPauserAutoId.sol";

contract MyToken is ERC721PresetMinterPauserAutoId {
    constructor()
    ERC721PresetMinterPauserAutoId(
        "My Token",
        "TKN",
        "https://example.com/api/token/"
    ){}

//    function _BEFORETOKENTRANSFER(
//        address from,
//        address to,
//        uint256 tokenId
//    ) internal virtual override(ERC721, ERC721Pausable) {
//        super._beforeTokenTransfer(from, to, tokenId);
//
//        // do stuff before every transfer
//        // e.g. check that vote (other than when minted)
//        // being transferred to registered candidate
//    }
}