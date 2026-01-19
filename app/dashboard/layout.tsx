import { DashboardNavbar } from "@/components/navigation/DashboardNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="selection:bg-primary/20 min-h-screen bg-black text-white">
      <DashboardNavbar />
      <div className="pt-24 pb-20">{children}</div>
    </main>
  );
}
