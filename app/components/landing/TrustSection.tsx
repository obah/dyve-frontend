"use client";

import { ShieldCheck, Server, GlobeLock } from "lucide-react";

export function TrustSection() {
  return (
    <section className="w-full py-16 bg-zinc-950 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-black/50 border border-white/5 hover:border-primary/20 transition-colors group">
            <ShieldCheck className="w-10 h-10 text-zinc-600 group-hover:text-primary transition-colors mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Direct Routing
            </h3>
            <p className="text-zinc-400">
              We never hold your funds. All trades are routed securely via
              official protocol SDKs and smart contracts.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-black/50 border border-white/5 hover:border-primary/20 transition-colors group">
            <Server className="w-10 h-10 text-zinc-600 group-hover:text-primary transition-colors mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Real-Time Data
            </h3>
            <p className="text-zinc-400">
              Sub-second updates via dedicated subgraphs and direct API hooks
              ensure you see the real price.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-black/50 border border-white/5 hover:border-primary/20 transition-colors group">
            <GlobeLock className="w-10 h-10 text-zinc-600 group-hover:text-primary transition-colors mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Multi-Chain Native
            </h3>
            <p className="text-zinc-400">
              Seamlessly authenticate and trade across Polygon, Base, and
              App-specific chains with one wallet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
