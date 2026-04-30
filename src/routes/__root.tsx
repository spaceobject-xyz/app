import { ChevronLeft } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <>
      <Header />
      <main className="flex w-full p-4 pt-22 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

function NotFoundComponent() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>Page not found</EmptyTitle>
        <EmptyDescription>
          The page you are looking was not found
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button
          render={
            <Link to="/">
              <HugeiconsIcon icon={ChevronLeft} />
              Go back
            </Link>
          }
        />
      </EmptyContent>
    </Empty>
  );
}
