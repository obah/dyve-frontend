"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function HomeNavbar() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex justify-center px-4 py-4 md:px-8">
      <nav className="glass flex w-full max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-3 shadow-2xl backdrop-blur-xl">
        <Link href="/" className="group flex items-center gap-2">
          <div className="group-hover:bg-primary flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-black transition-colors">
            <span className="relative top-px">D</span>
          </div>
          <span className="hidden text-xl font-bold tracking-tight text-white sm:block">
            DYVE
          </span>
        </Link>

        {/* <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
          <Link href="#" className="transition-colors hover:text-white">
            Home
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            DeFi App
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Assets
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Features
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Pricing
          </Link>
        </div> */}

        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-full border border-white/5 bg-white/10 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-white/20"
          >
            Open App <ArrowUpRight className="ml-0.5 h-4 w-4" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
