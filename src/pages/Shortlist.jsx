import { useEffect, useState } from "react";
import { getStocks, updateShortlist } from "../api/stocks";
import StockListItem from "../components/StockListItem";
import Tabs from "../components/Tabs";

const Spinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ListHeader = ({ activeTab }) => {
  const getHeaders = () => {
    switch (activeTab) {
      case "bought":
        return ["Quantity", "Buy Price", "Last Price", "P/L"];
      default:
        return ["% Change", "Close Price", "Volume", "Date"];
    }
  };
  const headers = getHeaders();

  return (
    <div className="hidden md:flex items-center p-4 bg-gray-50 border-b border-t border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
      <div className="w-4/12 px-2">Stock</div>
      {headers.map((header) => (
        <div key={header} className="w-2/12 text-center px-2">
          {header}
        </div>
      ))}
    </div>
  );
};

const getSortDateKey = (tab) => {
  switch (tab) {
    case 'bought': return 'buy_date';
    case 'sold': return 'sell_date';
    case 'not_triggered': return 'checked_date';
    default: return 'shortlisted_date';
  }
};

export default function Shortlist() {
  const [data, setData] = useState({});
  const [activeTab, setActiveTab] = useState("shortlisted");
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const tabs = ["shortlisted", "bought", "not_triggered", "to_sell", "sold"];

  const fetchStocks = async () => {
    setLoading(true);
    try {
      const res = await getStocks(true);
      setData(res || {});
    } catch (err) {
      console.error(err);
      setData({});
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateShortlist = async () => {
    setRefreshing(true);
    try {
      // await updateShortlist();
      await fetchStocks();
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const sortedStocks = [...(data[activeTab] || [])].sort((a, b) => {
    const dateKey = getSortDateKey(activeTab);
    const dateA = a[dateKey] ? new Date(a[dateKey]) : 0;
    const dateB = b[dateKey] ? new Date(b[dateKey]) : 0;
    return dateB - dateA;
  });

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">My Watchlist</h1>
          <button
            onClick={handleUpdateShortlist}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
            disabled={refreshing}
          >
            {refreshing ? "Updating..." : "Refresh Watchlist"}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 sm:px-6 pt-2">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>

          <div>
            {loading ? (
              <div className="p-20"><Spinner /></div>
            ) : (
              <>
                <ListHeader activeTab={activeTab} />
                <div>
                  {sortedStocks.length > 0 ? (
                    sortedStocks.map((stock) => (
                      <StockListItem
                        key={stock._id}
                        stock={stock}
                        activeTab={activeTab}
                      />
                    ))
                  ) : (
                    <p className="text-center text-gray-500 py-20">
                      No stocks in this category.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}