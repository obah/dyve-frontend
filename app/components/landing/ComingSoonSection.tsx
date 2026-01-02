"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export function ComingSoonSection() {
  return (
    <section className="w-full border-t border-white/5 bg-linear-to-b from-black to-zinc-950 py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">
            Coming Soon: The Ultimate Prediction Portfolio.
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-zinc-400">
            We’re building the first cross-chain portfolio manager. Track your
            wins, losses, and open positions across every platform in one place.
          </p>

          <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
            <div className="relative grow">
              <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-zinc-500" />
              <input
                type="email"
                placeholder="Enter your email"
                className="focus:border-primary/50 focus:ring-primary/50 w-full rounded-lg border border-white/10 bg-zinc-900 py-3 pr-4 pl-10 text-white transition-all focus:ring-1 focus:outline-none"
              />
            </div>
            <button className="rounded-lg bg-white px-6 py-3 font-semibold whitespace-nowrap text-black transition-colors hover:bg-zinc-200">
              Get Early Access
            </button>
          </div>
          <p className="mt-4 text-xs text-zinc-600">
            Join 2,000+ traders on the waitlist.
          </p>
        </div>
      </div>
    </section>
  );
}
