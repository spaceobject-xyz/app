import type { Token, TokenInfo } from "@/types/token";
import { typedEntries } from "@/lib/objects";

import type {
  AvailableMainnetNetwork,
  AvailableNetwork,
  AvailableTestnetNetwork,
} from "./networks";

type TokenInfoMap<TNetwork extends AvailableNetwork> = {
  [TokenKey in Token<TNetwork>]: TokenInfo<TNetwork, TokenKey>;
};

type TokenInfoMapByNetwork<TNetwork extends AvailableNetwork> = {
  [NetworkKey in TNetwork]: TokenInfo<TNetwork>[];
};

export const availableMainnetTokens = {
  // "bip122:000000000019d6689c085ae165831e93/slip44:0": {
  //   id: "bip122:000000000019d6689c085ae165831e93/slip44:0",
  //   name: "Bitcoin",
  //   symbol: "BTC",
  //   address: "",
  //   decimals: 8,
  //   networkId: "bip122:000000000019d6689c085ae165831e93",
  // },
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/slip44:501": {
    id: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/slip44:501",
    name: "Solana",
    symbol: "SOL",
    address: "",
    decimals: 9,
    networkId: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  },
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/token:EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v":
    {
      id: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/token:EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      name: "USDC",
      symbol: "USDC",
      address: "",
      decimals: 6,
      networkId: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    },
  "eip155:1/slip44:60": {
    id: "eip155:1/slip44:60",
    name: "Ethereum",
    symbol: "ETH",
    address: "",
    decimals: 18,
    networkId: "eip155:1",
  },
  "eip155:1/erc20:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {
    id: "eip155:1/erc20:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    name: "USD Coin",
    symbol: "USDC",
    address: "",
    decimals: 6,
    networkId: "eip155:1",
  },
  "eip155:8453/slip44:60": {
    id: "eip155:8453/slip44:60",
    name: "Ethereum",
    symbol: "ETH",
    address: "",
    decimals: 18,
    networkId: "eip155:8453",
  },
  "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913": {
    id: "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    name: "USD Coin",
    symbol: "USDC",
    address: "",
    decimals: 6,
    networkId: "eip155:8453",
  },
} as const satisfies TokenInfoMap<AvailableMainnetNetwork>;

export type AvailableMainnetToken = keyof typeof availableMainnetTokens;

export const availableMainnetTokenByNetworks = typedEntries(
  availableMainnetTokens
).reduce<TokenInfoMapByNetwork<AvailableMainnetNetwork>>(
  (acc, [, { networkId, ...rest }]) => {
    acc[networkId] ??= [];
    acc[networkId].push({ networkId, ...rest });
    return acc;
  },
  {} as TokenInfoMapByNetwork<AvailableMainnetNetwork>
);

export const availableTestnetTokens = {
  "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1/slip44:501": {
    id: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1/slip44:501",
    name: "Solana",
    symbol: "SOL",
    address: "",
    decimals: 9,
    networkId: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  },
  "eip155:11155111/slip44:60": {
    id: "eip155:11155111/slip44:60",
    name: "Ethereum",
    symbol: "ETH",
    address: "",
    decimals: 18,
    networkId: "eip155:11155111",
  },
} as const satisfies TokenInfoMap<AvailableTestnetNetwork>;

export type AvailableTestnetToken = keyof typeof availableTestnetTokens;

export type AvailableToken = AvailableMainnetToken | AvailableTestnetToken;

export const availableTestnetTokenByNetworks = typedEntries(
  availableTestnetTokens
).reduce<TokenInfoMapByNetwork<AvailableTestnetNetwork>>(
  (acc, [, { networkId, ...rest }]) => {
    acc[networkId] ??= [];
    acc[networkId].push({ networkId, ...rest });
    return acc;
  },
  {} as TokenInfoMapByNetwork<AvailableTestnetNetwork>
);
