
import React, { useState } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Button } from './ui/button';

const TransferForm: React.FC = () => {
  const { connected } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }
    
    if (!recipient || !amount) {
      alert('Please fill in both recipient address and amount');
      return;
    }
    
    try {
      setStatus('loading');
      
      // Simulate a transaction for now
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setTxHash(`0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`);
    } catch (error) {
      console.error('Transfer failed:', error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Transfer APT Tokens</h2>
        
        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Address
          </label>
          <input
            id="recipient"
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={status === 'loading'}
          />
        </div>
        
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount (APT)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.1"
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={status === 'loading'}
          />
        </div>
        
        <Button
          type="submit"
          disabled={!connected || status === 'loading'}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
        >
          {status === 'loading' ? 'Processing...' : 'Transfer APT'}
        </Button>
        
        {status === 'success' && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm font-medium">Transfer successful!</p>
            <p className="text-xs text-green-600 mt-1 break-all">Transaction ID: {txHash}</p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">Transfer failed. Please try again.</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default TransferForm;
