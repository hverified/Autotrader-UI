import { mockDashboardData } from "../api/mockData";
import SummaryCard from "../components/SummaryCard";
import HoldingsList from "../components/HoldingsList";

export default function Dashboard() {
  const { summary, holdings, portfolioHistory } = mockDashboardData;

  const formatCurrency = (num) => `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

        {/* ## Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SummaryCard
            title="Portfolio Value"
            value={formatCurrency(summary.portfolioValue)}
          />
          <SummaryCard
            title="Day's P/L"
            value={formatCurrency(summary.dayPL.amount)}
            changeAmount={summary.dayPL.amount.toFixed(2)}
            changePercent={summary.dayPL.percent.toFixed(2)}
            isProfit={summary.dayPL.amount >= 0}
          />
          <SummaryCard
            title="Total P/L"
            value={formatCurrency(summary.totalPL.amount)}
            changeAmount={summary.totalPL.amount.toFixed(2)}
            changePercent={summary.totalPL.percent.toFixed(2)}
            isProfit={summary.totalPL.amount >= 0}
          />
        </div>

        {/* ## Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Holdings List (takes up 1/3 of the width on large screens) */}
          <div>
            <HoldingsList holdings={holdings} />
          </div>
        </div>
      </div>
    </div>
  );
}