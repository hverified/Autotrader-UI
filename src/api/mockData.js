// src/api/mockData.js

export const mockDashboardData = {
  summary: {
    portfolioValue: 185650.75,
    dayPL: {
      amount: 1250.30,
      percent: 0.68,
    },
    totalPL: {
      amount: 15650.75,
      percent: 9.21,
    },
  },
  holdings: [
    { id: 'h1', symbol: 'RELIANCE', quantity: 20, avgPrice: 2800.00, ltp: 2850.50 },
    { id: 'h2', symbol: 'TCS', quantity: 30, avgPrice: 3850.00, ltp: 3820.00 },
    { id: 'h3', symbol: 'HDFCBANK', quantity: 50, avgPrice: 1500.00, ltp: 1540.75 },
    { id: 'h4', symbol: 'INFY', quantity: 40, avgPrice: 1480.25, ltp: 1515.00 },
  ],
  recentActivity: [
    { id: 'a1', type: 'Buy', symbol: 'INFY', quantity: 40, date: '2025-10-03' },
    { id: 'a2', type: 'Sell', symbol: 'WIPRO', quantity: 100, date: '2025-10-01' },
    { id: 'a3', type: 'Buy', symbol: 'HDFCBANK', quantity: 50, date: '2025-09-28' },
  ],
  // Data for the portfolio chart (e.g., value over last 7 days)
  portfolioHistory: [168000, 171000, 170500, 175000, 178000, 184400, 185650],
};