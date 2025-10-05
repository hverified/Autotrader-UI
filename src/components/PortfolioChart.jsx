// src/components/PortfolioChart.jsx
export default function PortfolioChart({ data }) {
  const maxValue = Math.max(...data);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (value / maxValue) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance</h3>
      <div className="w-full h-64">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="#4f46e5"
            strokeWidth="2"
            points={points}
          />
        </svg>
      </div>
    </div>
  );
}