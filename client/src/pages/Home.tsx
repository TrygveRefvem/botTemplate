import { Conversation } from "../components/conversation/Conversation";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-8 shadow-xl border border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-semibold text-center flex items-center justify-center gap-1">
              <img 
                src="/cooplogo.png" 
                alt="Coop Logo" 
                className="h-16"
                style={{ objectFit: 'contain' }}
              />
            </h1>
            <p className="text-muted-foreground text-lg">
              Your intelligent digital assistant
            </p>
          </div>
          <Conversation />
        </div>
      </Card>
    </div>
  );
}
