import { ReactNode } from "react";
import { CoopLogo } from "@/components/icons/CoopLogo";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b">
        <div className="flex items-center justify-start h-16 px-6">
          <CoopLogo className="h-6 w-auto text-[#00205B]" />
        </div>
      </header>
      <main className="min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted to-background/90">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
