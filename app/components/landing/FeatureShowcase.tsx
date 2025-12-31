"use client";

import { motion } from "framer-motion";
import { Search, Zap, Bell, ArrowRight } from "lucide-react";

export function FeatureShowcase() {
  return (
    <section className="w-full py-24 bg-black relative">
      <div className="container mx-auto px-4 space-y-32">
        {/* Feature 1: Discovery */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Smart Discovery
            </h3>
            <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
              Filter by category, volume, or probability shifts. Use AI
              Summaries to understand the "why" behind market movements in
              seconds.
            </p>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                Real-time probability scanner
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                AI-powered news correlation
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />{" "}
                Cross-chain liquidity aggregration
              </li>
            </ul>
          </motion.div>
          <div className="order-1 md:order-2 relative h-[400px] rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden group">
            {/* Abstract UI for visual interest */}
            <div className="absolute top-6 left-6 right-6 h-12 bg-white/5 rounded-lg flex items-center px-4">
              <div className="w-4 h-4 rounded-full bg-white/10 mr-3" />
              <div className="w-32 h-2 bg-white/10 rounded" />
            </div>
            <div className="absolute top-24 left-6 right-6 bottom-6 bg-white/5 rounded-lg p-6 grid grid-cols-2 gap-4">
              <div className="bg-black/40 rounded border border-white/5 p-4 hover:border-primary/50 transition-colors">
                <div className="h-2 w-20 bg-primary/40 rounded mb-2" />
                <div className="h-20 bg-linear-to-t from-primary/10 to-transparent rounded" />
              </div>
              <div className="bg-black/40 rounded border border-white/5 p-4">
                <div className="h-2 w-20 bg-zinc-700 rounded mb-2" />
                <div className="h-20 bg-linear-to-t from-zinc-800 to-transparent rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature 2: Unified Execution */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-1 relative h-[400px] rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 p-6 bg-black border border-white/10 rounded-xl shadow-2xl relative z-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-zinc-400 text-sm">Swap</span>
                  <span className="text-zinc-600 text-xs">Settings</span>
                </div>
                <div className="bg-zinc-900 p-3 rounded-lg mb-2">
                  <div className="text-xs text-zinc-500 mb-1">Pay</div>
                  <div className="flex justify-between text-white font-medium">
                    <span>1,000</span>
                    <span>USDC</span>
                  </div>
                </div>
                <div className="flex justify-center -my-2 relative z-20">
                  <div className="bg-zinc-800 p-1.5 rounded-full border border-black">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                </div>
                <div className="bg-zinc-900 p-3 rounded-lg mt-2 mb-4">
                  <div className="text-xs text-zinc-500 mb-1">Receive</div>
                  <div className="flex justify-between text-white font-medium">
                    <span>1,024</span>
                    <span>YES Shares</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-primary rounded text-black font-semibold text-sm">
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
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              One-Click Routing
            </h3>
            <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
              Browse a trade on any protocol and route it directly through our
              interface. No more fragmented wallets or lost opportunities.
            </p>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 rounded-full border border-zinc-800 text-zinc-400">
                Polygon
              </span>
              <span className="px-3 py-1 rounded-full border border-zinc-800 text-zinc-400">
                Gnosis
              </span>
              <span className="px-3 py-1 rounded-full border border-zinc-800 text-zinc-400">
                Base
              </span>
              <span className="px-3 py-1 rounded-full border border-blue-900/30 text-blue-400 border-blue-500/20">
                + Custom RPC
              </span>
            </div>
          </motion.div>
        </div>

        {/* Feature 3: Follow & Notify */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Never Miss a Swing
            </h3>
            <p className="text-lg text-zinc-400 mb-6 leading-relaxed">
              Follow specific markets or categories. Get instant notifications
              when odds shift or markets close.
            </p>
            <button className="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
              Setup Alerts <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
          <div className="order-1 md:order-2 relative h-[400px] rounded-2xl bg-zinc-900/50 border border-white/5 overflow-hidden flex items-center justify-center">
            <div className="relative w-72 space-y-4">
              {/* Notification Cards */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-zinc-800/80 backdrop-blur border border-white/10 p-4 rounded-xl shadow-lg border-l-4 border-l-primary"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-white font-medium text-sm">
                    US Election 2024
                  </span>
                  <span className="text-zinc-500 text-xs">2m ago</span>
                </div>
                <p className="text-zinc-300 text-xs">
                  Odds shifted by{" "}
                  <span className="text-green-400 font-bold">+5%</span> for
                  candidate A.
                </p>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-zinc-800/80 backdrop-blur border border-white/10 p-4 rounded-xl shadow-lg border-l-4 border-l-blue-500 ml-4 opacity-60"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-white font-medium text-sm">
                    Fed Interest Rates
                  </span>
                  <span className="text-zinc-500 text-xs">15m ago</span>
                </div>
                <p className="text-zinc-300 text-xs">
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
