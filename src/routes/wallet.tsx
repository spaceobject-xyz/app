import { ChevronRight, Copy01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useConnector } from "@solana/connector/react";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import type { AvailableNetwork } from "@/config/networks";
import type { Token } from "@/types/token";
import { DepositDialog } from "@/components/deposit";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import {
  availableMainnetTokenByNetworks,
  availableTestnetTokenByNetworks,
} from "@/config/tokens";
import { useCluster } from "@/hooks/use-cluster";
import { trimAddress } from "@/lib/address";
import { getNetwork } from "@/lib/networks";
import { typedValues } from "@/lib/objects";

export const Route = createFileRoute("/wallet")({
  component: Wallet,
});

function Wallet() {
  const { account, isConnected } = useConnector();
  const { cluster } = useCluster();

  const tokens = useMemo(
    () =>
      cluster === "mainnet"
        ? typedValues(availableMainnetTokenByNetworks).flat()
        : typedValues(availableTestnetTokenByNetworks).flat(),
    [cluster]
  );

  const [depositDialogOpen, setDepositDialogOpen] = useState(false);
  const [depositToken, setDepositToken] =
    useState<Token<AvailableNetwork> | null>(null);

  return (
    <div className="w-full flex flex-col mx-auto items-center gap-4 md:pt-36">
      <div className="w-full md:max-w-xl flex flex-col gap-4">
        <div className="flex flex-col w-full gap-4">
          <h1 className="text-4xl font-bold font-mono">Wallet</h1>
          {isConnected && account && (
            <div className="flex gap-2 group items-center">
              <p className="hidden sm:inline line-clamp-1">
                Account: <span className="font-mono font-bold">{account}</span>
              </p>
              <p className="inline sm:hidden line-clamp-1">
                Account:{" "}
                <span className="font-mono font-bold">
                  {trimAddress(account)}
                </span>
              </p>
              <Button
                variant="ghost"
                size="icon-sm"
                className="sm:opacity-0 sm:group-hover:opacity-100"
              >
                <HugeiconsIcon icon={Copy01Icon} />
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full gap-4">
          <Separator />
          <p className="text-lg font-bold font-mono">Assets</p>
          <div className="flex flex-col w-full items-center gap-2 max-h-140 overflow-y-auto">
            {tokens.map(
              ({ id, name, symbol, networkId, networkBadge, imageUrl }) => {
                const networkInfo = getNetwork(networkId, cluster);

                return (
                  <Item key={id} variant="outline" className="bg-muted/40">
                    <ItemMedia>
                      <Avatar size="lg">
                        <AvatarImage src={imageUrl} />
                        <AvatarFallback>{name.at(0) ?? "?"}</AvatarFallback>
                        {networkInfo && networkBadge && (
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
                    <ItemActions>
                      <span className="font-bold font-mono">
                        {Math.random().toFixed(2)} {symbol}
                      </span>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon">
                            <HugeiconsIcon icon={ChevronRight} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setDepositToken(id);
                              setDepositDialogOpen(true);
                            }}
                          >
                            Deposit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              // setWithdrawalToken(id);
                              // setWithdrawalDialogOpen(true);
                            }}
                          >
                            Withdrawal
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </ItemActions>
                  </Item>
                );
              }
            )}
          </div>
        </div>
      </div>
      <DepositDialog
        open={depositDialogOpen}
        onOpenChange={setDepositDialogOpen}
        token={
          depositToken ?? "bip122:000000000019d6689c085ae165831e93/slip44:0"
        }
      />
    </div>
  );
}
