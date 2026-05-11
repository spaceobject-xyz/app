import {
  getDefaultConfig,
  getDefaultMobileConfig,
  ConnectorProvider as SolanaConnectorProvider,
} from "@solana/connector/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { ThemeProvider } from "@/components/theme-provider.tsx";
import { ClusterProvider } from "@/context/cluster.ts";

import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
});

const solanaConfig = getDefaultConfig({
  autoConnect: true,
  enableMobile: true,
  appName: "Space Object",
  appUrl: window?.location?.origin ?? "https://app.spaceobject.xyz",
  network: "devnet",
});

const solanaMobileConfig = getDefaultMobileConfig({
  appName: solanaConfig.appName ?? "Space Object",
  appUrl:
    solanaConfig.appUrl ??
    window?.location?.origin ??
    "https://app.spaceobject.xyz",
  network: "devnet",
});

const queryClient = new QueryClient();

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// biome-ignore lint/style/noNonNullAssertion: require element with id: root
createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <ClusterProvider cluster="testnet">
      <SolanaConnectorProvider
        config={solanaConfig}
        mobile={solanaMobileConfig}
      >
        <QueryClientProvider client={queryClient}>
          <StrictMode>
            <RouterProvider router={router} />
          </StrictMode>
        </QueryClientProvider>
      </SolanaConnectorProvider>
    </ClusterProvider>
  </ThemeProvider>
);
