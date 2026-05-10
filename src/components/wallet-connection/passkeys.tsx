import { Add01Icon, Login01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { z } from "zod";

import { useWebAuthn } from "@/hooks/use-webauthn";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Item, ItemContent, ItemMedia, ItemTitle } from "../ui/item";

export interface PasskeysConnectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PasskeysConnectDialog = ({
  open,
  onOpenChange,
}: PasskeysConnectDialogProps) => {
  const { connect, isConnecting, disconnect } = useWebAuthn();
  const [createOpen, setCreateOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setError(null);
  }, [open]);

  const useExisting = async () => {
    setError(null);

    try {
      await connect();

      onOpenChange(false);
    } catch (e) {
      console.error(e);
      setError("Authentication failed");
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Passkeys</DialogTitle>
            <DialogDescription>
              Use an existing passkey or create a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 w-full">
            <Item
              variant="outline"
              onClick={isConnecting ? undefined : useExisting}
              render={
                <button
                  type="button"
                  disabled={isConnecting}
                  className="hover:bg-secondary/30 disabled:opacity-50"
                >
                  <ItemMedia>
                    <Avatar size="lg">
                      <AvatarFallback>
                        <HugeiconsIcon
                          icon={Login01Icon}
                          className="text-purple-400"
                        />
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Use existing passkey</ItemTitle>
                  </ItemContent>
                </button>
              }
            />
            <Item
              variant="outline"
              onClick={isConnecting ? undefined : () => setCreateOpen(true)}
              render={
                <button
                  type="button"
                  disabled={isConnecting}
                  className="hover:bg-secondary/30 disabled:opacity-50"
                >
                  <ItemMedia>
                    <Avatar size="lg">
                      <AvatarFallback>
                        <HugeiconsIcon
                          icon={Add01Icon}
                          className="text-purple-400"
                        />
                      </AvatarFallback>
                    </Avatar>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle>Create new passkey</ItemTitle>
                  </ItemContent>
                </button>
              }
            />
            <Button onClick={disconnect}>Disconnect</Button>
          </div>
          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}
        </DialogContent>
      </Dialog>
      <PasskeysCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={() => {
          onOpenChange(false);
        }}
      />
    </>
  );
};

interface PasskeysCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

const passkeyCreateFormSchema = z.object({
  label: z.string().min(1).max(100).trim(),
});

const PasskeysCreateDialog = ({
  open,
  onOpenChange,
  onCreated,
}: PasskeysCreateDialogProps) => {
  const { register, isConnecting } = useWebAuthn();

  const form = useForm({
    defaultValues: {
      label: "",
    },
    validators: {
      onSubmit: passkeyCreateFormSchema,
    },
    onSubmit: async ({ value: { label } }) => {
      await register(label);

      onCreated();
      onOpenChange(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Create passkey
          </DialogTitle>
          <DialogDescription>
            Give your passkey a name so you can recognise it later.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            form.handleSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <form.Field name="label">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Label</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    autoFocus
                    autoComplete="off"
                    placeholder="e.g. MacBook Touch ID"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    disabled={isConnecting}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isConnecting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isConnecting}>
              {isConnecting ? "Creating ..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
