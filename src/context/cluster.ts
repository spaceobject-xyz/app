import * as React from "react";

import type { Cluster } from "@/types/cluster";

type ClusterContextValue = {
  cluster: Cluster;
  setCluster: (cluster: Cluster) => void;
};

export const ClusterContext = React.createContext<
  ClusterContextValue | undefined
>(undefined);

const STORAGE_KEY = "__spaceobject_cluster";
const DEFAULT_CLUSTER: Cluster = "mainnet";

function isCluster(value: string | null): value is Cluster {
  return value === "mainnet" || value === "testnet";
}

export type ClusterProviderProps = React.PropsWithChildren<{
  cluster?: Cluster;
}>;

export function ClusterProvider({
  children,
  cluster: defaultCluster = DEFAULT_CLUSTER,
}: ClusterProviderProps) {
  const [cluster, setClusterState] = React.useState<Cluster>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isCluster(stored) ? stored : defaultCluster;
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
