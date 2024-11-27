import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ConversationTranscriptProps {
  messages: Message[];
}

export function ConversationTranscript({ messages }: ConversationTranscriptProps) {
  return (
    <ScrollArea className="h-[300px] rounded-md border border-gray-100 bg-white/80 backdrop-blur-sm p-4">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 shadow-sm ${
                message.isUser
                  ? 'bg-[#4CAF50] text-white'
                  : 'bg-white border border-gray-100'
              }`}
            >
              <p className={message.isUser ? 'text-white' : 'text-gray-800'}>
                {message.text}
              </p>
              <p className={`text-xs mt-1 ${message.isUser ? 'text-white/80' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
