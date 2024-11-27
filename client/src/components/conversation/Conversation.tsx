'use client';

import { useCallback, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AudioVisualizer } from './AudioVisualizer';
import { useConversation } from '@11labs/react';

export function Conversation() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      toast({
        title: "Connected",
        description: "Ready to start conversation",
      });
    },
    onDisconnect: () => {
      toast({
        title: "Disconnected",
        description: "Conversation ended",
      });
    },
    onMessage: (message) => {
      console.log('Message:', message);
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  const startConversation = useCallback(async () => {
    try {
      setIsProcessing(true);
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      await conversation.startSession({
        agentId: process.env.ELEVENLABS_AGENT_ID || '',
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
  }, [conversation, toast]);

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

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex justify-center gap-4">
            <Button
              onClick={startConversation}
              disabled={conversation.status === 'connected' || isProcessing}
              variant="default"
            >
              Start Conversation
            </Button>
            <Button
              onClick={stopConversation}
              disabled={conversation.status !== 'connected' || isProcessing}
              variant="destructive"
            >
              End Conversation
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm font-medium">
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
        </div>
      </Card>
    </div>
  );
}
