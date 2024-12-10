import { PropsWithChildren } from 'react';

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full bg-primary py-8">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center text-primary-foreground mb-2">
            Avinor AI Assistant
          </h1>
          <p className="text-xl text-center text-primary-foreground/80">
            Your intelligent digital assistant
          </p>
        </div>
      </div>
      <div className="container mx-auto p-6">
        {children}
      </div>
    </div>
  );
}
