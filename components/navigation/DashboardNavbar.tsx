"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function DashboardNavbar() {
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
          <Link
            href="/login"
            className={buttonVariants({ variant: "outline" })}
          >
            Login
          </Link>

          <Link
            href="/signup"
            className={buttonVariants({ variant: "default" })}
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}
