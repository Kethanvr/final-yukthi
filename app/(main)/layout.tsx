import { TopNav } from "@/components/navigation/TopNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      {children}
    </div>
  );
}


