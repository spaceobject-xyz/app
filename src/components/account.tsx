import {
  Logout01Icon,
  User02Icon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useConnector } from "@solana/connector/react";
import { Link } from "@tanstack/react-router";

import { trimAddress } from "@/lib/address";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export interface AccountMenuProps {
  address: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({
  address,
  open,
  onOpenChange,
}) => {
  const { disconnectWallet } = useConnector();

  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger
        render={
          <Button size="lg" variant="secondary" className="font-mono font-bold">
            <HugeiconsIcon icon={User02Icon} />
            {trimAddress(address)}
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem
          render={
            <Link to="/wallet">
              <HugeiconsIcon icon={Wallet01Icon} />
              Wallet
            </Link>
          }
        ></DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={disconnectWallet}>
          <HugeiconsIcon icon={Logout01Icon} />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
