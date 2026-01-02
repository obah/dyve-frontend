"use client";

import { ShieldCheck, Server, GlobeLock } from "lucide-react";

export function TrustSection() {
  return (
    <section className="w-full border-t border-white/5 bg-zinc-950 py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="hover:border-primary/20 group rounded-xl border border-white/5 bg-black/50 p-6 transition-colors">
            <ShieldCheck className="group-hover:text-primary mb-4 h-10 w-10 text-zinc-600 transition-colors" />
            <h3 className="mb-2 text-xl font-bold text-white">
              Direct Routing
            </h3>
            <p className="text-zinc-400">
              We never hold your funds. All trades are routed securely via
              official protocol SDKs and smart contracts.
            </p>
          </div>

          <div className="hover:border-primary/20 group rounded-xl border border-white/5 bg-black/50 p-6 transition-colors">
            <Server className="group-hover:text-primary mb-4 h-10 w-10 text-zinc-600 transition-colors" />
            <h3 className="mb-2 text-xl font-bold text-white">
              Real-Time Data
            </h3>
            <p className="text-zinc-400">
              Sub-second updates via dedicated subgraphs and direct API hooks
              ensure you see the real price.
            </p>
          </div>

          <div className="hover:border-primary/20 group rounded-xl border border-white/5 bg-black/50 p-6 transition-colors">
            <GlobeLock className="group-hover:text-primary mb-4 h-10 w-10 text-zinc-600 transition-colors" />
            <h3 className="mb-2 text-xl font-bold text-white">
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
