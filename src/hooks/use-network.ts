import * as React from "react";

import { NetworkContext } from "@/context/network";

export function useNetwork() {
  const context = React.useContext(NetworkContext);

  if (context === undefined) {
    throw new Error("useNetwork must be used within a NetworkProvider");
  }

  return context;
}
