import { useState, useEffect } from 'react';
import { detectWallets, isWalletAvailable } from '../services/wallet/detection';
import type { NetworkType } from '../config/networks';

export function useWalletDetection() {
  const [availableWallets, setAvailableWallets] = useState(detectWallets());

  useEffect(() => {
    // Update wallet availability when window object is ready
    if (typeof window !== 'undefined') {
      setAvailableWallets(detectWallets());
    }

    // Check for wallet injections
    const checkWallets = setInterval(() => {
      setAvailableWallets(detectWallets());
    }, 1000);

    return () => clearInterval(checkWallets);
  }, []);

  const checkWalletAvailability = (type: NetworkType) => {
    return isWalletAvailable(type);
  };

  return {
    availableWallets,
    checkWalletAvailability
  };
}