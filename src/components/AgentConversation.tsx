import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { agents } from '@/data/techstart-data';

interface ConversationMessage {
  id: string;
  agentId: string;
  message: string;
  timestamp: Date;
  analysis?: any;
  isTyping?: boolean;
  displayedMessage?: string;
}

const stageConversations = {
  0: [
    {
      agentId: 'system',
      message: 'Initiating comprehensive loan analysis for TechStart Manufacturing. Engaging multi-agent analysis team: Risk Management, Legal Compliance, Sales & Marketing, and Product Strategy agents. Processing $850,000 equipment financing request.',
      delay: 1000
    }
  ],
  1: [
    {
      agentId: 'robert',
      message: 'Initiating risk analysis for TechStart Manufacturing $850,000 equipment financing request. Elena, please conduct comprehensive credit and financial analysis using the provided financial statements and industry benchmarks.',
      delay: 1000
    },
    {
      agentId: 'elena',
      message: 'Analyzing TechStart Manufacturing financial profile:\n\n**Credit Metrics Analysis:**\n- Credit Score: 742 (Excellent range)\n- Debt-to-Equity Ratio: 0.41 (Strong - below 0.5 threshold)\n- Current Ratio: 2.62 (Excellent liquidity)\n- Revenue Growth: 14% YoY (Strong performance)\n- Operating Cash Flow: $420,000 (Sufficient for debt service)\n\n**Debt Service Coverage Analysis:**\n- Estimated annual payment: $142,800\n- Operating cash flow: $420,000\n- Debt service coverage ratio: 2.94 (Excellent)\n\n**Risk Rating: LOW-MODERATE**\nRecommendation: Approve with standard terms.',
      delay: 3000
    }
  ],
  2: [
    {
      agentId: 'lisa',
      message: 'Initiating legal and regulatory compliance review. Matthew, verify current requirements for commercial equipment loans of this size and structure.',
      delay: 1000
    },
    {
      agentId: 'matthew',
      message: 'Compliance requirements analysis for $850,000 equipment financing:\n\n**Regulatory Requirements:**\n- Loan amount exceeds $500,000 - Enhanced documentation required\n- Equipment financing regulations: Standard commercial lending rules apply\n- UCC filing required for equipment security interest\n\n**Documentation Requirements:**\n- Personal guarantees from all LLC members (>20% ownership)\n- Equipment insurance: Full replacement value coverage\n- Financial reporting: Quarterly statements required\n- Site inspection: Required for equipment verification\n\n**Compliance Status: APPROVED**\nAll regulatory requirements can be satisfied with standard documentation.',
      delay: 2500
    }
  ],
  3: [
    {
      agentId: 'marcus',
      message: 'Analyzing market conditions and relationship opportunities:\n\n**Current Market Rates (Austin region):**\n- Large banks: 6.8% - 7.2% (7-year terms)\n- Regional banks: 6.2% - 6.8% (our competitive range)\n- Equipment finance companies: 5.8% - 6.5% (aggressive pricing)\n\n**Relationship Analysis:**\n- Customer since: 3 years\n- Payment history: Perfect record\n- Current relationship profitability: $18,500 annually\n- Cross-selling opportunities: $40,800 potential additional revenue\n\n**Pricing Recommendation:**\n- Rate: 6.2% (relationship pricing)\n- Term: 7 years\n- Market Assessment: FAVORABLE CONDITIONS',
      delay: 2000
    }
  ],
  4: [
    {
      agentId: 'victoria',
      message: 'Evaluating strategic alignment and portfolio impact:\n\n**Portfolio Composition Impact:**\n- Current equipment financing: 22% of commercial portfolio\n- Target range: 20-30% (within optimal range)\n- Manufacturing sector exposure: 18% (target: 15-25%)\n- Geographic concentration: Austin market 31% (acceptable)\n\n**Product Strategy Alignment:**\n- Equipment financing focus: Strategic priority for 2025\n- CNC equipment: Familiar collateral type (good resale value)\n- Loan size: $850K fits target range ($500K - $2M)\n- Customer profile: Ideal target (established, growing, profitable)\n\n**Strategic Value Score: 8.7/10**\nExcellent fit with strategic objectives and portfolio targets.',
      delay: 2200
    }
  ],
  5: [
    {
      agentId: 'system',
      message: 'Multi-agent analysis complete. Comprehensive recommendation generated:\n\n**LOAN RECOMMENDATION: APPROVED**\n\n**Risk Assessment Summary:**\n- Credit Risk: Low-Moderate\n- Debt Service Coverage: 2.94 (Excellent)\n- Collateral Value: $850,000 (new equipment)\n- Industry Risk: Stable with growth prospects\n- Relationship Risk: Low (strong 3-year history)\n\n**Analysis confidence level**: 94%\n**Recommendation strength**: Strong Approval',
      delay: 1500
    }
  ]
};

