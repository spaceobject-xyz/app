import type {
  AuthenticationResponseJSON,
  Base64URLString,
} from "@simplewebauthn/browser";
import {
  startAuthentication,
  startRegistration,
} from "@simplewebauthn/browser";
import * as React from "react";

const STORAGE_KEY = "__webauthn_credential";

type WebAuthnCredential = {
  id: Base64URLString;
  /**
   * Base64URL-encoded DER public key. Persisted because WebAuthn only exposes
   * it at registration — there is no way to recover it from the credential id.
   */
  publicKey: Base64URLString | null;
};

type WebAuthnContextValue = {
  /** Public key of the connected passkey, or `null` when disconnected. */
  publicKey: Base64URLString | null;
  /** Credential id of the connected passkey, or `null` when disconnected. */
  credentialId: Base64URLString | null;
  /** Whether a passkey is connected. */
  isConnected: boolean;
  /** Whether a WebAuthn ceremony is in flight. */
  isConnecting: boolean;
  /** Register a new passkey and connect to it. */
  register: (label: string) => Promise<WebAuthnCredential>;
  /** Authenticate with an existing passkey and connect to it. */
  connect: () => Promise<WebAuthnCredential>;
  /** Sign a message (challenge) with the connected passkey. */
  sign: (challenge?: Base64URLString) => Promise<AuthenticationResponseJSON>;
  /** Forget the current connection. */
  disconnect: () => void;
};

export const WebAuthnContext = React.createContext<
  WebAuthnContextValue | undefined
>(undefined);

function randomBase64Url(byteLength = 32): Base64URLString {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function readCredential(): WebAuthnCredential | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof (parsed as WebAuthnCredential).id === "string"
    ) {
      return parsed as WebAuthnCredential;
    }
    return null;
  } catch {
    return null;
  }
}

export type WebAuthnProviderOptions = {
  rpId: string;
  rpName: string;
};

export type WebAuthnProviderProps =
  React.PropsWithChildren<WebAuthnProviderOptions>;

export function WebAuthnProvider({
  children,
  rpId,
  rpName,
}: WebAuthnProviderProps) {
  const [credential, setCredentialState] =
    React.useState<WebAuthnCredential | null>(readCredential);
  const [isConnecting, setIsConnecting] = React.useState(false);

  const setCredential = React.useCallback((next: WebAuthnCredential | null) => {
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else localStorage.removeItem(STORAGE_KEY);

    setCredentialState(next);
  }, []);

  const register = React.useCallback(
    async (label: string) => {
      setIsConnecting(true);

      try {
        const response = await startRegistration({
          optionsJSON: {
            rp: { id: rpId, name: rpName },
            user: {
              id: randomBase64Url(16),
              name: label,
              displayName: label,
            },
            challenge: randomBase64Url(),
            pubKeyCredParams: [{ alg: -7, type: "public-key" }],
            timeout: 60_000,
            attestation: "none",
            authenticatorSelection: {
              residentKey: "required",
              userVerification: "preferred",
            },
          },
        });

        const next: WebAuthnCredential = {
          id: response.id,
          publicKey: response.response.publicKey ?? null,
        };
        setCredential(next);

        return next;
      } finally {
        setIsConnecting(false);
      }
    },
    [setCredential, rpId, rpName]
  );

  const connect = React.useCallback(async () => {
    setIsConnecting(true);

    try {
      const stored = readCredential();
      // TODO: replace with backend-issued challenge; verify the assertion server-side.
      const response = await startAuthentication({
        optionsJSON: {
          challenge: randomBase64Url(),
          rpId: window.location.hostname,
          allowCredentials: stored
            ? [{ id: stored.id, type: "public-key" }]
            : undefined,
          userVerification: "preferred",
          timeout: 60_000,
        },
      });

      const next: WebAuthnCredential =
        stored && stored.id === response.id
          ? stored
          : { id: response.id, publicKey: null };
      setCredential(next);

      return next;
    } finally {
      setIsConnecting(false);
    }
  }, [setCredential]);

  const sign = React.useCallback(
    async (challenge?: Base64URLString) => {
      if (!credential) {
        throw new Error("No passkey connected");
      }

      setIsConnecting(true);
      try {
        // TODO: replace with backend-issued challenge; verify the assertion server-side.
        return await startAuthentication({
          optionsJSON: {
            challenge: challenge ?? randomBase64Url(),
            rpId: window.location.hostname,
            allowCredentials: [{ id: credential.id, type: "public-key" }],
            userVerification: "preferred",
            timeout: 60_000,
          },
        });
      } finally {
        setIsConnecting(false);
      }
    },
    [credential]
  );

  const disconnect = React.useCallback(() => {
    setCredential(null);
  }, [setCredential]);

  const value = React.useMemo<WebAuthnContextValue>(
    () => ({
      publicKey: credential?.publicKey ?? null,
      credentialId: credential?.id ?? null,
      isConnected: credential !== null,
      isConnecting,
      register,
      connect,
      sign,
      disconnect,
    }),
    [credential, isConnecting, register, connect, sign, disconnect]
  );

  return React.createElement(WebAuthnContext.Provider, { value }, children);
}
