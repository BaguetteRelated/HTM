// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract KofiNFT1155 is ERC1155Supply, Ownable {
    using Strings for uint256;
    string public baseURI;
    // mapping to keep track of admin
    mapping(address => bool) private whitelist;

    /**
     * @dev Throws if the caller is not in the whitelist.
     */
    modifier onlyWhitelist(address caller) {
        require(whitelist[caller], "Unauthorized");
        _;
    }

    constructor(string memory _baseURI) ERC1155("KofiNFT") {
        baseURI = _baseURI;
    }

    /**
     * @dev
     * This implementation returns the different URI
     * based on the id
     */
    function uri(uint256 id) public view override returns (string memory) {
        // Here it checks if the length of the baseURI is greater than 0, if it is return the baseURI and attach
        // the id and `.json` to it so that it knows the location of the metadata json file for a given
        // id stored on IPFS
        // If baseURI is empty return an empty string
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, id.toString(), ".json"))
                : "";
    }

    /**
     * @dev Creates `amount` tokens of token type `id`, and assigns them to `to`.
     *
     * Emits a {TransferSingle} event.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - If `to` refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the
     * acceptance magic value.
     */
    function mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        _mint(to, id, amount, data);
    }

    /**
     * @dev Mints `amount` tokens of token type `id` to each address in array of addresses `to`.
     *
     * Emits multiple {TransferSingle} events.
     *
     * Requirements:
     *
     * - `to` must not contain the zero address
     * - If `to[i]` for any i refers to a smart contract, it must implement {IERC1155Receiver-onERC1155Received} and return the
     * acceptance magic value.
     */
    function batchMint(
        address[] memory to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyOwner {
        uint length = to.length;
        for (uint i = 0; i < length; i++) {
            _mint(to[i], id, amount, data);
        }
    }

    /**
     * @dev safeTransferFrom checks if the given address is in the whitelist to transfer
     * if not it doest allow the caller to transfer
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override onlyWhitelist(msg.sender) {
        super.safeTransferFrom(from, to, id, amount, data);
    }

    /**
     * @dev safeBatchTransferFrom checks if the given address is in the whitelist to transfer
     * if not it doest allow the caller to transfer
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override onlyWhitelist(msg.sender) {
        super.safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    /**
     * @dev
     * modifyWhitelist adds or removes a given address from the whitelist
     */
    function modifyWhitelist(address _whitelistAddress, bool status)
        public
        onlyOwner
    {
        require(_whitelistAddress != address(0), "null address");
        whitelist[_whitelistAddress] = status;
    }

    /**
     * @dev
     * This implementation sets the baseURI based on an id
     */
    function setBaseURI(string memory _baseURI) public onlyOwner {
        baseURI = _baseURI;
    }
}
