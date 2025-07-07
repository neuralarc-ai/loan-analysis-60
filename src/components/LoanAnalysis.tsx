import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { techStartData, agents, type Agent } from '@/data/techstart-data';
import { AgentConversation } from './AgentConversation';
import { LoanRecommendation } from './LoanRecommendation';
import { CompanyOverview } from './CompanyOverview';

interface AnalysisStage {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  active: boolean;
  agents: string[];
}

const analysisStages: AnalysisStage[] = [
  {
    id: 'initiation',
    name: 'Analysis Initiation',
    description: 'System orchestrator activating multi-agent analysis team',
    completed: false,
    active: false,
    agents: ['system']
  },
  {
    id: 'risk-assessment',
    name: 'Risk Assessment',
    description: 'Credit risk and financial analysis',
    completed: false,
    active: false,
    agents: ['robert', 'elena']
  },
  {
    id: 'legal-compliance',
    name: 'Legal & Compliance Review',
    description: 'Regulatory requirements and documentation review',
    completed: false,
    active: false,
    agents: ['lisa', 'matthew']
  },
  {
    id: 'market-analysis',
    name: 'Market Intelligence',
    description: 'Competitive analysis and pricing recommendations',
    completed: false,
    active: false,
    agents: ['marcus']
  },
  {
    id: 'strategy-review',
    name: 'Strategic Assessment',
    description: 'Portfolio fit and product alignment',
    completed: false,
    active: false,
    agents: ['victoria']
  },
  {
    id: 'final-recommendation',
    name: 'Final Recommendation',
    description: 'Comprehensive loan decision and terms',
    completed: false,
    active: false,
    agents: ['system']
  }
];