interface AgentConversationProps {
  currentStage: number;
}

export const AgentConversation = ({ currentStage }: AgentConversationProps) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [activeAgents, setActiveAgents] = useState<Set<string>>(new Set());
  const [typingAgents, setTypingAgents] = useState<Set<string>>(new Set());
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  }, [messages]);

  // Typewriter effect for messages
  useEffect(() => {
    messages.forEach((message, messageIndex) => {
      if (message.isTyping && message.displayedMessage !== message.message) {
        const fullMessage = message.message;
        const currentLength = message.displayedMessage?.length || 0;
        
        if (currentLength < fullMessage.length) {
          const timer = setTimeout(() => {
            setMessages(prev => prev.map((msg, idx) => 
              idx === messageIndex 
                ? { ...msg, displayedMessage: fullMessage.substring(0, currentLength + 1) }
                : msg
            ));
          }, 30); // Typing speed
          
          return () => clearTimeout(timer);
        } else {
          // Finished typing
          setMessages(prev => prev.map((msg, idx) => 
            idx === messageIndex 
              ? { ...msg, isTyping: false }
              : msg
          ));
        }
      }
    });
  }, [messages]);

  useEffect(() => {
    if (currentStage >= 0 && stageConversations[currentStage as keyof typeof stageConversations]) {
      const stageMessages = stageConversations[currentStage as keyof typeof stageConversations];
      
      stageMessages.forEach((msg, index) => {
        setTimeout(() => {
          // Start typing indicator
          setTypingAgents(prev => new Set([...prev, msg.agentId]));
          setActiveAgents(prev => new Set([...prev, msg.agentId]));
          
          // Add message after typing delay
          setTimeout(() => {
            const newMessage: ConversationMessage = {
              id: `${currentStage}-${index}`,
              agentId: msg.agentId,
              message: msg.message,
              timestamp: new Date(),
              isTyping: true,
              displayedMessage: ''
            };
            
            setMessages(prev => [...prev, newMessage]);
            setTypingAgents(prev => {
              const updated = new Set(prev);
              updated.delete(msg.agentId);
              return updated;
            });
            
            // Remove agent from active after message completes
            setTimeout(() => {
              setActiveAgents(prev => {
                const updated = new Set(prev);
                updated.delete(msg.agentId);
                return updated;
              });
            }, msg.message.length * 30 + 1000);
          }, 1000 + Math.random() * 500); // Random typing delay
        }, msg.delay + (index * 500));
      });
    }
  }, [currentStage]);

  const getAgent = (agentId: string) => {
    if (agentId === 'system') {
      return { name: 'System Orchestrator', avatar: '🤖', role: 'System Coordinator' };
    }
    return agents.find(agent => agent.id === agentId);
  };

  return (
    <Card className="w-full flex-1 flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center space-x-2">
          <span>🔄</span>
          <span>Multi-Agent Analysis Conversation</span>
          <Badge variant="outline">{messages.length} messages</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full w-full pr-4">
          <div className="space-y-4">
            {messages.map((message) => {
              const agent = getAgent(message.agentId);
              const isActive = activeAgents.has(message.agentId);
              
              return (
                <div key={message.id} className={`flex space-x-3 transition-all duration-500 animate-fade-in ${
                  isActive ? 'bg-primary/5 p-3 rounded-lg border border-primary/20' : 'p-2'
                }`}>
                  <div className="flex-shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm ${
                      message.agentId === 'system' ? 'bg-accent text-accent-foreground' : 
                      agent && 'type' in agent && agent.type === 'primary' ? 'bg-primary text-primary-foreground' : 
                      'bg-secondary text-secondary-foreground'
                    } ${isActive ? 'animate-pulse' : ''}`}>
                      {agent?.avatar || '🤖'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-foreground">
                        {agent?.name || 'System'}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {agent?.role || 'System Coordinator'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-sm text-foreground whitespace-pre-line">
                      {message.displayedMessage || message.message}
                      {message.isTyping && (
                        <span className="animate-pulse">|</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Typing indicators */}
            {Array.from(typingAgents).map((agentId) => {
              const agent = getAgent(agentId);
              return (
                <div key={`typing-${agentId}`} className="flex space-x-3 p-2 animate-fade-in">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm bg-muted text-muted-foreground animate-pulse">
                      {agent?.avatar || '🤖'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-foreground">
                        {agent?.name || 'System'}
                      </p>
                      <Badge variant="outline" className="text-xs">
                        {agent?.role || 'System Coordinator'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center space-x-1">
                      <span>typing</span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground py-8">
                <div className="text-4xl mb-2">💬</div>
                <p>Agent conversation will appear here during analysis...</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};