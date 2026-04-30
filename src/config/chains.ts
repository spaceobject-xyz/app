import type {
  Chain,
  ChainInfo,
  MainnetChain,
  TestnetChain,
} from "@/types/chain";

type ChainInfoMap<TChain extends Chain> = {
  [ChainKey in TChain]?: ChainInfo<ChainKey>;
};

export const availableMainnetChains = {
  "bip122:000000000019d6689c085ae165831e93": {
    id: "bip122:000000000019d6689c085ae165831e93",
    name: "Bitcoin",
    slug: "bitcoin",
  },
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp": {
    id: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    name: "Solana",
    slug: "solana",
  },
  "eip155:1": {
    id: "eip155:1",
    name: "Ethereum",
    slug: "ethereum",
  },
  "eip155:8453": {
    id: "eip155:8453",
    name: "Base",
    slug: "base",
  },
} as const satisfies ChainInfoMap<MainnetChain>;
export type AvailableMainnetChain = keyof typeof availableMainnetChains;

export const availableTestnetChains = {
  "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1": {
    id: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
    name: "Solana Devnet",
    slug: "solana",
  },
  "eip155:11155111": {
    id: "eip155:11155111",
    name: "Ethereum Sepolia",
    slug: "ethereum",
  },
} as const satisfies ChainInfoMap<TestnetChain>;
export type AvailableTestnetChain = keyof typeof availableTestnetChains;

export type AvailableChain = AvailableMainnetChain | AvailableTestnetChain;
