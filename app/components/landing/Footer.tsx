"use client";

import Link from "next/link";
import { Twitter, DiscIcon as Discord, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-12 bg-black border-t border-white/10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-black">
            D
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            DYVE
          </span>
        </div>

        <div className="flex gap-6 text-sm text-zinc-400">
          <Link href="#" className="hover:text-white transition-colors">
            Documentation
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>

        <div className="flex gap-4">
          <Link
            href="#"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </Link>
          <Link
            href="#"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <Discord className="w-5 h-5" />
          </Link>
          <Link
            href="#"
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </Link>
        </div>
      </div>
      <div className="text-center text-xs text-zinc-700 mt-8">
        © 2024 Dyve Protocol. All rights reserved.
      </div>
    </footer>
  );
}
