'use client';

import { useCallback, useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AudioVisualizer } from './AudioVisualizer';
import { useConversation } from '@11labs/react';

export function Conversation() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentId, setAgentId] = useState<string>('');

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
