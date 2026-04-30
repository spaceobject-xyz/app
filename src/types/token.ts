import type { Chain } from "./chain";

export const tokenType = ["spl", "token2022", "erc20"] as const;
export type TokenType = (typeof tokenType)[number];

export const chainTokenType = {
  bip122: [],
  eip155: ["erc20"],
  solana: ["token"],
} as const;

export type ChainTokenType<TNamespace extends keyof typeof chainTokenType> =
  | (typeof chainTokenType)[TNamespace][number]
  | "slip44";

export type Token<TChain extends Chain = Chain> =
  TChain extends `${infer TNamespace}:${string}`
    ? TNamespace extends keyof typeof chainTokenType
      ? `${TChain}/${ChainTokenType<TNamespace>}:${string}`
      : never
    : never;

export type TokenInfo<TChain extends Chain> = {
  id: Token<TChain>;
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  chainId: Token<TChain> extends `${infer Chain}/${string}` ? Chain : never;
};

export type SelectedToken<TToken extends Token> = {
  token?: TToken | null;
  amount?: number | null;
  balance?: number | null;
};
