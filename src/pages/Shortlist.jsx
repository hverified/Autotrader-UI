import { useEffect, useState } from "react";
import { getStocks, updateShortlist, buyStockAPI, markNotTriggeredAPI } from "../api/stocks";
import { getNiftyData } from "../api/market";
import StockListItem from "../components/StockListItem";
import Tabs from "../components/Tabs";
import ConfirmModal from "../components/ConfirmModal";
import Spinner from "../components/Spinner";
import NiftyCard from "../components/NiftyCard";
import { Play, TrendingUp, RefreshCw, Sparkles, BarChart3 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function Shortlist() {
  const [data, setData] = useState({});
  const [nifty, setNifty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("shortlisted");

  const tabs = ["shortlisted", "bought", "not_triggered", "to_sell", "sold"];

  // Fetch all stocks
  const fetchStocks = async () => {
    setLoading(true);
    try {
      const res = await getStocks();
      setData(res || {});
    } catch (err) {
      console.error("Error fetching stocks:", err);
      toast.error("Failed to fetch stocks");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Nifty data
  const fetchNifty = async () => {
    try {
      const res = await getNiftyData();
      setNifty(res);
    } catch (err) {
      console.error("Error fetching Nifty data:", err);
      toast.error("Failed to fetch Nifty data");
    }
  };

  // Run shortlist job
  const handleConfirmUpdate = async () => {
    setConfirmVisible(false);
    setRefreshing(true);
    try {
      await updateShortlist();
      toast.success("Shortlist updated successfully");
      await fetchStocks();
    } catch (err) {
      console.error("Error updating shortlist:", err);
      toast.error("Failed to update shortlist");
    } finally {
      setRefreshing(false);
    }
  };

  // Handle buying a stock
  const handleBuyStock = async (symbol) => {
    try {
      const res = await buyStockAPI(symbol);
      const data = res?.data || res;
      if (data?.success) toast.success(`${symbol} bought successfully`);
      else toast.error(data?.message || `Failed to buy ${symbol}`);
      await fetchStocks();
    } catch (err) {
      console.error("Error buying stock:", err);
      toast.error(`Error buying ${symbol}`);
    }
  };

  // Handle marking a stock as not_triggered
  const handleMarkNotTriggered = async (symbol) => {
    try {
      const res = await markNotTriggeredAPI(symbol);
      const data = res?.data || res;
      if (data?.success) toast.success(`${symbol} marked as not_triggered`);
      else toast.error(data?.message || `Failed to update ${symbol}`);
      await fetchStocks();
    } catch (err) {
      console.error("Error marking not_triggered:", err);
      toast.error(`Error marking ${symbol}`);
    }
  };

  useEffect(() => {
    fetchStocks();
    fetchNifty();
  }, []);

  // Sort stocks by date depending on tab
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
    <div className="pb-16 sm:pb-0 p-4 sm:p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 min-h-screen">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
                <BarChart3 size={28} className="text-white" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                My Watchlist
              </h1>
            </div>
            <p className="text-sm sm:text-base text-slate-600 flex items-center gap-2 ml-1">
              <Sparkles size={16} className="text-amber-500" />
              Track and manage your trading portfolio
            </p>
          </div>
          <button
            onClick={() => setConfirmVisible(true)}
            className="hidden sm:flex group px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            disabled={refreshing}
            style={{
              backgroundSize: '200% 100%',
              backgroundPosition: refreshing ? '100% 0' : '0 0'
            }}
          >
            <RefreshCw
              size={18}
              className={`${refreshing ? "animate-spin" : "group-hover:rotate-180"} transition-transform duration-500`}
            />
            {refreshing ? "Updating..." : "Run Shortlist Job"}
          </button>
        </div>

        {/* Nifty Card */}
        <div className="mb-6">
          <NiftyCard nifty={nifty} />
        </div>

        {/* Tabs & Stock List */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="px-2 sm:px-4 pt-3 pb-1 bg-gradient-to-r from-slate-50 via-blue-50/40 to-slate-50">
            <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          </div>

          {loading ? (
            <div className="p-20">
              <Spinner />
            </div>
          ) : (
            <>
              {/* Table Header - Desktop */}
              <div className="hidden md:flex items-center px-6 py-4 bg-gradient-to-r from-slate-50/80 via-blue-50/60 to-slate-50/80 border-y border-slate-200/60 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <div className="w-4/12 px-2">Stock</div>
                {(
                  activeTab === "bought"
                    ? ["Quantity", "Buy Price", "Last Price", "P/L", "Actions"]
                    : ["% Change", "Close Price", "Volume", "Date", "Actions"]
                ).map((header) => (
                  <div key={header} className="w-2/12 text-center px-2">
                    {header}
                  </div>
                ))}
              </div>

              {/* Stock List */}
              <div className="divide-y divide-slate-100">
                {sortedStocks.length > 0 ? (
                  sortedStocks.map((stock) => (
                    <StockListItem
                      key={stock._id}
                      stock={stock}
                      activeTab={activeTab}
                      onBuy={handleBuyStock}
                      onMarkNotTriggered={handleMarkNotTriggered}
                    />
                  ))
                ) : (
                  <div className="text-center py-24 px-4">
                    <div className="inline-flex p-4 bg-gradient-to-br from-slate-100 to-blue-50 rounded-2xl mb-4">
                      <TrendingUp size={48} className="text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-semibold text-lg mb-2">
                      No stocks in this category
                    </p>
                    <p className="text-slate-500 text-sm max-w-md mx-auto">
                      {activeTab === "shortlisted"
                        ? "Run the shortlist job to discover new trading opportunities"
                        : "Stocks will appear here based on your trading activity"}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Floating Action Button - Mobile */}
      <button
        onClick={() => setConfirmVisible(true)}
        disabled={refreshing}
        className="sm:hidden fixed bottom-20 right-5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/50 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {refreshing ? (
          <RefreshCw size={24} className="animate-spin" />
        ) : (
          <Play size={24} />
        )}
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