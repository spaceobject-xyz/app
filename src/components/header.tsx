import { Link } from "@tanstack/react-router";

import Logo from "@/assets/logo.svg?react";

import { Button } from "./ui/button";

export const Header: React.FC = () => {
  return (
    <header className="flex w-full p-4 border-b border-b-zinc-800 bg-zinc-900/40 fixed top-0">
      <div className="w-full flex mx-auto items-center justify-between">
        <Link to="/" className="inline-flex w-fit items-center gap-3">
          <Logo height={32} width={32} />
          <span className="font-bold font-mono text-xl">Space Object</span>
        </Link>
        <div className="flex items-center justify-end gap-2">
          <Button size="lg" className="font-mono font-bold">
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
};
