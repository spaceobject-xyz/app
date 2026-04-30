import { svgs } from "@web3icons/core";

import type {
  AvailableChain,
  AvailableMainnetChain,
  AvailableTestnetChain,
} from "@/config/chains";
import type { ChainInfo } from "@/types/chain";
import type { Network } from "@/types/network";
import {
  availableMainnetChains,
  availableTestnetChains,
} from "@/config/chains";

export const getChain = <TChain extends AvailableChain>(
  id: TChain,
  network: Network = "mainnet"
): ChainInfo<TChain> | null => {
  if (network === "mainnet") {
    const resolvedChain = availableMainnetChains[id as AvailableMainnetChain];

    return resolvedChain
      ? {
          ...resolvedChain,
          id,
        }
      : null;
  }

  const resolvedChain = availableTestnetChains[id as AvailableTestnetChain];

  return resolvedChain
    ? {
        ...resolvedChain,
        id,
      }
    : null;
};

export const getChainIconSrc = (slug: string): string | null => {
  const key = slug.toLowerCase() as keyof typeof svgs.networks.branded;
  const svg = svgs.networks.branded[key]?.default;
  if (!svg) return null;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};
