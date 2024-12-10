import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#00205B] relative h-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-white text-xl font-semibold absolute top-1/2 -translate-y-1/2">
            Coop AI Assistant
          </h1>
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
