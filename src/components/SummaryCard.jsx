// src/components/SummaryCard.jsx
export default function SummaryCard({ title, value, changeAmount, changePercent, isProfit }) {
  const changeColor = isProfit ? "text-green-500" : "text-red-500";
  const changeSymbol = isProfit ? '▲' : '▼';

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      {changeAmount !== undefined && (
        <div className={`flex items-center mt-2 text-sm font-semibold ${changeColor}`}>
          <span>{changeSymbol} {changeAmount}</span>
          <span className="ml-2">({changePercent}%)</span>
        </div>
      )}
    </div>
  );
}