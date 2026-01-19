import { Icons } from "@/components/icons";

interface AppIconProps {
  app: string;
  className?: string;
}

export function AppIcon({ app, className = "h-4 w-4" }: AppIconProps) {
  switch (app.toLowerCase()) {
    case "polymarket":
      return <Icons.polymarketBlueWhiteIcon className={className} />;
    case "limitless":
      return <Icons.limitlessLogo className={className} />;
    case "kalshi":
      return (
        <div
          className={`flex items-center justify-center rounded-sm bg-[#09C285] text-[10px] font-bold text-black ${className}`}
        >
          K
        </div>
      );
    default:
      return (
        <div className={`rounded-full bg-blue-500 ${className}`} title={app} />
      );
  }
}
