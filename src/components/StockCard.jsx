export default function StockCard({ stock }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{stock.stock_name}</h3>
      <p className="text-sm text-gray-500">{stock.symbol}</p>
      <div className="mt-2 text-sm">
        <p>Price: ₹{stock.close}</p>
        <p>Change: {stock.per_chg}%</p>
        <p>Volume: {stock.volume.toLocaleString()}</p>
        <p>Status: <span className="font-medium capitalize">{stock.status}</span></p>
      </div>
    </div>
  );
}
