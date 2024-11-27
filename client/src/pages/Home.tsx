import { Conversation } from "../components/conversation/Conversation";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-8 shadow-xl border border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-[#4CAF50]">
              Instabank AIBot
            </h1>
            <p className="text-gray-600 text-lg">
              Your personal AI banking advisor is ready to help
            </p>
          </div>
          <Conversation />
        </div>
      </Card>
    </div>
  );
}
