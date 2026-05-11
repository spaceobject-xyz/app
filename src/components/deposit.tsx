import { Copy01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ReactQRCode } from "@lglab/react-qr-code";

import type { AvailableNetwork } from "@/config/networks";
import type { Token } from "@/types/token";
import { useCluster } from "@/hooks/use-cluster";
import { getNetwork } from "@/lib/networks";
import { getToken } from "@/lib/tokens";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";

export interface DepositDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: Token<AvailableNetwork>;
}

export const DepositDialog: React.FC<DepositDialogProps> = ({
  open,
  onOpenChange,
  token,
}) => {
  const { cluster } = useCluster();
  const tokenInfo = getToken(token, cluster);
  const networkInfo = tokenInfo?.networkId
    ? getNetwork(tokenInfo.networkId, cluster)
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Deposit</DialogTitle>
          <DialogDescription>
            Receive {tokenInfo?.symbol ?? "Unknown Token"} from{" "}
            {networkInfo?.name ?? "Unknown Network"} into your wallet.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Item className="p-0">
              <ItemMedia>
                <Avatar className="size-12">
                  <AvatarImage
                    src={tokenInfo?.imageUrl}
                    alt={tokenInfo?.id ?? "unknown"}
                  />
                  <AvatarFallback>
                    <AvatarFallback>
                      {tokenInfo?.name.at(0) ?? "?"}
                    </AvatarFallback>
                  </AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Token</ItemTitle>
                <ItemDescription>
                  {tokenInfo?.symbol ?? "Unknown Token"}
                </ItemDescription>
              </ItemContent>
            </Item>

            {tokenInfo?.networkBadge && (
              <Item className="p-0">
                <ItemMedia>
                  <Avatar className="size-12">
                    <AvatarImage
                      src={networkInfo?.imageUrl}
                      alt={networkInfo?.id ?? "unknown"}
                    />
                    <AvatarFallback>
                      <AvatarFallback>
                        {networkInfo?.name.at(0) ?? "?"}
                      </AvatarFallback>
                    </AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Network</ItemTitle>
                  <ItemDescription>
                    {networkInfo?.name ?? "Unknown Network"}
                  </ItemDescription>
                </ItemContent>
              </Item>
            )}
          </div>

          <Card>
            <div className="flex w-full items-center justify-center py-12 bg-purple-700/20 -mt-6">
              <div className="rounded-lg overflow-hidden">
                <ReactQRCode
                  imageSettings={{
                    src: "https://assets.spaceobject.xyz/logos/logo-light.svg",
                    width: 48,
                    height: 48,
                    excavate: true,
                    opacity: 1,
                  }}
                  background="#fff"
                  marginSize={2}
                  size={192}
                  value="https://reactqrcode.com"
                />
              </div>
            </div>
            <CardHeader>
              <CardTitle>Address</CardTitle>
              <CardDescription>0x</CardDescription>
              <CardAction className="self-center">
                <Button
                  variant="secondary"
                  size="icon-lg"
                  onClick={() => navigator.clipboard.writeText("0x")}
                >
                  <HugeiconsIcon icon={Copy01Icon} />
                </Button>
              </CardAction>
            </CardHeader>
            <CardFooter>
              <p className="text-xs">
                Only send {tokenInfo?.name ?? "tokens"} on the{" "}
                {networkInfo?.name ?? "unknown"} network. Sending other assets
                or using a different network will result in loss of funds.
              </p>
            </CardFooter>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
