"use client";

import { motion } from "framer-motion";
import { Search, Zap, Bell, ArrowRight } from "lucide-react";

export function FeatureShowcase() {
  return (
    <section className="relative w-full bg-black py-24">
      <div className="container mx-auto space-y-32 px-4">
        {/* Feature 1: Discovery */}
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="bg-primary/10 mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
              <Search className="text-primary h-6 w-6" />
            </div>
            <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Smart Discovery
            </h3>
            <p className="mb-6 text-lg leading-relaxed text-zinc-400">
              Filter by category, volume, or probability shifts. Use AI
              Summaries to understand the "why" behind market movements in
              seconds.
            </p>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-center gap-3">
                <div className="bg-primary h-1.5 w-1.5 rounded-full" />{" "}
                Real-time probability scanner
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary h-1.5 w-1.5 rounded-full" />{" "}
                AI-powered news correlation
              </li>
              <li className="flex items-center gap-3">
                <div className="bg-primary h-1.5 w-1.5 rounded-full" />{" "}
                Cross-chain liquidity aggregration
              </li>
            </ul>
          </motion.div>
          <div className="group relative order-1 h-[400px] overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 md:order-2">
            {/* Abstract UI for visual interest */}
            <div className="absolute top-6 right-6 left-6 flex h-12 items-center rounded-lg bg-white/5 px-4">
              <div className="mr-3 h-4 w-4 rounded-full bg-white/10" />
              <div className="h-2 w-32 rounded bg-white/10" />
            </div>
            <div className="absolute top-24 right-6 bottom-6 left-6 grid grid-cols-2 gap-4 rounded-lg bg-white/5 p-6">
              <div className="hover:border-primary/50 rounded border border-white/5 bg-black/40 p-4 transition-colors">
                <div className="bg-primary/40 mb-2 h-2 w-20 rounded" />
                <div className="from-primary/10 h-20 rounded bg-linear-to-t to-transparent" />
              </div>
              <div className="rounded border border-white/5 bg-black/40 p-4">
                <div className="mb-2 h-2 w-20 rounded bg-zinc-700" />
                <div className="h-20 rounded bg-linear-to-t from-zinc-800 to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Unified Execution */}
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative order-1 h-[400px] overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative z-10 w-64 rounded-xl border border-white/10 bg-black p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-sm text-zinc-400">Swap</span>
                  <span className="text-xs text-zinc-600">Settings</span>
                </div>
                <div className="mb-2 rounded-lg bg-zinc-900 p-3">
                  <div className="mb-1 text-xs text-zinc-500">Pay</div>
                  <div className="flex justify-between font-medium text-white">
                    <span>1,000</span>
                    <span>USDC</span>
                  </div>
                </div>
                <div className="relative z-20 -my-2 flex justify-center">
                  <div className="rounded-full border border-black bg-zinc-800 p-1.5">
                    <Zap className="text-primary h-4 w-4" />
                  </div>
                </div>
                <div className="mt-2 mb-4 rounded-lg bg-zinc-900 p-3">
                  <div className="mb-1 text-xs text-zinc-500">Receive</div>
                  <div className="flex justify-between font-medium text-white">
                    <span>1,024</span>
                    <span>YES Shares</span>
                  </div>
                </div>
                <button className="bg-primary w-full rounded py-2 text-sm font-semibold text-black">
                  Execute Trade
                </button>
              </div>
              {/* Network nodes background */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,100,0,0.05)_0%,transparent_70%)]" />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2"
          >
            <div className="bg-primary/10 mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
              <Zap className="text-primary h-6 w-6" />
            </div>
            <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              One-Click Routing
            </h3>
            <p className="mb-6 text-lg leading-relaxed text-zinc-400">
              Browse a trade on any protocol and route it directly through our
              interface. No more fragmented wallets or lost opportunities.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-zinc-400">
                Polygon
              </span>
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-zinc-400">
                Gnosis
              </span>
              <span className="rounded-full border border-zinc-800 px-3 py-1 text-zinc-400">
                Base
              </span>
              <span className="rounded-full border border-blue-900/30 px-3 py-1 text-blue-400">
                + Custom RPC
              </span>
            </div>
          </motion.div>
        </div>

        {/* Feature 3: Follow & Notify */}
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="bg-primary/10 mb-6 flex h-12 w-12 items-center justify-center rounded-lg">
              <Bell className="text-primary h-6 w-6" />
            </div>
            <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Never Miss a Swing
            </h3>
            <p className="mb-6 text-lg leading-relaxed text-zinc-400">
              Follow specific markets or categories. Get instant notifications
              when odds shift or markets close.
            </p>
            <button className="text-primary flex items-center gap-2 font-medium transition-all hover:gap-3">
              Setup Alerts <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
          <div className="relative order-1 flex h-[400px] items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/50 md:order-2">
            <div className="relative w-72 space-y-4">
              {/* Notification Cards */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="border-l-primary rounded-xl border border-l-4 border-white/10 bg-zinc-800/80 p-4 shadow-lg backdrop-blur"
              >
                <div className="mb-1 flex items-start justify-between">
                  <span className="text-sm font-medium text-white">
                    US Election 2024
                  </span>
                  <span className="text-xs text-zinc-500">2m ago</span>
                </div>
                <p className="text-xs text-zinc-300">
                  Odds shifted by{" "}
                  <span className="font-bold text-green-400">+5%</span> for
                  candidate A.
                </p>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="ml-4 rounded-xl border border-l-4 border-white/10 border-l-blue-500 bg-zinc-800/80 p-4 opacity-60 shadow-lg backdrop-blur"
              >
                <div className="mb-1 flex items-start justify-between">
                  <span className="text-sm font-medium text-white">
                    Fed Interest Rates
                  </span>
                  <span className="text-xs text-zinc-500">15m ago</span>
                </div>
                <p className="text-xs text-zinc-300">
                  New proposal added to Kalshi market.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
