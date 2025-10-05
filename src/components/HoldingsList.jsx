// src/components/HoldingsList.jsx
const HoldingItem = ({ symbol, quantity, ltp, totalPnl, isProfit }) => (
  <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
    <div>
      <p className="font-semibold text-gray-900">{symbol}</p>
      <p className="text-xs text-gray-500">Qty: {quantity}</p>
    </div>
    <div className="text-right">
      <p className="font-semibold text-gray-800">₹{ltp.toLocaleString('en-IN')}</p>
      <p className={`text-xs font-medium ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
        P/L: ₹{totalPnl.toLocaleString('en-IN')}
      </p>
    </div>
  </div>
);

export default function HoldingsList({ holdings }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Current Holdings</h3>
      <div>
        {holdings.map(holding => {
          const pnl = (holding.ltp - holding.avgPrice) * holding.quantity;
          return (
            <HoldingItem
              key={holding.id}
              symbol={holding.symbol}
              quantity={holding.quantity}
              ltp={holding.ltp}
              totalPnl={pnl}
              isProfit={pnl >= 0}
            />
          );
        })}
      </div>
    </div>
  );
}