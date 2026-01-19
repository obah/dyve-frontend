import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface Props {
  position: PortfolioPosition;
}

export function PortfolioMenu({ position }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <EllipsisVertical className="h-5 w-5" />
          <span className="sr-only">Open {position.event} menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="mt-3 space-y-3 border-white/10 bg-zinc-900 px-2"
      >
        <DropdownMenuItem>Swap</DropdownMenuItem>
        <DropdownMenuItem>Close</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
