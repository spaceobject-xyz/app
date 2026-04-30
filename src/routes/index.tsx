import { ChevronDown, Settings01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import type { AvailableToken } from "@/config/tokens";
import type { SelectedToken } from "@/types/token";
import { TokenInput } from "@/components/token-input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Swap,
});

export const DEFAULT_SELL_TOKEN =
  "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp/slip44:501";
export const DEFAULT_BUY_TOKEN = "eip155:1/slip44:60";

function Swap() {
  const [selectedSellToken, setSelectedSellToken] =
    useState<SelectedToken<AvailableToken> | null>({
      token: DEFAULT_SELL_TOKEN,
    });
  const [selectedBuyToken, setSelectedBuyToken] =
    useState<SelectedToken<AvailableToken> | null>({
      token: DEFAULT_BUY_TOKEN,
    });

  return (
    <div className="w-full flex flex-col mx-auto items-center gap-4 md:pt-36">
      <div className="w-full md:max-w-xl flex flex-col items-center justify-center gap-2">
        <div className="flex w-full items-center justify-between gap-2">
          <h1 className="font-mono text-2xl">Swap</h1>
          <Button variant="ghost" size="icon">
            <HugeiconsIcon icon={Settings01Icon} />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <TokenInput
            title="Sell"
            selectedToken={selectedSellToken}
            onSelectedToken={(selectedToken) => {
              if (
                selectedToken?.token &&
                selectedToken.token === selectedBuyToken?.token
              )
                setSelectedBuyToken(selectedSellToken);

              return setSelectedSellToken(selectedToken);
            }}
          />
          <Button
            tabIndex={-1}
            variant="secondary"
            size="icon"
            className="group absolute z-10 bg-background hover:bg-background ring-1 ring-muted"
          >
            <HugeiconsIcon
              icon={ChevronDown}
              className="group-hover:rotate-180 transition-[rotate] duration-200"
            />
          </Button>
          <TokenInput
            title="Buy"
            selectedToken={selectedBuyToken}
            onSelectedToken={(selectedToken) => {
              if (
                selectedToken?.token &&
                selectedToken.token === selectedSellToken?.token
              )
                setSelectedSellToken(selectedBuyToken);

              return setSelectedBuyToken(selectedToken);
            }}
          />
        </div>
        <div className="flex w-full items-center justify-center gap-2">
          <Button className="w-full" size="lg">
            Swap
          </Button>
        </div>
      </div>
    </div>
  );
}
