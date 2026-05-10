import { useConnector } from "@solana/connector/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

import Logo from "@/assets/logo.svg?react";

import { AccountMenu } from "./account";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { SolanaWalletConnectDialog } from "./wallet-connection/solana";

export const Header: React.FC = () => {
  const { location } = useRouterState();

  const [walletConnectDialogOpen, setWalletConnectDialogOpen] =
    useState<boolean>(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState<boolean>(false);

  const { isConnected, isConnecting, account } = useConnector();

  return (
    <header className="flex w-full p-4 border-b border-b-zinc-800 bg-zinc-900/40 fixed top-0">
      <div className="w-full flex mx-auto items-center justify-between">
        <Link
          to="/"
          search={location.pathname === "/" ? location.search : undefined}
          className="inline-flex w-fit items-center gap-3"
        >
          <Logo height={32} width={32} />
          <span className="font-bold font-mono text-xl hidden md:inline">
            Space Object
          </span>
          <Badge variant="secondary" className="text-primary/60">
            pre-alpha
          </Badge>
        </Link>
        <div className="flex items-center justify-end gap-2">
          {isConnected && account ? (
            <AccountMenu
              address={account}
              open={accountMenuOpen}
              onOpenChange={setAccountMenuOpen}
            />
          ) : (
            <Button
              size="lg"
              className="font-mono font-bold"
              onClick={() => setWalletConnectDialogOpen(true)}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}
        </div>
      </div>
      <SolanaWalletConnectDialog
        open={walletConnectDialogOpen}
        onOpenChange={setWalletConnectDialogOpen}
        onConnect={() => {}}
      />
    </header>
  );
};
