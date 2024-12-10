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

  const handleBankingCalculation = async (type: string, params: any) => {
    try {
      const endpoint = type === 'loan' ? '/api/banking/calculate-loan' : '/api/banking/calculate-savings';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Calculation failed');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Calculation error:', error);
      throw error;
    }
  };

  const extractLoanParameters = (message: string) => {
    const amountMatch = message.match(/\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)/);
    const rateMatch = message.match(/(\d+\.?\d*)%?/g);
    const yearsMatch = message.match(/(\d+)\s*years?/);
    
    return {
      principal: amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : null,
      rate: rateMatch ? parseFloat(rateMatch[0]) : null,
      years: yearsMatch ? parseInt(yearsMatch[1]) : null
    };
  };

  const extractNumbers = (text: string): number[] => {
    return text.match(/\d+(\.\d+)?/g)?.map(Number) || [];
  };

  const conversation = useConversation({
    onConnect: () => {
      toast({
        title: "Welcome to Zeta Display AI",
        description: "How can I assist you with your digital signage and visual communication needs today?",
        className: "bg-primary text-primary-foreground",
      });
    },
    onDisconnect: () => {
      toast({
        title: "Conversation Ended",
        description: "Thank you for using Zeta Display AI assistant",
      });
    },
    onMessage: async (props: { message: string; source: Role }) => {
      const isUserMessage = props.source === 'user';
      const message = props.message.toLowerCase();
      
      // Add the message to the transcript
      setMessages(prev => [...prev, {
        text: props.message,
        isUser: isUserMessage,
        timestamp: new Date()
      }]);

      // Handle calculation requests
      if (isUserMessage) {
        try {
          if (message.includes('loan') || message.includes('mortgage')) {
            const params = extractLoanParameters(message);
            if (params.principal && params.rate && params.years) {
              try {
                const result = await handleBankingCalculation('loan', {
                  principal: params.principal,
                  annualInterestRate: params.rate,
                  years: params.years
                });
                
                const response = `Based on your loan request:
                - Loan Amount: $${params.principal.toLocaleString()}
                - Interest Rate: ${params.rate}%
                - Term: ${params.years} years
                
                Monthly Payment: $${result.monthlyPayment.toLocaleString()}
                Total Payment: $${result.totalPayment.toLocaleString()}
                Total Interest: $${result.totalInterest.toLocaleString()}`;
                
                setMessages(prev => [...prev, {
                  text: response,
                  isUser: false,
                  timestamp: new Date()
                }]);
              } catch (error) {
                console.error('Calculation error:', error);
                setMessages(prev => [...prev, {
                  text: 'I apologize, but I encountered an error calculating your loan payment. Please try again with the format: "Calculate a loan for $[amount] at [rate]% for [years] years"',
                  isUser: false,
                  timestamp: new Date()
                }]);
              }
            }
          } else if (message.includes('savings') || message.includes('investment')) {
            const numbers = extractNumbers(message);
            if (numbers.length >= 4) {
              const result = await handleBankingCalculation('savings', {
                initialAmount: numbers[0],
                monthlyDeposit: numbers[1],
                annualInterestRate: numbers[2],
                years: numbers[3]
              });
              
              setMessages(prev => [...prev, {
                text: `Based on an initial amount of $${numbers[0]}, monthly deposits of $${numbers[1]}, an interest rate of ${numbers[2]}%, over ${numbers[3]} years:\n\nFinal Amount: $${result.finalAmount}\nTotal Interest Earned: $${result.totalInterest}\nAverage Monthly Interest: $${result.monthlyInterest}`,
                isUser: false,
                timestamp: new Date()
              }]);
            }
          }
        } catch (error) {
          console.error('Calculation error:', error);
        }
      }
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

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white/90 backdrop-blur-sm border border-gray-100">
        <div className="space-y-4">
          <div className="flex justify-center gap-4">
            <Button
              onClick={startConversation}
              disabled={conversation.status === 'connected' || isProcessing}
              className="bg-primary hover:bg-accent text-primary-foreground shadow-sm"
            >
              Start Conversation
            </Button>
            <Button
              onClick={stopConversation}
              disabled={conversation.status !== 'connected' || isProcessing}
              variant="outline"
              className="border-primary text-primary hover:bg-accent/10"
            >
              End Conversation
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-primary">
              Status: {conversation.status}
            </p>
            <p className="text-sm text-gray-600">
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
    </div>
  );
}
