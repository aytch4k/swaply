import { evmProvider } from './evmProvider';
import { solanaProvider } from './solanaProvider';
import { xrpProvider } from './xrpProvider';
import type { NetworkType } from '../../../config/networks';

export function getWalletProvider(networkType: NetworkType) {
  switch (networkType) {
    case 'evm':
      return evmProvider;
    case 'solana':
      return solanaProvider;
    case 'xrp':
      return xrpProvider;
    default:
      throw new Error(`Unsupported network type: ${networkType}`);
  }
}