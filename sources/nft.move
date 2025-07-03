module sui_nft::nft {
    use sui::object::{new};
    use sui::tx_context::{sender, TxContext}; // Ensure TxContext is imported here
    use std::string::String;

    /// A basic NFT struct with metadata.
    public struct NFT has key {
        id: sui::object::UID,
        name: String,
        description: String,
    }

    /// Mint a new NFT to the caller.
    // *** IMPORTANT CHANGE HERE: 'ctx' moved to the end ***
    public entry fun mint(name: String, description: String, ctx: &mut TxContext) {
        let nft = NFT {
            id: new(ctx),
            name,
            description,
        };
        let recipient = sender(ctx);
        sui::transfer::transfer(nft, recipient);
    }

    /// Transfer an NFT to another address.
    // *** IMPORTANT CHANGE HERE: 'ctx' moved to the end ***
    public entry fun transfer_nft(nft: NFT, recipient: address, ctx: &mut TxContext) {
        sui::transfer::transfer(nft, recipient);
    }
}

