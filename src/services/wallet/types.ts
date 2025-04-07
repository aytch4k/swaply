export interface WalletProvider {
  isAvailable: () => boolean;
  initialize: () => boolean;
  connect: (chainId?: number) => Promise<string>;
  disconnect: () => Promise<boolean>;
}