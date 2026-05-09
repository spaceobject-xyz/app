import * as React from "react";

import type { Cluster } from "@/types/cluster";

type ClusterContextValue = {
  cluster: Cluster;
  setCluster: (cluster: Cluster) => void;
};

export const ClusterContext = React.createContext<
  ClusterContextValue | undefined
>(undefined);

const STORAGE_KEY = "cluster";
const DEFAULT_NETWORK: Cluster = "mainnet";

function isCluster(value: string | null): value is Cluster {
  return value === "mainnet" || value === "testnet";
}

export function ClusterProvider({ children }: { children: React.ReactNode }) {
  const [cluster, setClusterState] = React.useState<Cluster>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isCluster(stored) ? stored : DEFAULT_NETWORK;
  });

  const setCluster = React.useCallback((next: Cluster) => {
    localStorage.setItem(STORAGE_KEY, next);
    setClusterState(next);
  }, []);

  const value = React.useMemo(
    () => ({ cluster, setCluster }),
    [cluster, setCluster]
  );

  return React.createElement(ClusterContext.Provider, { value }, children);
}
