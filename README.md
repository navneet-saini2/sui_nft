🎨 Sui NFT Protocol
A lightweight and extensible NFT (Non-Fungible Token) protocol built using Move for the Sui blockchain. This module enables users to mint and transfer NFTs with customizable metadata, such as name and description, on the Sui testnet.

📋 Overview
The sui_nft::nft module provides a minimal yet robust implementation for creating and managing NFTs on the Sui blockchain. Key features include:

Minting: Create NFTs with a unique ID, name, and description.
Transferring: Transfer ownership of NFTs to other Sui addresses.
Testnet Deployment: Deployed and tested on the Sui testnet for experimentation and development.

This project is ideal for developers exploring NFT functionality on Sui or building applications that require simple tokenization.

📁 Module: sui_nft::nft
The Move module (sui_nft::nft) defines the following components:
NFT Structure
public struct NFT has key {
    id: sui::object::UID,
    name: String,
    description: String,
}

Functions

mint(ctx: &mut TxContext, name: String, description: String): Mints a new NFT with the provided name and description, assigning ownership to the caller.
transfer_nft(nft: NFT, recipient: address): Transfers an existing NFT to the specified recipient address.


🚀 Getting Started
Prerequisites

Sui CLI: Install the Sui CLI to interact with the testnet. Follow the Sui Installation Guide.
Sui Wallet: Set up a Sui wallet to manage addresses and interact with the testnet.
Move Compiler: Ensure you have the Move compiler configured for Sui.

Deployment
The module is deployed on the Sui testnet. To interact with it:

Clone this repository:git clone <repository-url>
cd sui-nft-protocol


Publish the module to the testnet using the Sui CLI:sui client publish --gas-budget 10000000

Note the package ID returned after publishing for use in transactions.

Usage
To mint or transfer NFTs, use the Sui CLI or integrate the module into a Sui-compatible application.
Mint an NFT
sui client call --package <package-id> --module nft --function mint --args "<name>" "<description>" --gas-budget 1000000

Example:
sui client call --package 0x123... --module nft --function mint --args "MyNFT" "A cool NFT on Sui" --gas-budget 1000000

Transfer an NFT
sui client call --package <package-id> --module nft --function transfer_nft --args <nft-object-id> <recipient-address> --gas-budget 1000000

Example:
sui client call --package 0x123... --module nft --function transfer_nft --args 0x456... 0x789... --gas-budget 1000000


🛠️ Development
Testing
To test the module locally:

Use the Sui CLI to deploy to the testnet or a local Sui network.
Write test scripts in Move to verify mint and transfer_nft functionality.
Example test commands:sui client publish --gas-budget 10000000
sui client call --package <package-id> --module nft --function mint --args "TestNFT" "Test Description" --gas-budget 1000000



Extending the Module
You can enhance the module by adding features like:

Access Control: Restrict minting to specific addresses.
Metadata Expansion: Add fields like image URLs or attributes.
Events: Emit events for minting and transfer actions to enable tracking.


📡 Testnet Deployment
This module is deployed on the Sui testnet. Check the Sui Explorer for transaction details using the package ID (replace <package-id> with the actual ID after deployment).

📝 Notes

Ensure you have sufficient testnet SUI tokens to cover gas fees. Request tokens from the Sui testnet faucet.
The module is designed for simplicity but can be extended for production use with additional security and functionality.


🤝 Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch for your feature or bug fix.
Submit a pull request with a clear description of changes.


📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
