"use client";

import { WagmiProvider } from "wagmi";
import { config } from "@/lib/walletConnect";
import { ConnectKitProvider } from "connectkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          theme="midnight"
          customTheme={{
            "--ck-connectbutton-background": "#F84712",
            "--ck-connectbutton-color": "#fff",
            "--ck-connectbutton-hover-background": "#E94313",
            "--ck-connectbutton-active-background": "#F84712",
            "--ck-connectbutton-border-radius": "6px",
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
