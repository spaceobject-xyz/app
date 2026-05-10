import { useConnector } from "@solana/connector/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";

export interface SolanaWalletConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect: () => void;
}

export const SolanaWalletConnectDialog = ({
  open,
  onOpenChange,
  onConnect,
}: SolanaWalletConnectDialogProps) => {
  const { connectors, connectWallet, isError, isConnecting } = useConnector();
  const [connectingTo, setConnectingTo] = useState<string | null>(null);

  useEffect(() => {
    if (isError)
      toast.error("Failed to connect to Solana wallet", {
        position: "top-right",
      });
  }, [isError]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="overflow-scroll">
          <DialogTitle>Connect Solana Wallet</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2 overflow-hidden w-full">
          {connectors.map((connector) => (
            <Item
              key={connector.id}
              variant="outline"
              onClick={async () => {
                if (!connector.ready) return;

                setConnectingTo(connector.id);

                try {
                  await connectWallet(connector.id);

                  onConnect();
                  onOpenChange(false);
                } finally {
                  setConnectingTo(null);
                }
              }}
              render={
                <button
                  type="button"
                  className="hover:bg-secondary/30 disabled:opacity-50"
                  disabled={isConnecting}
                >
                  <ItemMedia>
                    <Avatar size="lg">
                      <AvatarImage src={connector.icon} alt={connector.name} />
                      <AvatarFallback>{connector.id}</AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>
                      {connectingTo === connector.id
                        ? `Connecting to ${connector.name}`
                        : connector.name}
                    </ItemTitle>
                  </ItemContent>
                </button>
              }
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
