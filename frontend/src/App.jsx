// src/App.jsx
import React from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit'; // Removed SuiClientProvider, WalletProvider, createNetworkConfig as they are in main.jsx
import MintForm from './MintForm';
import TransferForm from './TransferForm';

export default function App() {
  const account = useCurrentAccount(); // Optional: to display the connected account info

  return (
    <div className="p-8 space-y-6">
      <ConnectButton />
      {account && ( // Display account info if connected
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <p>Connected Address: <strong>{account.address}</strong></p>
          <p>Network: <strong>{account.chains[0]}</strong></p>
        </div>
      )}
      <MintForm />
      <TransferForm />
    </div>
  );
}