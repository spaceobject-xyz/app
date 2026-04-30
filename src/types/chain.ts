export const mainnetChains = [
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  "eip155:1",
  "eip155:137",
  "eip155:56",
  "eip155:43114",
  "eip155:42161",
  "eip155:10",
  "eip155:8453",
  "bip122:000000000019d6689c085ae165831e93",
] as const;
export type MainnetChain = (typeof mainnetChains)[number];

export const testnetChains = [
  "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
  "eip155:11155111",
  "eip155:80002",
  "eip155:97",
  "eip155:43113",
  "eip155:421614",
  "eip155:11155420",
  "eip155:84532",
  "bip122:000000000933ea01ad0ee984209779ba",
] as const;
export type TestnetChain = (typeof testnetChains)[number];

export const networks = [...mainnetChains, ...testnetChains];
export type Chain = (typeof networks)[number];

export type ChainInfo<TChain extends Chain> = {
  id: TChain;
  name: string;
  slug: string;
};
