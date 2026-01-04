"use client";

import Link from "next/link";
import { Twitter, DiscIcon as Discord, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black py-12">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg font-bold text-black">
            D
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            DYVE
          </span>
        </div>

        <div className="flex gap-6 text-sm text-zinc-400">
          <Link href="#" className="transition-colors hover:text-white">
            Documentation
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="transition-colors hover:text-white">
            Terms of Service
          </Link>
        </div>

        <div className="flex gap-4">
          <Link
            href="#"
            className="rounded-full bg-white/5 p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Twitter className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="rounded-full bg-white/5 p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Discord className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="rounded-full bg-white/5 p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Github className="h-5 w-5" />
          </Link>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-zinc-700">
        © 2024 Dyve Protocol. All rights reserved.
      </div>
    </footer>
  );
}
