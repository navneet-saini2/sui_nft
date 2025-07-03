// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Import Dapp Kit CSS for styling UI components like ConnectButton
import '@mysten/dapp-kit/dist/index.css'; 

// Dapp Kit and React Query imports
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getFullnodeUrl } from '@mysten/sui/client'; // Use @mysten/sui/client for getFullnodeUrl

// 1. Configure the networks for SuiClientProvider
// Use getFullnodeUrl for standard network URLs
const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl('testnet') },
  // You can add other networks like devnet, mainnet, or localnet if needed
  // devnet: { url: getFullnodeUrl('devnet') },
  // mainnet: { url: getFullnodeUrl('mainnet') },
});

// 2. Create a QueryClient instance for React Query
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Wrap with QueryClientProvider */}
    <QueryClientProvider client={queryClient}>
      {/* 4. Wrap with SuiClientProvider, specifying networks and default */}
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        {/* 5. Wrap with WalletProvider. `autoConnect` is a good practice for convenience. */}
        <WalletProvider autoConnect>
          <App />
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);