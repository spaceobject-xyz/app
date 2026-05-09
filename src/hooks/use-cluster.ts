import * as React from "react";

import { ClusterContext } from "@/context/cluster";

export function useCluster() {
  const context = React.useContext(ClusterContext);

  if (context === undefined) {
    throw new Error("useCluster must be used within a ClusterProvider");
  }

  return context;
}
