import { Conversation } from "../components/conversation/Conversation";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-8 shadow-lg border-t-4 border-primary">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Banking Assistant
            </h1>
            <p className="text-muted-foreground text-lg">
              Your personal AI banking advisor is ready to help
            </p>
          </div>
          <Conversation />
        </div>
      </Card>
    </div>
  );
}
