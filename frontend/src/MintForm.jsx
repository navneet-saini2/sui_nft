import React, { useState } from 'react';
import { useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';

export default function MintForm() {
  const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleMint = async () => {
    if (!signAndExecuteTransactionBlock) {
      console.error('Wallet not connected.');
      alert('Please connect your wallet first!');
      return;
    }

    const tx = new Transaction();

    console.log("Minting with Name:", name);
    console.log("Minting with Description:", description);
    console.log("Attempting to mint with package ID:", '0x6b6e118a80cc6a169157ff0a5f7c41138bf95ebfaf2bab1d7d430cce661ee3c6'); // Replace with your actual ID

    tx.moveCall({
      // !!! UPDATED PACKAGE ID !!!
      target: '0x6b6e118a80cc6a169157ff0a5f7c41138bf95ebfaf2bab1d7d430cce661ee3c6::nft::mint',
      arguments: [
        // These arguments are correct for 'public entry fun mint(name: String, description: String, ctx: &mut TxContext)'
        tx.pure(new TextEncoder().encode(name), 'vector<u8>'),
        tx.pure(new TextEncoder().encode(description), 'vector<u8>'),
      ],
    });

    try {
      signAndExecuteTransactionBlock(
        {
          transactionBlock: tx,
          options: { showEffects: true, showObjectChanges: true },
        },
        {
          onSuccess: (result) => {
            console.log('Mint Success:', result);
            alert('NFT Minted Successfully! Transaction Digest: ' + result.digest);
            setName('');
            setDescription('');
          },
          onError: (error) => {
            console.error('Mint Error:', error);
            alert('Failed to mint NFT: ' + error.message);
          },
        }
      );
    } catch (err) {
      console.error('Unexpected error during mint:', err);
      alert('An unexpected error occurred. Check console for details.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2">Mint NFT</h2>
      <input
        className="border rounded px-2 py-1 w-full mb-2"
        type="text"
        placeholder="NFT Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="nftName"
        name="nftName"
      />
      <input
        className="border rounded px-2 py-1 w-full mb-2"
        type="text"
        placeholder="NFT Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        id="nftDescription"
        name="nftDescription"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleMint}>
        Mint NFT
      </button>
    </div>
  );
}