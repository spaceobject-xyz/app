import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";

import { ThemeProvider } from "@/components/theme-provider.tsx";
import { NetworkProvider } from "@/context/network";

import { routeTree } from "./routeTree.gen.ts";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultStaleTime: 5000,
  scrollRestoration: true,
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// biome-ignore lint/style/noNonNullAssertion: require element with id: root
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <NetworkProvider>
        <RouterProvider router={router} />
      </NetworkProvider>
    </ThemeProvider>
  </StrictMode>
);
