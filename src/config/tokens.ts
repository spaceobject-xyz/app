import type { Token, TokenInfo } from "@/types/token";
import { typedEntries } from "@/lib/objects";

import type {
  AvailableMainnetNetwork,
  AvailableNetwork,
  AvailableTestnetNetwork,
} from "./networks";

type TokenInfoMapByNetwork<TNetwork extends AvailableNetwork> = {
  [NetworkKey in TNetwork]: TokenInfo<TNetwork>[];
};

export const defineTokens = <
  TNetwork extends AvailableNetwork,
  const TTokens extends {
    [TokenKey in keyof TTokens]: TokenKey extends Token<TNetwork>
      ? TokenInfo<TNetwork, TokenKey>
      : `Invalid token id: "${TokenKey & string}"`;
  },
>(
  tokens: TTokens
) => tokens;

export const availableMainnetTokens = defineTokens({
  "bip122:000000000019d6689c085ae165831e93/slip44:0": {
    id: "bip122:000000000019d6689c085ae165831e93/slip44:0",
    name: "Bitcoin",
    symbol: "BTC",
    address: null,
    decimals: 8,
    imageUrl: "https://assets.spaceobject.xyz/logos/tokens/bitcoin.svg",
    networkId: "bip122:000000000019d6689c085ae165831e93",
    networkBadge: false,
  },
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/slip44:501": {
    id: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/slip44:501",
    name: "Solana",
    symbol: "SOL",
    address: null,
    decimals: 9,
    imageUrl: "https://assets.spaceobject.xyz/logos/tokens/solana.svg",
    networkId: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    networkBadge: false,
  },
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/token:EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v":
    {
      id: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/token:EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      name: "USDC",
      symbol: "USDC",
      address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      decimals: 6,
      imageUrl: "https://assets.spaceobject.xyz/logos/tokens/usdc.svg",
      networkId: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
      networkBadge: true,
    },
  "eip155:1/slip44:60": {
    id: "eip155:1/slip44:60",
    name: "Ethereum",
    symbol: "ETH",
    address: null,
    decimals: 18,
    imageUrl: "https://assets.spaceobject.xyz/logos/tokens/ethereum.svg",
    networkId: "eip155:1",
    networkBadge: false,
  },
  "eip155:1/erc20:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {
    id: "eip155:1/erc20:0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    name: "USD Coin",
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6,
    imageUrl: "https://assets.spaceobject.xyz/logos/tokens/usdc.svg",
    networkId: "eip155:1",
    networkBadge: true,
  },
  "eip155:8453/slip44:60": {
    id: "eip155:8453/slip44:60",
    name: "Ethereum",
    symbol: "ETH",
    address: null,
    decimals: 18,
    imageUrl: "https://assets.spaceobject.xyz/logos/tokens/ethereum.svg",
    networkId: "eip155:8453",
    networkBadge: true,
  },
  "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913": {
    id: "eip155:8453/erc20:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    name: "USD Coin",
    symbol: "USDC",
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    decimals: 6,
    imageUrl: "https://assets.spaceobject.xyz/logos/tokens/usdc.svg",
    networkId: "eip155:8453",
    networkBadge: true,
  },
});
export const availableTestnetTokens = defineTokens({
  "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1/slip44:501": {
    id: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1/slip44:501",
    name: "Solana",
    symbol: "SOL",
    address: null,
    decimals: 9,
    imageUrl: "https://assets.spaceobject.xyz/logos/tokens/solana.svg",
    networkId: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
    networkBadge: false,
  },
  "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1/token:4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU":
    {
      id: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1/token:4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
      name: "USDC",
      symbol: "USDC",
      address: "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
      decimals: 6,
      imageUrl: "https://assets.spaceobject.xyz/logos/tokens/usdc.svg",
      networkId: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
      networkBadge: true,
    },
  "eip155:11155111/slip44:60": {
    id: "eip155:11155111/slip44:60",
    name: "Ethereum",
    symbol: "ETH",
    address: null,
    decimals: 18,
    imageUrl: "https://assets.spaceobject.xyz/logos/tokens/ethereum.svg",
    networkId: "eip155:11155111",
    networkBadge: false,
  },
});

export type AvailableMainnetToken = keyof typeof availableMainnetTokens;
export type AvailableTestnetToken = keyof typeof availableTestnetTokens;

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

export type AvailableToken = AvailableMainnetToken | AvailableTestnetToken;
