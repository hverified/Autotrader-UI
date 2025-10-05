import React, { useMemo } from "react";

const formatNumber = (num, isCurrency = true) => {
  const options = isCurrency ? { style: 'currency', currency: 'INR' } : {};
  return new Intl.NumberFormat("en-IN", options).format(num);
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const MobileDataPoint = ({ label, value, valueClassName = "" }) => (
  <div className="flex justify-between items-center text-xs py-1.5 border-b border-gray-100 last:border-b-0">
    <span className="text-gray-500">{label}</span>
    <span className={`font-semibold text-gray-800 ${valueClassName}`}>{value}</span>
  </div>
);

export default function StockListItem({ stock, activeTab }) {
  const {
    symbol, stock_name, close, per_chg, volume, shortlisted_date,
    buy_price, quantity, checked_date,
  } = stock;

  // Memoize all calculations for performance
  const stockMetrics = useMemo(() => {
    if (activeTab !== 'bought') {
      return { perChgColor: per_chg >= 0 ? "text-green-600" : "text-red-600" };
    }

    const investedVal = buy_price * quantity;
    const currentVal = close * quantity;
    const totalPnl = currentVal - investedVal;
    const totalPnlPercent = (totalPnl / investedVal) * 100;
    const dayPnl = (currentVal / (1 + per_chg / 100)) * (per_chg / 100);
    
    return {
      investedValue: investedVal,
      currentValue: currentVal,
      totalProfitLoss: totalPnl,
      totalProfitLossPercent: totalPnlPercent,
      dayProfitLoss: dayPnl,
      totalPnlColor: totalPnl >= 0 ? "text-green-600" : "text-red-600",
      dayPnlColor: dayPnl >= 0 ? "text-green-500" : "text-red-500",
    };
  }, [stock, activeTab]);

  const dateToShow = activeTab === 'not_triggered' ? checked_date : shortlisted_date;

  return (
    <div className="hover:bg-gray-50/50 transition-colors duration-200">
      {/* ==================== MOBILE CARD VIEW ==================== */}
      <div className="p-3 md:hidden border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="font-bold text-base text-gray-900">{symbol}</p>
            <p className="text-xs text-gray-500 truncate">{stock_name}</p>
          </div>
        </div>
        
        {activeTab === 'bought' ? (
          <>
            <MobileDataPoint label="Qty" value={quantity} />
            <MobileDataPoint label="Avg. Price" value={formatNumber(buy_price)} />
            <MobileDataPoint label="Invested" value={formatNumber(stockMetrics.investedValue)} />
            <MobileDataPoint label="Current Value" value={formatNumber(stockMetrics.currentValue)} />
            <MobileDataPoint 
              label="Day's P/L" 
              value={`${formatNumber(stockMetrics.dayProfitLoss)} (${per_chg.toFixed(2)}%)`}
              valueClassName={stockMetrics.dayPnlColor} 
            />
            <MobileDataPoint 
              label="Total P/L" 
              value={`${formatNumber(stockMetrics.totalProfitLoss)} (${stockMetrics.totalProfitLossPercent.toFixed(2)}%)`}
              valueClassName={stockMetrics.totalPnlColor} 
            />
          </>
        ) : (
          <>
            <MobileDataPoint label="% Change" value={`${per_chg.toFixed(2)}%`} valueClassName={stockMetrics.perChgColor} />
            <MobileDataPoint label="Close Price" value={formatNumber(close)} />
            <MobileDataPoint label="Volume" value={formatNumber(volume, false)} />
            <MobileDataPoint label="Date" value={formatDate(dateToShow)} />
          </>
        )}
      </div>

      {/* =================== DESKTOP TABLE ROW VIEW =================== */}
      <div className="hidden md:flex items-center p-3 border-t border-gray-200">
        <div className="w-4/12 px-2">
          <p className="font-semibold text-sm text-gray-900 truncate">{symbol}</p>
          <p className="text-xs text-gray-500 truncate">{stock_name}</p>
        </div>

        {activeTab === 'bought' ? (
          <>
            <div className="w-2/12 text-center px-2 text-sm">{quantity}</div>
            <div className="w-2/12 text-center px-2 text-sm">{formatNumber(buy_price)}</div>
            <div className="w-2/12 text-center px-2 text-sm">{formatNumber(close)}</div>
            {/* Combined P/L Column */}
            <div className="w-2/12 text-center px-2 text-sm font-semibold">
              <p className={stockMetrics.totalPnlColor}>{formatNumber(stockMetrics.totalProfitLoss)}</p>
              <p className={`text-xs font-normal ${stockMetrics.dayPnlColor}`}>
                ({formatNumber(stockMetrics.dayProfitLoss)})
              </p>
            </div>
          </>
        ) : (
          <>
            <div className={`w-2/12 text-center px-2 font-semibold text-sm ${stockMetrics.perChgColor}`}>{per_chg.toFixed(2)}%</div>
            <div className="w-2/12 text-center px-2 text-sm">{formatNumber(close)}</div>
            <div className="w-2/12 text-center px-2 text-sm">{formatNumber(volume, false)}</div>
            <div className="w-2/12 text-center px-2 text-sm">{formatDate(dateToShow)}</div>
          </>
        )}
      </div>
    </div>
  );
}