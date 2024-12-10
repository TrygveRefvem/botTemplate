'use client';

import { useCallback, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AudioVisualizer } from './AudioVisualizer';
import { ConversationTranscript } from './ConversationTranscript';
import { useConversation, Role } from '@11labs/react';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function Conversation() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentId, setAgentId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const conversation = useConversation({
    onConnect: () => {
      toast({
        title: "Welcome to Avinor AI Assistant",
        description: "How can I assist you today?",
        className: "bg-primary text-primary-foreground",
      });
    },
    onDisconnect: () => {
      toast({
        title: "Conversation Ended",
        description: "Thank you for using Avinor AI Assistant",
      });
    },
    onMessage: async (props: { message: string; source: Role }) => {
      const isUserMessage = props.source === 'user';
      setMessages(prev => [...prev, {
        text: props.message,
        isUser: isUserMessage,
        timestamp: new Date()
      }]);
    },
    onError: (error: Error | string) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: typeof error === 'string' ? error : error.message,
      });
    },
  });

  const startConversation = useCallback(async () => {
    try {
      setIsProcessing(true);
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      if (!agentId) {
        throw new Error("ElevenLabs configuration not loaded");
      }
      
      await conversation.startSession({
        agentId: agentId,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to start conversation. Please check your microphone access.",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [conversation, toast, agentId]);

  const stopConversation = useCallback(async () => {
    try {
      setIsProcessing(true);
      await conversation.endSession();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to end conversation",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [conversation, toast]);

  useEffect(() => {
    fetch('/api/config/elevenlabs')
      .then(res => res.json())
      .then(data => {
        setAgentId(data.agentId);
      })
      .catch(error => {
        toast({
          variant: "destructive",
          title: "Configuration Error",
          description: "Failed to load ElevenLabs configuration",
        });
      });
  }, [toast]);

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="p-6 space-y-6">
        <div className="flex justify-center gap-4">
          <Button
            onClick={startConversation}
            disabled={conversation.status === 'connected' || isProcessing}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm px-6"
          >
            Start Conversation
          </Button>
          <Button
            onClick={stopConversation}
            disabled={conversation.status !== 'connected' || isProcessing}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 px-6"
          >
            End Conversation
          </Button>
        </div>

        <div className="text-center space-y-2">
          <p className="text-base text-primary">
            Status: {conversation.status}
          </p>
          <p className="text-sm text-muted-foreground">
            {conversation.isSpeaking ? 'AI is speaking' : 'AI is listening'}
          </p>
        </div>

        <AudioVisualizer 
          isActive={conversation.status === 'connected'} 
          isSpeaking={conversation.isSpeaking}
        />

        <ConversationTranscript messages={messages} />
      </div>
    </Card>
  );
}
