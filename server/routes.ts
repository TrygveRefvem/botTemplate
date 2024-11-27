import type { Express } from "express";
import { getElevenLabsConfig, validateConfig } from "../client/src/lib/elevenlabs";
import { calculateLoanPayment, calculateSavings } from "../client/src/lib/bankingCalculations";

export function registerRoutes(app: Express) {
  app.get('/api/config/elevenlabs', (req, res) => {
    const config = getElevenLabsConfig();
    
    if (!validateConfig(config)) {
      return res.status(500).json({
        error: 'Missing ElevenLabs configuration'
      });
    }

    res.json({
      agentId: config.agentId
    });
  });

  app.post('/api/banking/calculate-loan', (req, res) => {
    try {
      const { principal, annualInterestRate, years } = req.body;
      
      if (!principal || !annualInterestRate || !years) {
        return res.status(400).json({
          error: 'Missing required parameters'
        });
      }

      const result = calculateLoanPayment(
        Number(principal),
        Number(annualInterestRate),
        Number(years)
      );

      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to calculate loan payment'
      });
    }
  });

  app.post('/api/banking/calculate-savings', (req, res) => {
    try {
      const { initialAmount, monthlyDeposit, annualInterestRate, years } = req.body;
      
      if (!initialAmount || !monthlyDeposit || !annualInterestRate || !years) {
        return res.status(400).json({
          error: 'Missing required parameters'
        });
      }

      const result = calculateSavings(
        Number(initialAmount),
        Number(monthlyDeposit),
        Number(annualInterestRate),
        Number(years)
      );

      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to calculate savings'
      });
    }
  });
}
