import * as React from "react";

import type { Network } from "@/types/network";

type NetworkContextValue = {
  network: Network;
  setNetwork: (network: Network) => void;
};

export const NetworkContext = React.createContext<
  NetworkContextValue | undefined
>(undefined);

const STORAGE_KEY = "network";
const DEFAULT_NETWORK: Network = "mainnet";

function isNetwork(value: string | null): value is Network {
  return value === "mainnet" || value === "testnet";
}

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [network, setNetworkState] = React.useState<Network>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isNetwork(stored) ? stored : DEFAULT_NETWORK;
  });

  const setNetwork = React.useCallback((next: Network) => {
    localStorage.setItem(STORAGE_KEY, next);
    setNetworkState(next);
  }, []);

  const value = React.useMemo(
    () => ({ network, setNetwork }),
    [network, setNetwork]
  );

  return React.createElement(NetworkContext.Provider, { value }, children);
}
