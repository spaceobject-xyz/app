import * as React from "react";

import { WebAuthnContext } from "@/context/webauthn";

export function useWebAuthn() {
  const context = React.useContext(WebAuthnContext);

  if (context === undefined) {
    throw new Error("useWebAuthn must be used within a WebAuthnProvider");
  }

  return context;
}
