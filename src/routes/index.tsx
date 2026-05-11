import { ChevronDown } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useWalletAdapterCompat } from "@solana/connector/compat";
import { useConnector, useTransactionSigner } from "@solana/connector/react";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { TokenInput } from "@/components/token-input";
import { Button } from "@/components/ui/button";
import { SolanaWalletConnectDialog } from "@/components/wallet-connection/solana";
import { useCluster } from "@/hooks/use-cluster";
import { isToken } from "@/lib/tokens";

export const Route = createFileRoute("/")({
  component: Swap,
  validateSearch: (
    search: Record<string, unknown>
  ): { from?: string; to?: string } => {
    const from = typeof search.from === "string" ? search.from : undefined;
    const to = typeof search.to === "string" ? search.to : undefined;

    return {
      from,
      to: to === from ? undefined : to,
    };
  },
});

function Swap() {
  const { cluster } = useCluster();
  const { from, to } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { disconnectWallet, isConnected } = useConnector();
  const { signer } = useTransactionSigner();
  const { signMessage } = useWalletAdapterCompat(signer, disconnectWallet);

  const [sellAmount, setSellAmount] = useState<number | null>(null);
  const [buyAmount, setBuyAmount] = useState<number | null>(null);

  const [walletConnectDialogOpen, setWalletConnectDialogOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!sellAmount) return setBuyAmount(null);

      setBuyAmount(sellAmount * 0.5);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [sellAmount]);

  return (
    <div className="w-full flex flex-col mx-auto items-center gap-4 md:pt-36">
      <div className="w-full md:max-w-xl flex flex-col items-center justify-center gap-2">
        <div className="flex w-full items-center justify-between gap-2">
          <h1 className="font-mono text-2xl">Swap</h1>
          {/*<Button variant="ghost" size="icon">
            <HugeiconsIcon icon={Settings01Icon} />
          </Button>*/}
        </div>
        <div className="flex flex-col w-full items-center justify-center gap-2 relative">
          <div className="flex flex-col items-center justify-center gap-2">
            <TokenInput
              title="Sell"
              token={isToken(from, cluster) ? from : null}
              onTokenChange={(token) => {
                navigate({
                  search: (prev) => {
                    const next = token ?? undefined;
                    if (next && next === prev.to)
                      return { ...prev, from: next, to: prev.from };

                    return { ...prev, from: next };
                  },
                  replace: true,
                });
              }}
              amount={sellAmount}
              onAmountChange={setSellAmount}
              balance={0}
            />
            <Button
              tabIndex={-1}
              variant="secondary"
              size="icon"
              className="group absolute z-10 bg-background hover:bg-background ring-1 ring-muted"
              onClick={() => {
                navigate({
                  search: (prev) => ({ from: prev.to, to: prev.from }),
                  replace: true,
                });

                setBuyAmount(null);
                setSellAmount(buyAmount);
              }}
            >
              <HugeiconsIcon
                icon={ChevronDown}
                className="group-hover:rotate-180 transition-[rotate] duration-200"
              />
            </Button>
            <TokenInput
              readOnly
              title="Buy"
              token={isToken(to, cluster) ? to : null}
              onTokenChange={(token) => {
                navigate({
                  search: (prev) => {
                    const next = token ?? undefined;
                    if (next && next === prev.from)
                      return { ...prev, from: prev.to, to: next };

                    return { ...prev, to: next };
                  },
                  replace: true,
                });
              }}
              amount={buyAmount}
              onAmountChange={setBuyAmount}
              balance={0}
            />
          </div>
          <div className="flex w-full items-center justify-center gap-2">
            {isConnected ? (
              <Button
                className="w-full"
                size="xl"
                disabled={!from || !to || !sellAmount || !buyAmount}
                onClick={async () => {
                  if (!signMessage)
                    return toast.warning(
                      "Wallet not supported for signing messages"
                    );

                  const signature = await signMessage(
                    new TextEncoder().encode(
                      JSON.stringify({
                        from,
                        to,
                        sellAmount,
                        buyAmount,
                      })
                    )
                  );

                  console.log(signature);
                }}
              >
                Swap
              </Button>
            ) : (
              <>
                <Button
                  className="w-full"
                  size="xl"
                  onClick={() => setWalletConnectDialogOpen(true)}
                >
                  Connect Wallet
                </Button>
                <SolanaWalletConnectDialog
                  open={walletConnectDialogOpen}
                  onOpenChange={setWalletConnectDialogOpen}
                  onConnect={() => {}}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
