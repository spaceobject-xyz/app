import { DashboardCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useMemo, useRef, useState } from "react";

import type {
  AvailableMainnetNetwork,
  AvailableNetwork,
  AvailableTestnetNetwork,
} from "@/config/networks";
import type { AvailableToken } from "@/config/tokens";
import type { SelectedToken } from "@/types/token";
import {
  availableMainnetNetworks,
  availableTestnetNetworks,
} from "@/config/networks";
import {
  availableMainnetTokenByNetworks,
  availableTestnetTokenByNetworks,
} from "@/config/tokens";
import { useCluster } from "@/hooks/use-cluster";
import { getNetwork } from "@/lib/networks";
import { typedValues } from "@/lib/objects";
import { getToken } from "@/lib/tokens";

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
  readOnly?: boolean;
}

export const TokenInput: React.FC<TokenInputProps> = ({
  title,
  selectedToken,
  onSelectedToken,
  readOnly,
}) => {
  const tokenInfo = useMemo(
    () => (selectedToken?.token ? getToken(selectedToken?.token) : null),
    [selectedToken]
  );
  const networkInfo = useMemo(
    () => (tokenInfo ? getNetwork(tokenInfo.networkId) : null),
    [tokenInfo]
  );
  const balance = selectedToken?.balance;

  const [tokenSelectorDialogOpen, setTokenSelectorDialogOpen] =
    useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <InputGroup className="group">
      <InputGroupAddon align="block-start">{title}</InputGroupAddon>
      <div className="flex w-full justify-between items-center gap-2">
        <InputGroupNumberInput
          ref={inputRef}
          readOnly={readOnly}
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
              <AvatarImage src={tokenInfo?.imageUrl} />
              <AvatarFallback>{tokenInfo?.name.at(0) ?? "?"}</AvatarFallback>
              {networkInfo && (
                <AvatarBadge>
                  <img src={networkInfo.imageUrl} alt={networkInfo.id} />
                </AvatarBadge>
              )}
            </Avatar>
            {tokenInfo?.symbol ?? "Select token"}
          </Button>
          <TokenSelectorDialog
            open={tokenSelectorDialogOpen}
            onOpenChange={(open) => {
              setTokenSelectorDialogOpen(open);
              if (!open && !readOnly) inputRef.current?.focus();
            }}
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
        {tokenInfo ? (
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
        ) : (
          <div className="h-5"></div>
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
  const { cluster } = useCluster();
  const [networkFilter, setNetworkFilter] = useState(() => {
    if (!token) return null;
    const [networkId] = token.split("/");

    return getNetwork(networkId as AvailableNetwork);
  });
  const networks = useMemo(
    () =>
      cluster === "mainnet"
        ? typedValues(availableMainnetNetworks)
        : typedValues(availableTestnetNetworks),
    [cluster]
  );
  const tokens = useMemo(
    () =>
      networkFilter
        ? cluster === "mainnet"
          ? availableMainnetTokenByNetworks[
              networkFilter.id as AvailableMainnetNetwork
            ]
          : availableTestnetTokenByNetworks[
              networkFilter.id as AvailableTestnetNetwork
            ]
        : cluster === "mainnet"
          ? typedValues(availableMainnetTokenByNetworks).flat()
          : typedValues(availableTestnetTokenByNetworks).flat(),
    [cluster, networkFilter]
  );

  useEffect(() => {
    if (!open) return;
    if (!token) return setNetworkFilter(null);

    const [networkId] = token.split("/");
    setNetworkFilter(getNetwork(networkId as AvailableNetwork));
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
              variant={networkFilter === null ? "muted" : "outline"}
              className="flex shrink-0 w-30 items-center justify-center gap-2"
              onClick={() => setNetworkFilter(null)}
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
                    <ItemTitle>All networks</ItemTitle>
                  </ItemContent>
                </button>
              }
            />
            {networks.map((network) => (
              <Item
                key={network.id}
                variant={networkFilter?.id === network.id ? "muted" : "outline"}
                className="flex shrink-0 w-30 items-center justify-center gap-2"
                onClick={() => setNetworkFilter(network)}
                render={
                  <button type="button" className="hover:bg-secondary/30">
                    <ItemHeader className="items-center justify-center">
                      <Avatar className="size-12">
                        <AvatarImage src={network.imageUrl} />
                        <AvatarFallback>{network.name.at(0)}</AvatarFallback>
                      </Avatar>
                    </ItemHeader>
                    <ItemContent className="items-center justify-center">
                      <ItemTitle>{network.name}</ItemTitle>
                    </ItemContent>
                  </button>
                }
              />
            ))}
          </div>

          <Separator />

          <div className="flex flex-col w-full items-center gap-2 h-96 overflow-y-auto">
            {tokens.map(({ id, name, symbol, networkId, imageUrl }) => {
              const networkInfo = getNetwork(networkId);

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
                          <AvatarImage src={imageUrl} />
                          <AvatarFallback>{name.at(0) ?? "?"}</AvatarFallback>
                          {networkInfo && (
                            <AvatarBadge>
                              <img
                                src={networkInfo.imageUrl}
                                alt={networkInfo.id}
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
