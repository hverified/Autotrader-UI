import { useEffect, useState } from "react";
import { getStocks, updateShortlist } from "../api/stocks";
import { getNiftyData } from "../api/market";
import StockListItem from "../components/StockListItem";
import Tabs from "../components/Tabs";
import ConfirmModal from "../components/ConfirmModal";
import Spinner from "../components/Spinner";
import NiftyCard from "../components/NiftyCard";
import { Play } from "lucide-react";

export default function Shortlist() {
  const [data, setData] = useState({});
  const [nifty, setNifty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("shortlisted");

  const tabs = ["shortlisted", "bought", "not_triggered", "to_sell", "sold"];

  const fetchStocks = async () => {
    setLoading(true);
    try {
      const res = await getStocks();
      setData(res || {});
    } catch (err) {
      console.error("Error fetching stocks:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchNifty = async () => {
    try {
      const res = await getNiftyData();
      setNifty(res);
    } catch (err) {
      console.error("Error fetching Nifty data:", err);
    }
  };

  const handleConfirmUpdate = async () => {
    setConfirmVisible(false);
    setRefreshing(true);
    try {
      await updateShortlist();
      await fetchStocks();
    } catch (err) {
      console.error("Error updating shortlist:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStocks();
    fetchNifty();
  }, []);

  const sortedStocks = [...(data[activeTab] || [])].sort((a, b) => {
    const keyMap = {
      bought: "buy_date",
      sold: "sell_date",
      not_triggered: "checked_date",
      shortlisted: "shortlisted_date",
      to_sell: "sell_signal_date",
    };
    const key = keyMap[activeTab] || "shortlisted_date";
    return new Date(b[key] || 0) - new Date(a[key] || 0);
  });

  return (
    <div className="pb-16 sm:pb-0 p-4 sm:p-6 bg-gray-50 min-h-screen transition-all">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="hidden sm:flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Watchlist</h1>
          <button
            onClick={() => setConfirmVisible(true)}
            className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition-all"
            disabled={refreshing}
          >
            {refreshing ? "Updating..." : "Run Shortlist Job"}
          </button>
        </div>

        {/* 🔹 Nifty Info Card */}
        <NiftyCard nifty={nifty} />

        {/* 🔹 Tabs & Stock List */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
          <div className="px-2 sm:px-4 pt-2 bg-gray-50">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>

          {loading ? (
            <div className="p-20">
              <Spinner />
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="hidden md:flex items-center p-4 bg-gray-50 border-y border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <div className="w-4/12 px-2">Stock</div>
                {(
                  activeTab === "bought"
                    ? ["Quantity", "Buy Price", "Last Price", "P/L"]
                    : ["% Change", "Close Price", "Volume", "Date"]
                ).map((header) => (
                  <div key={header} className="w-2/12 text-center px-2">
                    {header}
                  </div>
                ))}
              </div>

              {/* Stock List */}
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

      {/* Floating Action Button */}
      <button
        onClick={() => setConfirmVisible(true)}
        disabled={refreshing}
        className="sm:hidden fixed bottom-20 right-5 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg active:scale-95 transition-transform"
      >
        <Play size={24} />
      </button>

      {confirmVisible && (
        <ConfirmModal
          title="Run Shortlist Job?"
          message="This will update your shortlisted stocks. Continue?"
          onConfirm={handleConfirmUpdate}
          onCancel={() => setConfirmVisible(false)}
        />
      )}
    </div>
  );
}
