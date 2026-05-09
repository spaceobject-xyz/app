export const mainnetNetworks = [
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
export type MainnetNetwork = (typeof mainnetNetworks)[number];

export const testnetNetworks = [
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
export type TestnetNetwork = (typeof testnetNetworks)[number];

export const networks = [...mainnetNetworks, ...testnetNetworks];
export type Network = (typeof networks)[number];

export type NetworkInfo<TNetwork extends Network> = {
  id: TNetwork;
  name: string;
  slug: string;
};
