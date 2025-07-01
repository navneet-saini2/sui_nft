module sui_nft::nft {
    use sui::object::{new};
    use sui::tx_context::sender;
    use std::string::String;

    /// A basic NFT struct with metadata.
    public struct NFT has key {
        id: sui::object::UID,
        name: String,
        description: String,
    }

    /// Mint a new NFT to the caller.
    public fun mint(ctx: &mut TxContext, name: String, description: String) {
        let nft = NFT {
            id: new(ctx),
            name,
            description,
        };
        let recipient = sender(ctx);
        sui::transfer::transfer(nft, recipient);
    }

    /// Transfer an NFT to another address.
    public fun transfer_nft(nft: NFT, recipient: address) {
        sui::transfer::transfer(nft, recipient);
    }
}


