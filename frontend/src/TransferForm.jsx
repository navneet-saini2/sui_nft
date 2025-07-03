import React, { useState } from 'react';
import { useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';

export default function TransferForm() {
  const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransactionBlock();
  const [objectId, setObjectId] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleTransfer = async () => {
    if (!signAndExecuteTransactionBlock) {
      console.error('Wallet not connected.');
      alert('Please connect your wallet first!');
      return;
    }

    const tx = new Transaction();

    tx.moveCall({
      // !!! UPDATED PACKAGE ID !!!
      target: '0x6b6e118a80cc6a169157ff0a5f7c41138bf95ebfaf2bab1d7d430cce661ee3c6::nft::transfer_nft',
      arguments: [
        tx.object(objectId), // NFT object ID
        tx.pure(recipient, 'address'), // Recipient address as pure 'address' type
        // No explicit 'ctx' argument needed for entry functions
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
            console.log('Transfer Success:', result);
            alert('NFT Transferred Successfully! Transaction Digest: ' + result.digest);
            setObjectId('');
            setRecipient('');
          },
          onError: (error) => {
            console.error('Transfer Error:', error);
            alert('Failed to transfer NFT: ' + error.message);
          },
        }
      );
    } catch (err) {
      console.error('Unexpected error during transfer:', err);
      alert('An unexpected error occurred. Check console for details.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md mt-6">
      <h2 className="text-xl font-semibold mb-2">Transfer NFT</h2>
      <input
        className="border rounded px-2 py-1 w-full mb-2"
        type="text"
        placeholder="NFT Object ID"
        value={objectId}
        onChange={(e) => setObjectId(e.target.value)}
        id="nftObjectId"
        name="nftObjectId"
      />
      <input
        className="border rounded px-2 py-1 w-full mb-2"
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        id="recipientAddress"
        name="recipientAddress"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleTransfer}>
        Transfer NFT
      </button>
    </div>
  );
}