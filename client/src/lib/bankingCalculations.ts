// Banking calculation functions

interface LoanCalculationResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

interface SavingsCalculationResult {
  finalAmount: number;
  totalInterest: number;
  monthlyInterest: number;
}

export const calculateLoanPayment = (
  principal: number,
  annualInterestRate: number,
  years: number
): LoanCalculationResult => {
  const monthlyRate = annualInterestRate / 12 / 100;
  const numberOfPayments = years * 12;
  
  const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;

  return {
    monthlyPayment: Number(monthlyPayment.toFixed(2)),
    totalPayment: Number(totalPayment.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2))
  };
};

export const calculateSavings = (
  initialAmount: number,
  monthlyDeposit: number,
  annualInterestRate: number,
  years: number
): SavingsCalculationResult => {
  const monthlyRate = annualInterestRate / 12 / 100;
  const numberOfMonths = years * 12;
  
  let finalAmount = initialAmount;
  let totalInterest = 0;
  
  for (let i = 0; i < numberOfMonths; i++) {
    const monthlyInterest = finalAmount * monthlyRate;
    totalInterest += monthlyInterest;
    finalAmount += monthlyDeposit + monthlyInterest;
  }
  
  const monthlyInterest = (totalInterest / numberOfMonths);
  
  return {
    finalAmount: Number(finalAmount.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    monthlyInterest: Number(monthlyInterest.toFixed(2))
  };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};
