"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

interface MarketBuyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOutcome: IOutcome | null;
  marketQuestion: string;
  allOutcomes: IOutcome[];
}

export function MarketBuyModal({
  open,
  onOpenChange,
  selectedOutcome,
  marketQuestion,
  allOutcomes,
}: MarketBuyModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [contracts, setContracts] = useState<string>("");
  const [outcome, setOutcome] = useState<IOutcome | null>(selectedOutcome);

  // Reset inputs when the modal opens or the outcome changes
  useEffect(() => {
    if (open) {
      setAmount("");
      setContracts("");
      setOutcome(selectedOutcome);
    }
  }, [open, selectedOutcome]);

  const handleContractsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setContracts(val);
    if (val && !isNaN(Number(val)) && outcome?.price) {
      // amount (cost) = contracts * (price / 100)
      const priceInDollars = outcome.price / 100;
      const calculatedAmount = Number(val) * priceInDollars;
      setAmount(calculatedAmount.toFixed(2));
    } else {
      setAmount("");
    }
  };

  // Recalculate cost when outcome changes (price changes)
  useEffect(() => {
    if (!outcome) return;

    const priceInDollars = outcome.price / 100;

    if (contracts && !isNaN(Number(contracts))) {
      // Recalculate amount based on existing contracts and new price
      const calculatedAmount = Number(contracts) * priceInDollars;
      setAmount(calculatedAmount.toFixed(2));
    }
  }, [outcome, contracts]);

  const totalWin =
    outcome && contracts && amount
      ? (
          Number(amount) +
          Number(contracts) * (1 - outcome.price / 100)
        ).toFixed(2)
      : "0.00";

  if (!outcome) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className="border-white/10 bg-zinc-900 text-white sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle>Buy {outcome.label}</DialogTitle>
          <DialogDescription className="text-zinc-400">
            {marketQuestion}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">
                Contracts
              </label>
              <input
                type="number"
                placeholder="0"
                value={contracts}
                onChange={handleContractsChange}
                className="focus:ring-primary/50 flex h-10 w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:ring-2 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">
                Total Cost
              </label>
              <div className="flex h-10 w-full items-center rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-zinc-300">
                ${amount || "0.00"}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
            <span className="text-sm text-zinc-400">Condition</span>
            <div className="flex gap-2">
              {allOutcomes.map((o) => (
                <Button
                  key={o.label}
                  variant={outcome?.label === o.label ? "default" : "outline"}
                  size="sm"
                  onClick={() => setOutcome(o)}
                >
                  {o.label}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-white/5 p-3">
            <span className="text-sm text-zinc-400">Current Price</span>
            <span className="font-medium">¢{outcome.price.toFixed(2)}</span>
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full border-white/10 hover:bg-white/10 hover:text-white sm:w-auto dark:text-white"
          >
            Cancel
          </Button>
          <Button
            className="w-full sm:w-auto"
            onClick={() => onOpenChange(false)}
          >
            Buy {outcome.label} to win ${totalWin}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
