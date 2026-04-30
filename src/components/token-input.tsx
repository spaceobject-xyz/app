import { DashboardCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useMemo, useState } from "react";

import type {
  AvailableChain,
  AvailableMainnetChain,
  AvailableTestnetChain,
} from "@/config/chains";
import type { AvailableToken } from "@/config/tokens";
import type { SelectedToken } from "@/types/token";
import {
  availableMainnetChains,
  availableTestnetChains,
} from "@/config/chains";
import {
  availableMainnetTokenByChains,
  availableTestnetTokenByChains,
} from "@/config/tokens";
import { useNetwork } from "@/hooks/use-network";
import { getChain, getChainIconSrc } from "@/lib/chains";
import { typedValues } from "@/lib/objects";
import { getToken, getTokenIconSrc } from "@/lib/tokens";

import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { InputGroup, InputGroupAddon } from "./ui/input-group";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { InputGroupNumberInput } from "./ui/number-input";
import { Separator } from "./ui/separator";

export interface TokenInputProps {
  title: string;
  selectedToken: SelectedToken<AvailableToken> | null;
  onSelectedToken: (
    selectedToken: SelectedToken<AvailableToken> | null
  ) => void;
}

export const TokenInput: React.FC<TokenInputProps> = ({
  title,
  selectedToken,
  onSelectedToken,
}) => {
  const tokenInfo = useMemo(
    () => (selectedToken?.token ? getToken(selectedToken?.token) : null),
    [selectedToken]
  );
  const chainInfo = useMemo(
    () => (tokenInfo ? getChain(tokenInfo.chainId) : null),
    [tokenInfo]
  );
  const balance = selectedToken?.balance;

  const [tokenSelectorDialogOpen, setTokenSelectorDialogOpen] =
    useState<boolean>(false);

  return (
    <InputGroup className="group">
      <InputGroupAddon align="block-start">{title}</InputGroupAddon>
      <div className="flex w-full justify-between items-center gap-2">
        <InputGroupNumberInput
          autoComplete="off"
          formatted
          placeholder="0"
          className="text-4xl md:text-4xl font-mono"
          onChange={(amount) => {
            onSelectedToken({
              ...selectedToken,
              amount,
            });
          }}
          value={selectedToken?.amount}
        />
        <InputGroupAddon align="inline-end">
          <Button
            variant="outline"
            size="xl"
            className="pl-2"
            onClick={() => setTokenSelectorDialogOpen(true)}
          >
            <Avatar size="lg">
              <AvatarImage
                src={
                  getTokenIconSrc(tokenInfo?.symbol ?? "invalid") ?? undefined
                }
              />
              <AvatarFallback>{tokenInfo?.name.at(0) ?? "?"}</AvatarFallback>
              {chainInfo && (
                <AvatarBadge className="bg-background text-foreground ring-1 ring-muted">
                  <img
                    src={getChainIconSrc(chainInfo.slug) ?? undefined}
                    alt={chainInfo.slug}
                  />
                </AvatarBadge>
              )}
            </Avatar>
            {tokenInfo?.symbol ?? "Select token"}
          </Button>
          <TokenSelectorDialog
            open={tokenSelectorDialogOpen}
            onOpenChange={setTokenSelectorDialogOpen}
            token={selectedToken?.token}
            onTokenSelect={(token) => {
              onSelectedToken({
                ...selectedToken,
                token,
              });
            }}
          ></TokenSelectorDialog>
        </InputGroupAddon>
      </div>
      <InputGroupAddon align="block-end" className="justify-end">
        {tokenInfo && balance && (
          <div className="grid grid-cols-4 gap-1">
            <Badge
              variant="outline"
              className="opacity-0 group-hover:opacity-100 transition-opacity delay-130"
              render={
                <Button
                  variant="outline"
                  onClick={() => {
                    onSelectedToken({
                      ...selectedToken,
                      amount: balance * 0.25,
                    });
                  }}
                >
                  25%
                </Button>
              }
            ></Badge>
            <Badge
              variant="outline"
              className="opacity-0 group-hover:opacity-100 transition-opacity delay-120"
              render={
                <Button
                  variant="outline"
                  onClick={() => {
                    onSelectedToken({
                      ...selectedToken,
                      amount: balance * 0.5,
                    });
                  }}
                >
                  50%
                </Button>
              }
            ></Badge>
            <Badge
              variant="outline"
              className="opacity-0 group-hover:opacity-100 transition-opacity delay-110"
              render={
                <Button
                  variant="outline"
                  onClick={() => {
                    onSelectedToken({
                      ...selectedToken,
                      amount: balance * 0.75,
                    });
                  }}
                >
                  75%
                </Button>
              }
            ></Badge>
            <Badge
              variant="outline"
              className="opacity-0 group-hover:opacity-100 transition-opacity delay-100"
              render={
                <Button
                  variant="outline"
                  onClick={() => {
                    onSelectedToken({
                      ...selectedToken,
                      amount: balance,
                    });
                  }}
                >
                  Max
                </Button>
              }
            ></Badge>
          </div>
        )}
        {tokenInfo && (
          <Badge
            variant="ghost"
            render={
              <Button
                variant="ghost"
                tabIndex={-1}
                onClick={() => {
                  onSelectedToken({
                    ...selectedToken,
                    amount: balance ?? 0,
                  });
                }}
              >
                {balance ?? 0} {tokenInfo.symbol}
              </Button>
            }
          ></Badge>
        )}
      </InputGroupAddon>
    </InputGroup>
  );
};

