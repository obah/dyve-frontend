"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export function ComingSoonSection() {
  return (
    <section className="w-full py-24 bg-linear-to-b from-black to-zinc-950 border-t border-white/5">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Coming Soon: The Ultimate Prediction Portfolio.
          </h2>
          <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
            We’re building the first cross-chain portfolio manager. Track your
            wins, losses, and open positions across every platform in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="relative grow">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-zinc-900 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            <button className="bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-zinc-200 transition-colors whitespace-nowrap">
              Get Early Access
            </button>
          </div>
          <p className="text-xs text-zinc-600 mt-4">
            Join 2,000+ traders on the waitlist.
          </p>
        </div>
      </div>
    </section>
  );
}
