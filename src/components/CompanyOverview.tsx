import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { type LoanAnalysisData } from '@/data/techstart-data';

interface CompanyOverviewProps {
  data: LoanAnalysisData;
}

export const CompanyOverview = ({ data }: CompanyOverviewProps) => {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>🏭</span>
            <span>Company Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h3 className="font-bold text-lg text-primary">{data.company.name}</h3>
            <p className="text-sm text-muted-foreground">{data.company.industry}</p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Location</span>
              <span className="text-sm font-medium">{data.company.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Years in Business</span>
              <Badge variant="outline">{data.company.yearsInBusiness} years</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Employees</span>
              <span className="text-sm font-medium">{data.company.employees}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Business Type</span>
              <span className="text-sm font-medium">{data.company.businessType}</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm font-medium mb-1">Primary Products</p>
            <p className="text-xs text-muted-foreground">{data.company.primaryProducts}</p>
          </div>
        </CardContent>
      </Card>

      {/* Financial Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>💰</span>
            <span>Financial Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <p className="text-lg font-bold text-success">{formatCurrency(data.financials.annualRevenue)}</p>
              <p className="text-xs text-muted-foreground">Annual Revenue</p>
            </div>
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <p className="text-lg font-bold text-primary">{data.financials.creditScore}</p>
              <p className="text-xs text-muted-foreground">Credit Score</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Net Income</span>
              <span className="text-sm font-medium">{formatCurrency(data.financials.netIncome)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Current Ratio</span>
              <Badge variant="outline" className="bg-success/10 text-success">
                {data.financials.currentRatio.toFixed(2)}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Debt-to-Equity</span>
              <Badge variant="outline" className="bg-success/10 text-success">
                {data.financials.debtToEquityRatio.toFixed(2)}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Operating Cash Flow</span>
              <span className="text-sm font-medium">{formatCurrency(data.financials.operatingCashFlow)}</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm font-medium mb-2">Revenue Growth Trend</p>
            <div className="space-y-1">
              {data.financials.revenueGrowth.slice(0, 3).map((item, index) => (
                <div key={item.year} className="flex justify-between text-xs">
                  <span>{item.year}</span>
                  <div className="flex items-center space-x-2">
                    <span>{formatCurrency(item.revenue)}</span>
                    {item.growth && (
                      <Badge variant="outline" className="text-xs bg-success/10 text-success">
                        +{item.growth}%
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loan Request Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>📋</span>
            <span>Loan Request</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-center p-4 bg-accent/10 rounded-lg">
            <p className="text-2xl font-bold text-accent">{formatCurrency(data.loanRequest.amount)}</p>
            <p className="text-sm text-muted-foreground">Requested Amount</p>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Purpose</span>
              <span className="text-sm font-medium">Equipment Financing</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Term</span>
              <Badge variant="outline">{data.loanRequest.requestedTerm} years</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Down Payment</span>
              <span className="text-sm font-medium">{formatCurrency(data.loanRequest.downPayment)}</span>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm font-medium mb-2">Equipment Details</p>
            <div className="space-y-1">
              {data.loanRequest.equipmentDetails.map((item, index) => (
                <div key={index} className="flex justify-between text-xs">
                  <span className="truncate flex-1 pr-2">{item.item}</span>
                  <span className="font-medium">{formatCurrency(item.cost)}</span>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm font-medium mb-1">Equipment Specifications</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>• {data.loanRequest.equipmentSpecs.type}</p>
              <p>• Expected Life: {data.loanRequest.equipmentSpecs.expectedLife} years</p>
              <p>• Warranty: {data.loanRequest.equipmentSpecs.warranty} years</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};