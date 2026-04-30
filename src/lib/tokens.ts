import { svgs } from "@web3icons/core";

import type {
  AvailableChain,
  AvailableMainnetChain,
  AvailableTestnetChain,
} from "@/config/chains";
import type {
  AvailableMainnetToken,
  AvailableTestnetToken,
} from "@/config/tokens";
import type { Network } from "@/types/network";
import type { Token, TokenInfo } from "@/types/token";
import {
  availableMainnetTokens,
  availableTestnetTokens,
} from "@/config/tokens";

export const getToken = (
  id: Token<AvailableChain>,
  network: Network = "mainnet"
): TokenInfo<AvailableChain> | null => {
  const [chainId] = id.split("/") as [
    AvailableMainnetChain | AvailableTestnetChain,
  ];
  if (!chainId) return null;

  if (network === "mainnet") {
    const resolvedToken = availableMainnetTokens[id as AvailableMainnetToken];

    return resolvedToken
      ? {
          ...resolvedToken,
          id,
          chainId,
        }
      : null;
  }

  const resolvedToken = availableTestnetTokens[id as AvailableTestnetToken];

  return resolvedToken
    ? {
        ...resolvedToken,
        id,
        chainId,
      }
    : null;
};

export const getTokenIconSrc = (symbol: string): string | null => {
  const key = symbol.toLowerCase() as keyof typeof svgs.tokens.branded;
  const svg = svgs.tokens.branded[key]?.default;
  if (!svg) return null;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
