import { Conversation } from "../components/conversation/Conversation";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto p-8 shadow-xl border border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <div className="flex justify-center items-center">
              <img 
                src="/src/assets/logo.svg" 
                alt="SmartRetur Logo" 
                className="h-16 w-auto"
                aria-label="SmartRetur - Expert in pallet and return logistics"
              />
            </div>
            <p className="text-gray-600 text-lg">
              Your personal helper in all matters related to the company
            </p>
          </div>
          <Conversation />
        </div>
      </Card>
    </div>
  );
}
