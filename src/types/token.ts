import type { Network } from "./network";

export const tokenType = ["spl", "token2022", "erc20"] as const;
export type TokenType = (typeof tokenType)[number];

export const networkTokenType = {
  bip122: [],
  eip155: ["erc20"],
  solana: ["token"],
} as const;

export type NetworkTokenType<TNamespace extends keyof typeof networkTokenType> =
  | (typeof networkTokenType)[TNamespace][number]
  | "slip44";

export type Token<TNetwork extends Network = Network> =
  TNetwork extends `${infer TNamespace}:${string}`
    ? TNamespace extends keyof typeof networkTokenType
      ? `${TNetwork}/${NetworkTokenType<TNamespace>}:${string}`
      : never
    : never;

export type TokenInfo<
  TNetwork extends Network,
  TToken extends Token<TNetwork> = Token<TNetwork>,
> = {
  id: TToken;
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  networkId: TToken extends `${infer NetworkId}/${string}` ? NetworkId : never;
};

export type SelectedToken<TToken extends Token> = {
  token?: TToken | null;
  amount?: number | null;
  balance?: number | null;
};
