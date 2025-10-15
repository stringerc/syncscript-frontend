// Web3 Integration Utilities
// This utility provides Web3 wallet integration and blockchain functionality

interface Web3Provider {
  name: string;
  type: 'metamask' | 'walletconnect' | 'coinbase' | 'phantom';
  isInstalled: boolean;
  isConnected: boolean;
  account?: string;
  chainId?: number;
}

interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  gasUsed: string;
  gasPrice: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
}

interface TokenBalance {
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  contractAddress?: string;
}

interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

class Web3Manager {
  private providers: Web3Provider[] = [];
  private currentProvider: Web3Provider | null = null;
  private transactions: Transaction[] = [];
  private networks: NetworkConfig[] = [];
  private isInitialized = false;

  constructor() {
    this.initializeNetworks();
    this.detectProviders();
  }

  private initializeNetworks(): void {
    this.networks = [
      {
        chainId: 1,
        name: 'Ethereum Mainnet',
        rpcUrl: 'https://mainnet.infura.io/v3/',
        explorerUrl: 'https://etherscan.io',
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18
        }
      },
      {
        chainId: 137,
        name: 'Polygon',
        rpcUrl: 'https://polygon-rpc.com',
        explorerUrl: 'https://polygonscan.com',
        nativeCurrency: {
          name: 'MATIC',
          symbol: 'MATIC',
          decimals: 18
        }
      },
      {
        chainId: 42161,
        name: 'Arbitrum One',
        rpcUrl: 'https://arb1.arbitrum.io/rpc',
        explorerUrl: 'https://arbiscan.io',
        nativeCurrency: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18
        }
      },
      {
        chainId: 56,
        name: 'BSC',
        rpcUrl: 'https://bsc-dataseed.binance.org',
        explorerUrl: 'https://bscscan.com',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18
        }
      }
    ];
  }

  private detectProviders(): void {
    if (typeof window === 'undefined') return;

    this.providers = [
      {
        name: 'MetaMask',
        type: 'metamask',
        isInstalled: !!(window as any).ethereum?.isMetaMask,
        isConnected: false
      },
      {
        name: 'WalletConnect',
        type: 'walletconnect',
        isInstalled: !!(window as any).WalletConnect,
        isConnected: false
      },
      {
        name: 'Coinbase Wallet',
        type: 'coinbase',
        isInstalled: !!(window as any).ethereum?.isCoinbaseWallet,
        isConnected: false
      },
      {
        name: 'Phantom',
        type: 'phantom',
        isInstalled: !!(window as any).solana?.isPhantom,
        isConnected: false
      }
    ];
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    console.log('🔗 Initializing Web3 Manager...');
    
    this.detectProviders();
    await this.checkConnectionStatus();
    
    this.isInitialized = true;
    console.log('✅ Web3 Manager initialized');
  }

  public async connectWallet(providerType: string): Promise<boolean> {
    try {
      const provider = this.providers.find(p => p.type === providerType);
      if (!provider) {
        throw new Error(`Provider ${providerType} not found`);
      }

      if (!provider.isInstalled) {
        throw new Error(`${provider.name} is not installed`);
      }

      console.log(`🔗 Connecting to ${provider.name}...`);

      // Mock connection process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful connection
      provider.isConnected = true;
      provider.account = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6';
      provider.chainId = 1;

      this.currentProvider = provider;

      console.log(`✅ Connected to ${provider.name}`);
      return true;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return false;
    }
  }

  public async disconnectWallet(): Promise<void> {
    if (this.currentProvider) {
      console.log(`🔌 Disconnecting from ${this.currentProvider.name}...`);
      
      this.currentProvider.isConnected = false;
      this.currentProvider.account = undefined;
      this.currentProvider.chainId = undefined;
      
      this.currentProvider = null;
      console.log('✅ Wallet disconnected');
    }
  }

  public async switchNetwork(chainId: number): Promise<boolean> {
    try {
      const network = this.networks.find(n => n.chainId === chainId);
      if (!network) {
        throw new Error(`Network with chainId ${chainId} not supported`);
      }

      console.log(`🔄 Switching to ${network.name}...`);

      // Mock network switch
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (this.currentProvider) {
        this.currentProvider.chainId = chainId;
      }

      console.log(`✅ Switched to ${network.name}`);
      return true;
    } catch (error) {
      console.error('Failed to switch network:', error);
      return false;
    }
  }

  public async getBalance(address?: string): Promise<string> {
    try {
      const account = address || this.currentProvider?.account;
      if (!account) {
        throw new Error('No account connected');
      }

      console.log(`💰 Getting balance for ${account}...`);

      // Mock balance fetch
      await new Promise(resolve => setTimeout(resolve, 500));

      // Return mock balance
      return '2.456789';
    } catch (error) {
      console.error('Failed to get balance:', error);
      return '0';
    }
  }

  public async getTokenBalances(address?: string): Promise<TokenBalance[]> {
    try {
      const account = address || this.currentProvider?.account;
      if (!account) {
        throw new Error('No account connected');
      }

      console.log(`🪙 Getting token balances for ${account}...`);

      // Mock token balances fetch
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Return mock token balances
      return [
        {
          symbol: 'ETH',
          name: 'Ether',
          balance: '2.456789',
          decimals: 18
        },
        {
          symbol: 'USDC',
          name: 'USD Coin',
          balance: '1000.00',
          decimals: 6,
          contractAddress: '0xA0b86a33E6441b8C4C8C0C4C0C4C0C4C0C4C0C4C'
        },
        {
          symbol: 'USDT',
          name: 'Tether USD',
          balance: '500.00',
          decimals: 6,
          contractAddress: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
        }
      ];
    } catch (error) {
      console.error('Failed to get token balances:', error);
      return [];
    }
  }

  public async sendTransaction(to: string, value: string, data?: string): Promise<string> {
    try {
      if (!this.currentProvider?.isConnected) {
        throw new Error('No wallet connected');
      }

      console.log(`📤 Sending transaction to ${to}...`);

      // Mock transaction
      const transaction: Transaction = {
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        from: this.currentProvider.account!,
        to,
        value,
        gasUsed: '21000',
        gasPrice: '20000000000',
        status: 'pending',
        timestamp: Date.now()
      };

      this.transactions.unshift(transaction);

      // Simulate transaction confirmation
      setTimeout(() => {
        transaction.status = 'confirmed';
        console.log(`✅ Transaction confirmed: ${transaction.hash}`);
      }, 3000);

      return transaction.hash;
    } catch (error) {
      console.error('Failed to send transaction:', error);
      throw error;
    }
  }

  public async deployContract(bytecode: string, abi: any, constructorArgs?: any[]): Promise<string> {
    try {
      if (!this.currentProvider?.isConnected) {
        throw new Error('No wallet connected');
      }

      console.log('📦 Deploying smart contract...');

      // Mock contract deployment
      await new Promise(resolve => setTimeout(resolve, 5000));

      const contractAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      
      console.log(`✅ Contract deployed at: ${contractAddress}`);
      return contractAddress;
    } catch (error) {
      console.error('Failed to deploy contract:', error);
      throw error;
    }
  }

  public async callContractMethod(
    contractAddress: string,
    abi: any,
    methodName: string,
    params?: any[]
  ): Promise<any> {
    try {
      if (!this.currentProvider?.isConnected) {
        throw new Error('No wallet connected');
      }

      console.log(`📞 Calling contract method ${methodName}...`);

      // Mock contract call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Return mock result
      return { success: true, result: 'Mock result' };
    } catch (error) {
      console.error('Failed to call contract method:', error);
      throw error;
    }
  }

  public async signMessage(message: string): Promise<string> {
    try {
      if (!this.currentProvider?.isConnected) {
        throw new Error('No wallet connected');
      }

      console.log('✍️ Signing message...');

      // Mock message signing
      await new Promise(resolve => setTimeout(resolve, 1000));

      const signature = `0x${Math.random().toString(16).substr(2, 128)}`;
      console.log(`✅ Message signed: ${signature}`);
      return signature;
    } catch (error) {
      console.error('Failed to sign message:', error);
      throw error;
    }
  }

  public getProviders(): Web3Provider[] {
    return [...this.providers];
  }

  public getCurrentProvider(): Web3Provider | null {
    return this.currentProvider;
  }

  public getTransactions(): Transaction[] {
    return [...this.transactions];
  }

  public getNetworks(): NetworkConfig[] {
    return [...this.networks];
  }

  public getCurrentNetwork(): NetworkConfig | null {
    if (!this.currentProvider?.chainId) return null;
    return this.networks.find(n => n.chainId === this.currentProvider!.chainId) || null;
  }

  public isConnected(): boolean {
    return this.currentProvider?.isConnected || false;
  }

  public getAccount(): string | null {
    return this.currentProvider?.account || null;
  }

  public getChainId(): number | null {
    return this.currentProvider?.chainId || null;
  }

  public async addNetwork(network: NetworkConfig): Promise<boolean> {
    try {
      console.log(`➕ Adding network ${network.name}...`);

      // Check if network already exists
      const existingNetwork = this.networks.find(n => n.chainId === network.chainId);
      if (existingNetwork) {
        console.log('Network already exists');
        return true;
      }

      this.networks.push(network);
      console.log(`✅ Network ${network.name} added`);
      return true;
    } catch (error) {
      console.error('Failed to add network:', error);
      return false;
    }
  }

  public async removeNetwork(chainId: number): Promise<boolean> {
    try {
      console.log(`➖ Removing network with chainId ${chainId}...`);

      const index = this.networks.findIndex(n => n.chainId === chainId);
      if (index === -1) {
        console.log('Network not found');
        return false;
      }

      this.networks.splice(index, 1);
      console.log(`✅ Network removed`);
      return true;
    } catch (error) {
      console.error('Failed to remove network:', error);
      return false;
    }
  }

  public destroy(): void {
    console.log('🗑️ Destroying Web3 Manager...');
    
    this.providers = [];
    this.currentProvider = null;
    this.transactions = [];
    this.networks = [];
    this.isInitialized = false;
  }
}

// Create singleton instance
export const web3Manager = new Web3Manager();

// Convenience functions
export const initializeWeb3 = () => web3Manager.initialize();
export const connectWallet = (providerType: string) => web3Manager.connectWallet(providerType);
export const disconnectWallet = () => web3Manager.disconnectWallet();
export const switchNetwork = (chainId: number) => web3Manager.switchNetwork(chainId);
export const getBalance = (address?: string) => web3Manager.getBalance(address);
export const getTokenBalances = (address?: string) => web3Manager.getTokenBalances(address);
export const sendTransaction = (to: string, value: string, data?: string) => web3Manager.sendTransaction(to, value, data);
export const deployContract = (bytecode: string, abi: any, constructorArgs?: any[]) => web3Manager.deployContract(bytecode, abi, constructorArgs);
export const callContractMethod = (contractAddress: string, abi: any, methodName: string, params?: any[]) => web3Manager.callContractMethod(contractAddress, abi, methodName, params);
export const signMessage = (message: string) => web3Manager.signMessage(message);

// Export types
export type { Web3Provider, Transaction, TokenBalance, NetworkConfig };

// Export for testing
export const __test__ = {
  Web3Manager,
  web3Manager
};
