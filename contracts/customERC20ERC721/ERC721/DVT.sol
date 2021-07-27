// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./presets/ERC721PresetMinterPauserAutoId.sol";
import "./extensions/ERC721Pausable.sol";

contract DVT is ERC721PresetMinterPauserAutoId {
    constructor()
    ERC721PresetMinterPauserAutoId(
        "Davinci Token",
        "DVT",
        "https://davinci.com/api/token/"
    )
    {}

    // function _beforeTokenTransfer(
    //     address from,
    //     address to,
    //     uint256 tokenId
    // ) internal virtual override(ERC721) {
    //     super._beforeTokenTransfer(from, to, tokenId);
    //     uint256 secondaryShare = msg.value / 100 * 10;
    //     payable(_creatorOf(tokenId)).transfer(secondaryShare);
    // }
}