export interface TokenSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token?: AvailableToken | null;
  onTokenSelect: (token: AvailableToken | null) => void;
}

export const TokenSelectorDialog: React.FC<TokenSelectorDialogProps> = ({
  open,
  onOpenChange,
  token,
  onTokenSelect,
}) => {
  const { network } = useNetwork();
  const [chainFilter, setChainFilter] = useState(() => {
    if (!token) return null;
    const [chainId] = token.split("/");

    return getChain(chainId as AvailableChain);
  });
  const chains = useMemo(
    () =>
      network === "mainnet"
        ? typedValues(availableMainnetChains)
        : typedValues(availableTestnetChains),
    [network]
  );
  const tokens = useMemo(
    () =>
      chainFilter
        ? network === "mainnet"
          ? availableMainnetTokenByChains[
              chainFilter.id as AvailableMainnetChain
            ]
          : availableTestnetTokenByChains[
              chainFilter.id as AvailableTestnetChain
            ]
        : network === "mainnet"
          ? typedValues(availableMainnetTokenByChains).flat()
          : typedValues(availableTestnetTokenByChains).flat(),
    [network, chainFilter]
  );

  useEffect(() => {
    if (!open) return;
    if (!token) return setChainFilter(null);

    const [chainId] = token.split("/");
    setChainFilter(getChain(chainId as AvailableChain));
  }, [open, token]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="overflow-scroll">
          <DialogTitle>Select Token</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 overflow-hidden w-full">
          <div className="flex items-center gap-2 overflow-x-auto shrink-0">
            <Item
              variant={chainFilter === null ? "muted" : "outline"}
              className="flex shrink-0 w-30 items-center justify-center gap-2"
              onClick={() => setChainFilter(null)}
              render={
                <button type="button" className="hover:bg-secondary/30">
                  <ItemHeader className="items-center justify-center">
                    <Avatar className="size-12">
                      <AvatarFallback>
                        <HugeiconsIcon
                          icon={DashboardCircleIcon}
                          className="text-purple-400"
                        />
                      </AvatarFallback>
                    </Avatar>
                  </ItemHeader>
                  <ItemContent className="items-center justify-center">
                    <ItemTitle>All chains</ItemTitle>
                  </ItemContent>
                </button>
              }
            />
            {chains.map((chain) => (
              <Item
                key={chain.id}
                variant={chainFilter?.id === chain.id ? "muted" : "outline"}
                className="flex shrink-0 w-30 items-center justify-center gap-2"
                onClick={() => setChainFilter(chain)}
                render={
                  <button type="button" className="hover:bg-secondary/30">
                    <ItemHeader className="items-center justify-center">
                      <Avatar className="size-12">
                        <AvatarImage
                          src={getChainIconSrc(chain.slug) ?? undefined}
                        />
                        <AvatarFallback>{chain.name.at(0)}</AvatarFallback>
                      </Avatar>
                    </ItemHeader>
                    <ItemContent className="items-center justify-center">
                      <ItemTitle>{chain.name}</ItemTitle>
                    </ItemContent>
                  </button>
                }
              />
            ))}
          </div>

          <Separator />

          <div className="flex flex-col w-full items-center gap-2 h-96 overflow-y-auto">
            {tokens.map(({ id, name, symbol, chainId }) => {
              const chainInfo = getChain(chainId);

              return (
                <Item
                  key={id}
                  variant={id === token ? "muted" : "outline"}
                  onClick={() => {
                    onTokenSelect(id as AvailableToken);
                    onOpenChange(false);
                  }}
                  render={
                    <button type="button">
                      <ItemMedia>
                        <Avatar size="lg">
                          <AvatarImage
                            src={getTokenIconSrc(symbol) ?? undefined}
                          />
                          <AvatarFallback>{name.at(0) ?? "?"}</AvatarFallback>
                          {chainInfo && (
                            <AvatarBadge className="bg-background text-foreground ring-1 ring-muted">
                              <img
                                src={
                                  getChainIconSrc(chainInfo.slug) ?? undefined
                                }
                                alt={chainInfo.slug}
                              />
                            </AvatarBadge>
                          )}
                        </Avatar>
                      </ItemMedia>
                      <ItemContent>
                        <ItemTitle>{symbol}</ItemTitle>
                        <ItemDescription>{name}</ItemDescription>
                      </ItemContent>
                    </button>
                  }
                />
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
