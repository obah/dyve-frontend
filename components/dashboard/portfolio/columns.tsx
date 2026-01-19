"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AppIcon } from "@/components/dashboard/AppIcon";
import { formatCurrency, marketBadgeVariant } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { PortfolioMenu } from "./PortfolioMenu";

export const columns: ColumnDef<PortfolioPosition>[] = [
  {
    accessorKey: "event",
    header: "Event",
    cell: ({ row }) => (
      <div
        className="max-w-[300px] truncate font-medium text-white"
        title={row.getValue("event")}
      >
        {row.getValue("event")}
      </div>
    ),
  },
  {
    accessorKey: "outcome",
    header: "Outcome",
    cell: ({ row }) => (
      <div className="text-primary capitalize">{row.getValue("outcome")}</div>
    ),
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("cost"));
      return <div>{formatCurrency(amount)}</div>;
    },
  },
  {
    accessorKey: "potentialWinnings",
    header: "Winnings",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("potentialWinnings"));
      return <div className="text-green-400">{formatCurrency(amount)}</div>;
    },
  },
  {
    accessorKey: "platform",
    header: "Platform",
    cell: ({ row }) => {
      const platform = row.getValue("platform") as string;
      return (
        <Badge
          variant={marketBadgeVariant(platform)}
          className="flex items-center gap-2 capitalize"
        >
          <AppIcon app={platform} className="h-4 w-4" />
          {platform}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dateOpened",
    header: "Date Opened",
  },
  {
    accessorKey: "previousProbability",
    header: "Probability then",
    cell: ({ row }) => {
      const prob = row.getValue("previousProbability") as number;
      return <div>{prob}%</div>;
    },
  },
  {
    accessorKey: "currentProbability",
    header: "Probability now",
    cell: ({ row }) => {
      const prob = row.getValue("currentProbability") as number;
      const previousProb = row.getValue("previousProbability") as number;
      const isUp = prob >= previousProb;

      return (
        <div className={`${isUp ? "text-green-400" : "text-red-400"}`}>
          {prob}%
        </div>
      );
    },
  },
  {
    accessorKey: "isFromDyve",
    header: " DYVE",
    cell: ({ row }) => {
      const isFromDyve = row.getValue("isFromDyve") as boolean;
      return (
        <div
          className={`h-5 w-5 rounded-full ${isFromDyve ? "bg-primary" : "bg-white/20"}`}
        ></div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const position = row.original;
      return <PortfolioMenu position={position} />;
    },
  },
];
