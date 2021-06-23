// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC721_2.sol";

contract MyToken2 is ERC721 {
    string[] internal tokens;
    constructor()
    ERC721(
        "My Token2",
        "TKN2"
    )
    {}
    function _creatorOf(uint256 tokenId) public view returns(address){
        return _creator[tokenId];
    }

    function MintNFT(string memory URI) public returns(uint256) {
        tokens.push(URI);
        uint256 tokenId = tokens.length - 1;
        _safeMint(msg.sender, tokenId);
        return tokenId;
    }
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721) {
        super._beforeTokenTransfer(from, to, tokenId);
        uint256 secondaryShare = msg.value / 100 * 10;
        payable(_creatorOf(tokenId)).transfer(secondaryShare);
    }
}