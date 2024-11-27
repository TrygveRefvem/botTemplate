import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <main className="min-h-screen py-8">
        {children}
      </main>
    </div>
  );
}
