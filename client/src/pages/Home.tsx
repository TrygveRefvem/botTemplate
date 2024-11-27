import { Conversation } from "../components/conversation/Conversation";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-6">
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              AI Conversation Assistant
            </h1>
            <p className="text-muted-foreground">
              Start a voice conversation with our AI assistant
            </p>
          </div>
          <Conversation />
        </div>
      </Card>
    </div>
  );
}
