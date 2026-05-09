import type {
  MainnetNetwork,
  Network,
  NetworkInfo,
  TestnetNetwork,
} from "@/types/network";

type NetworkInfoMap<TNetwork extends Network> = {
  [NetworkKey in TNetwork]?: NetworkInfo<NetworkKey>;
};

export const availableMainnetNetworks = {
  "bip122:000000000019d6689c085ae165831e93": {
    id: "bip122:000000000019d6689c085ae165831e93",
    name: "Bitcoin",
    imageUrl: "https://assets.spaceobject.xyz/logos/networks/bitcoin.svg",
  },
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp": {
    id: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    name: "Solana",
    imageUrl: "https://assets.spaceobject.xyz/logos/networks/solana.svg",
  },
  "eip155:1": {
    id: "eip155:1",
    name: "Ethereum",
    imageUrl: "https://assets.spaceobject.xyz/logos/networks/ethereum.svg",
  },
  "eip155:8453": {
    id: "eip155:8453",
    name: "Base",
    imageUrl: "https://assets.spaceobject.xyz/logos/networks/base.svg",
  },
} as const satisfies NetworkInfoMap<MainnetNetwork>;
export type AvailableMainnetNetwork = keyof typeof availableMainnetNetworks;

export const availableTestnetNetworks = {
  "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1": {
    id: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
    name: "Solana Devnet",
    imageUrl: "https://assets.spaceobject.xyz/logos/networks/solana.svg",
  },
  "eip155:11155111": {
    id: "eip155:11155111",
    name: "Ethereum Sepolia",
    imageUrl: "https://assets.spaceobject.xyz/logos/networks/ethereum.svg",
  },
} as const satisfies NetworkInfoMap<TestnetNetwork>;
export type AvailableTestnetNetwork = keyof typeof availableTestnetNetworks;

export type AvailableNetwork =
  | AvailableMainnetNetwork
  | AvailableTestnetNetwork;
