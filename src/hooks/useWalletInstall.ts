import { useState } from 'react';
import type { NetworkType } from '../config/networks';

export function useWalletInstall() {
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [networkTypeToInstall, setNetworkTypeToInstall] = useState<NetworkType>('evm');

  const promptInstall = (networkType: NetworkType) => {
    setNetworkTypeToInstall(networkType);
    setShowInstallPrompt(true);
  };

  const closeInstallPrompt = () => {
    setShowInstallPrompt(false);
  };

  return {
    showInstallPrompt,
    networkTypeToInstall,
    promptInstall,
    closeInstallPrompt
  };
}