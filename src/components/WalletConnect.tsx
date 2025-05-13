
import React from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { Button } from './ui/button';

const WalletConnect: React.FC = () => {
  const { connected, account, wallet, connect, disconnect } = useWallet();

  const handleConnectWallet = async () => {
    if (connected) {
      await disconnect();
    } else {
      // If wallet is available, use its name as required by the updated wallet adapter API
      if (wallet) {
        await connect(wallet.name);
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Button 
        onClick={handleConnectWallet} 
        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
      >
        {connected ? 'Disconnect Wallet' : 'Connect Wallet'}
      </Button>
      
      {connected && account && (
        <div className="text-sm text-gray-700 bg-gray-100 p-2 rounded-md">
          <p>Connected to: <span className="font-mono">{wallet?.name}</span></p>
          <p>Address: <span className="font-mono break-all">{account.address.toString()}</span></p>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
