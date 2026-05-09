import type {
  AvailableMainnetNetwork,
  AvailableNetwork,
  AvailableTestnetNetwork,
} from "@/config/networks";
import type { Cluster } from "@/types/cluster";
import type { NetworkInfo } from "@/types/network";
import {
  availableMainnetNetworks,
  availableTestnetNetworks,
} from "@/config/networks";

export const getNetwork = <TNetwork extends AvailableNetwork>(
  id: TNetwork,
  cluster: Cluster = "mainnet"
): NetworkInfo<TNetwork> | null => {
  if (cluster === "mainnet") {
    const resolvedNetwork =
      availableMainnetNetworks[id as AvailableMainnetNetwork];

    return resolvedNetwork
      ? {
          ...resolvedNetwork,
          id,
        }
      : null;
  }

  const resolvedNetwork =
    availableTestnetNetworks[id as AvailableTestnetNetwork];

  return resolvedNetwork
    ? {
        ...resolvedNetwork,
        id,
      }
    : null;
};
