import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { type LoanAnalysisData } from '@/data/techstart-data';

interface LoanRecommendationProps {
  data: LoanAnalysisData;
}

export const LoanRecommendation = ({ data }: LoanRecommendationProps) => {
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

  // Calculated loan terms
  const recommendedRate = 6.2;
  const monthlyPayment = 11600;
  const annualPayment = 139200;
  const originationFee = 2500;
  const debtServiceCoverage = 2.94;

  return (
    <div className="space-y-6">
      {/* Final Decision Header */}
      <Card className="border-success bg-success/5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                <span className="text-2xl text-success-foreground">✓</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-success">LOAN APPROVED</h2>
                <p className="text-success/80">Comprehensive Multi-Agent Analysis Complete</p>
              </div>
            </div>
            <Badge className="bg-success text-success-foreground">
              Strong Approval
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Recommended Terms */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>💰</span>
            <span>Recommended Loan Terms</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{formatCurrency(data.loanRequest.amount)}</p>
              <p className="text-sm text-muted-foreground">Loan Amount</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{formatPercentage(recommendedRate)}</p>
              <p className="text-sm text-muted-foreground">Interest Rate</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{data.loanRequest.requestedTerm} years</p>
              <p className="text-sm text-muted-foreground">Term</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold text-primary">{formatCurrency(monthlyPayment)}</p>
              <p className="text-sm text-muted-foreground">Monthly Payment</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="font-medium">Annual Payment</p>
              <p className="text-lg">{formatCurrency(annualPayment)}</p>
            </div>
            <div>
              <p className="font-medium">Origination Fee</p>
              <p className="text-lg">{formatCurrency(originationFee)}</p>
            </div>
            <div>
              <p className="font-medium">Prepayment Penalty</p>
              <p className="text-lg">None after 24 months</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📊</span>
            <span>Risk Assessment Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Credit Risk</span>
                <Badge variant="outline" className="bg-success/10 text-success">Low-Moderate</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Debt Service Coverage</span>
                <Badge variant="outline" className="bg-success/10 text-success">{debtServiceCoverage} (Excellent)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Collateral Value</span>
                <Badge variant="outline" className="bg-success/10 text-success">{formatCurrency(data.loanRequest.amount)}</Badge>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Industry Risk</span>
                <Badge variant="outline" className="bg-success/10 text-success">Stable Growth</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Relationship Risk</span>
                <Badge variant="outline" className="bg-success/10 text-success">Low</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Analysis Confidence</span>
                <Badge variant="outline" className="bg-success/10 text-success">94%</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📋</span>
            <span>Required Documentation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Security & Guarantees</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Personal guarantees from all LLC members</li>
                <li>• First lien on all CNC equipment</li>
                <li>• UCC-1 financing statements</li>
                <li>• Equipment serial number documentation</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Insurance & Reporting</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Full replacement value insurance</li>
                <li>• Quarterly financial statements</li>
                <li>• Equipment maintenance records</li>
                <li>• Business interruption coverage</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Strategic Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🎯</span>
            <span>Strategic Benefits & Opportunities</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Portfolio Impact</h4>
              <p className="text-sm text-muted-foreground">
                Loan fits within target portfolio ranges and supports strategic equipment financing growth objectives.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Cross-Selling Opportunities</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-medium">Payroll Services</p>
                  <p className="text-sm text-muted-foreground">{formatCurrency(28800)} potential annual revenue</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-medium">Cash Management</p>
                  <p className="text-sm text-muted-foreground">{formatCurrency(8400)} potential annual revenue</p>
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <p className="font-medium">Commercial Credit Card</p>
                  <p className="text-sm text-muted-foreground">{formatCurrency(3600)} potential annual revenue</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Processing Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>⏱️</span>
            <span>Processing Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">1</div>
              <div>
                <p className="font-medium">Documentation Preparation</p>
                <p className="text-sm text-muted-foreground">2 business days</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">2</div>
              <div>
                <p className="font-medium">Underwriting Approval</p>
                <p className="text-sm text-muted-foreground">1 business day</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">3</div>
              <div>
                <p className="font-medium">Closing Coordination</p>
                <p className="text-sm text-muted-foreground">2 business days</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-success/10 rounded-lg">
              <p className="font-medium text-success">Total Processing Time: 5 business days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};