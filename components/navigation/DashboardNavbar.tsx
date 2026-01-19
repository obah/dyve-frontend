"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { DashboardMenu } from "./DashboardMenu";
import { formatCurrency } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { PageLinks } from "@/lib/constants";

export function DashboardNavbar() {
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const balance = 100;

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex justify-center bg-black px-4 py-4 md:px-8">
      <nav className="glass flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-3 shadow-2xl backdrop-blur-xl">
        <Link href="/" className="group flex items-center gap-2">
          <div className="group-hover:bg-primary flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-black transition-colors">
            <span className="relative top-px">D</span>
          </div>
          <span className="hidden text-xl font-bold tracking-tight text-white sm:block">
            DYVE
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {isConnected ? (
            <>
              <Button className="group w-24 transition-all">
                <span className="group-hover:hidden">
                  {formatCurrency(balance)}
                </span>
                <span className="hidden items-center gap-2 group-hover:flex">
                  Deposit
                  <PlusIcon />
                </span>
              </Button>

              <Link
                href={PageLinks.DASHBOARD.HOME}
                className={buttonVariants({ variant: "outline" })}
              >
                Markets
              </Link>

              <DashboardMenu onLogout={() => setIsConnected(false)} />
            </>
          ) : (
            <>
              <Button variant={"outline"} onClick={() => setIsConnected(true)}>
                Login
              </Button>

              <Button onClick={() => setIsConnected(true)}>Sign up</Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