export const LoanAnalysis = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [stages, setStages] = useState(analysisStages);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [conversationMessages, setConversationMessages] = useState<any[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [phase, setPhase] = useState<'input' | 'dashboard' | 'analysis' | 'approved'>('input');
  const [userInput, setUserInput] = useState('');
  const [approvalNumber, setApprovalNumber] = useState('');

  const samplePrompt = "I need $850,000 for equipment financing for my manufacturing company TechStart Manufacturing. We've been in business for 5 years with $3.2M annual revenue and want to purchase new CNC machines. Our credit score is 742 and we have strong cash flow. This is for expanding our precision manufacturing capabilities in the aerospace and automotive sectors.";

  const handleSubmitRequest = () => {
    if (userInput.trim()) {
      setPhase('dashboard');
    }
  };

  const startAnalysis = () => {
    // Generate approval number
    const approvalNum = `LA-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
    setApprovalNumber(approvalNum);
    
    setIsAnalyzing(true);
    setCurrentStage(0);
    setShowRecommendation(false);
    setConversationMessages([]);
    setDialogOpen(true);
    setPhase('analysis');
    
    // Reset stages
    const resetStages = stages.map(stage => ({
      ...stage,
      completed: false,
      active: false
    }));
    setStages(resetStages);
    
    // Start first stage
    processStage(0);
  };

  const processStage = (stageIndex: number) => {
    const updatedStages = [...stages];
    updatedStages[stageIndex].active = true;
    setStages(updatedStages);
    
    // Simulate analysis time
    setTimeout(() => {
      updatedStages[stageIndex].completed = true;
      updatedStages[stageIndex].active = false;
      setStages([...updatedStages]);
      
      if (stageIndex < stages.length - 1) {
        setCurrentStage(stageIndex + 1);
        setTimeout(() => processStage(stageIndex + 1), 1000);
      } else {
        setIsAnalyzing(false);
        setShowRecommendation(true);
      }
    }, 2000 + Math.random() * 3000); // Random delay between 2-5 seconds
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setIsAnalyzing(false);
    setShowRecommendation(false);
    setCurrentStage(0);
    setPhase('approved');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const completedStages = stages.filter(stage => stage.completed).length;
  const progressPercentage = (completedStages / stages.length) * 100;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-2xl text-primary-foreground">🏦</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Commercial Loan Analysis System</h1>
              <p className="text-muted-foreground">Multi-Agent Banking Intelligence Platform</p>
            </div>
          </div>
        </div>

        {/* Chat Input Phase */}
        {phase === 'input' && (
          <>
            <Card className="max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">
                  <span className="text-2xl">💬</span>
                  <span className="ml-2">Tell us about your loan application</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-muted-foreground text-center">
                    Describe your loan requirements, business details, and financing needs. Our AI-powered system will analyze your request.
                  </p>
                </div>
                <div className="space-y-4">
                  <Textarea
                    placeholder="Example: I need $850,000 for equipment financing for my manufacturing company TechStart Manufacturing. We've been in business for 5 years with $3.2M annual revenue and want to purchase new CNC machines..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="min-h-32"
                  />
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleSubmitRequest} 
                      disabled={!userInput.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Submit Request
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Prompt */}
            <Card className="max-w-4xl mx-auto bg-muted/30">
              <CardHeader>
                <CardTitle className="text-center text-lg">
                  <span className="text-xl">📄</span>
                  <span className="ml-2">Sample Loan Request</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background p-4 rounded-lg border">
                  <p className="text-sm text-muted-foreground italic">
                    {samplePrompt}
                  </p>
                </div>
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    onClick={() => setUserInput(samplePrompt)}
                    className="text-sm"
                  >
                    Copy Sample to Chat Box
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Approved Phase */}
        {phase === 'approved' && (
          <>
            {/* Approval Header */}
            <Card className="max-w-4xl mx-auto border-success bg-success/5">
              <CardHeader>
                <CardTitle className="text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
                      <span className="text-3xl text-success-foreground">✓</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-success">LOAN APPROVED</h2>
                      <p className="text-success/80 text-lg">Analysis Complete</p>
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="bg-background p-6 rounded-lg">
                  <div className="space-y-2">
                    <p className="text-lg font-semibold">Approval Reference Number</p>
                    <p className="text-2xl font-mono font-bold text-primary">{approvalNumber}</p>
                    <p className="text-sm text-muted-foreground">Please save this number for future reference</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-2xl font-bold text-primary">{formatCurrency(techStartData.loanRequest.amount)}</p>
                    <p className="text-sm text-muted-foreground">Approved Amount</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-2xl font-bold text-primary">6.2%</p>
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                  </div>
                  <div className="text-center p-4 bg-background rounded-lg">
                    <p className="text-2xl font-bold text-primary">7 years</p>
                    <p className="text-sm text-muted-foreground">Term</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="bg-background p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Next Steps:</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 text-left">
                      <li>• Documentation preparation will begin within 2 business days</li>
                      <li>• You will receive loan documents via email within 5 business days</li>
                      <li>• Equipment purchase can proceed upon document signing</li>
                      <li>• Funds will be disbursed directly to equipment vendor</li>
                    </ul>
                  </div>
                </div>

                <div className="flex justify-center space-x-4 mt-6">
                  <Button 
                    onClick={() => {
                      setPhase('input');
                      setUserInput('');
                      setApprovalNumber('');
                    }}
                    className="bg-primary hover:bg-primary/90"
                  >
                    New Loan Application
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.print()}
                  >
                    Print Approval
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Dashboard Confirmation Phase */}
        {phase === 'dashboard' && (
          <>
            {/* User Request Summary */}
            <Card className="bg-accent/5 border-accent">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>📝</span>
                  <span>Your Request</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm whitespace-pre-wrap">{userInput}</p>
              </CardContent>
            </Card>

            {/* Analysis Preview */}
            <Card className="bg-primary/5 border-primary">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>🔍</span>
                  <span>Analysis Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Based on your request, we've identified this as a commercial equipment financing application. 
                  Our system will analyze the following case study that matches your requirements:
                </p>
              </CardContent>
            </Card>

            {/* Company Overview */}
            <CompanyOverview data={techStartData} />

            {/* Analysis Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Ready to Analyze?</span>
                  <Badge variant="secondary">Confirmed</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Loan Amount: {formatCurrency(techStartData.loanRequest.amount)}</p>
                    <p className="text-sm text-muted-foreground">Equipment Financing - 7 Year Term</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setPhase('input')} 
                      variant="outline"
                    >
                      Edit Request
                    </Button>
                    <Button 
                      onClick={startAnalysis} 
                      disabled={isAnalyzing}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Start Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Analysis Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <span>🔍</span>
                <span>Multi-Agent Loan Analysis</span>
                <Badge variant={isAnalyzing ? "default" : showRecommendation ? "secondary" : "outline"}>
                  {isAnalyzing ? "Analyzing..." : showRecommendation ? "Complete" : "Ready"}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 flex-1 overflow-hidden flex flex-col">
              {/* Progress Indicator */}
              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Analysis Progress</span>
                    <span className="text-sm text-muted-foreground">{completedStages}/{stages.length} stages complete</span>
                  </div>
                  <Progress value={progressPercentage} className="w-full" />
                </div>
              )}

              {/* Analysis Stages */}
              {isAnalyzing && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {stages.map((stage, index) => (
                    <Card key={stage.id} className={`transition-all duration-300 ${
                      stage.active ? 'ring-2 ring-primary shadow-lg' : 
                      stage.completed ? 'bg-success/5 border-success' : 'opacity-60'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            stage.completed ? 'bg-success text-success-foreground' :
                            stage.active ? 'bg-primary text-primary-foreground animate-pulse' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {stage.completed ? '✓' : index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{stage.name}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{stage.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {stage.agents.map(agentId => {
                                const agent = agents.find(a => a.id === agentId);
                                return (
                                  <Badge key={agentId} variant="outline" className="text-xs">
                                    {agent?.name || 'System'}
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Agent Conversation */}
              {isAnalyzing && <AgentConversation currentStage={currentStage} />}

              {/* Final Recommendation */}
              {showRecommendation && (
                <div className="space-y-4">
                  <LoanRecommendation data={techStartData} />
                  <div className="flex justify-end">
                    <Button onClick={closeDialog} variant="outline">
                      Close Analysis
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};