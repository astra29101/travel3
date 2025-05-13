
import React from 'react';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import WalletConnect from '../components/WalletConnect';
import TransferForm from '../components/TransferForm';

const Index: React.FC = () => {
  // Initialize wallets
  const wallets = [new PetraWallet()];
  
  return (
    <AptosWalletAdapterProvider 
      wallets={wallets} 
      autoConnect={true}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">APT Token Transfer dApp</h1>
            <p className="mt-2 text-lg text-gray-600">Connect your Petra wallet and transfer APT tokens</p>
          </div>
          
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <WalletConnect />
            </div>
            
            <div className="p-6">
              <TransferForm />
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>This dApp runs on the Aptos Devnet. Transactions are simulated for demo purposes.</p>
          </div>
        </div>
      </div>
    </AptosWalletAdapterProvider>
  );
};

export default Index;
