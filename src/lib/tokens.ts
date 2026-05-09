import type {
  AvailableMainnetNetwork,
  AvailableNetwork,
  AvailableTestnetNetwork,
} from "@/config/networks";
import type {
  AvailableMainnetToken,
  AvailableTestnetToken,
  AvailableToken,
} from "@/config/tokens";
import type { Cluster } from "@/types/cluster";
import type { Token, TokenInfo } from "@/types/token";
import {
  availableMainnetTokens,
  availableTestnetTokens,
} from "@/config/tokens";

export const isToken = (
  value: unknown,
  cluster: Cluster = "mainnet"
): value is AvailableToken =>
  typeof value === "string" &&
  (cluster === "mainnet"
    ? value in availableMainnetTokens
    : value in availableTestnetTokens);

export const getToken = (
  id: Token<AvailableNetwork>,
  cluster: Cluster = "mainnet"
): TokenInfo<AvailableNetwork> | null => {
  const [networkId] = id.split("/") as [
    AvailableMainnetNetwork | AvailableTestnetNetwork,
  ];
  if (!networkId) return null;

  if (cluster === "mainnet") {
    const resolvedToken = availableMainnetTokens[id as AvailableMainnetToken];

    return resolvedToken
      ? {
          ...resolvedToken,
          id,
          networkId,
        }
      : null;
  }

  const resolvedToken = availableTestnetTokens[id as AvailableTestnetToken];

  return resolvedToken
    ? {
        ...resolvedToken,
        id,
        networkId,
      }
    : null;
};
