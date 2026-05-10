import { Key01Icon, Wallet01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Item, ItemContent, ItemMedia, ItemTitle } from "./ui/item";
import { PasskeysConnectDialog } from "./wallet-connection/passkeys";
import { SolanaWalletConnectDialog } from "./wallet-connection/solana";

export interface WalletConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WalletConnectDialog: React.FC<WalletConnectDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const [solanaWalletDialogOpen, setSolanaWalletDialogOpen] =
    useState<boolean>(false);
  const [passkeysDialogOpen, setPasskeysDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="overflow-scroll">
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription>
            Select your preferred wallet to connect.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 overflow-hidden w-full">
          <Item
            variant="outline"
            onClick={() => setPasskeysDialogOpen(true)}
            render={
              <button type="button" className="hover:bg-secondary/30">
                <ItemMedia>
                  <Avatar size="lg">
                    <AvatarFallback>
                      <HugeiconsIcon
                        icon={Key01Icon}
                        className="text-purple-400"
                      />
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Passkeys</ItemTitle>
                </ItemContent>
              </button>
            }
          />
          <Item
            variant="outline"
            onClick={() => setSolanaWalletDialogOpen(true)}
            render={
              <button type="button" className="hover:bg-secondary/30">
                <ItemMedia>
                  <Avatar size="lg">
                    <AvatarImage src="https://assets.spaceobject.xyz/logos/networks/solana.svg" />
                    <AvatarFallback>
                      <HugeiconsIcon
                        icon={Wallet01Icon}
                        className="text-purple-400"
                      />
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Solana Wallets</ItemTitle>
                </ItemContent>
              </button>
            }
          />
        </div>
      </DialogContent>
      <SolanaWalletConnectDialog
        open={solanaWalletDialogOpen}
        onOpenChange={setSolanaWalletDialogOpen}
        onConnect={() => {}}
      />
      <PasskeysConnectDialog
        open={passkeysDialogOpen}
        onOpenChange={setPasskeysDialogOpen}
      />
    </Dialog>
  );
};
