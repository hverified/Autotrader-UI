import { useEffect, useState } from "react";
import { getLogs, getLogLevels, clearLogs, getRecentLogs } from "../api/logs";
import Tabs from "../components/Tabs";
import ConfirmModal from "../components/ConfirmModal";
import Spinner from "../components/Spinner";
import { RefreshCw, Trash2, Download, Activity, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function Logs() {
    const [logs, setLogs] = useState([]);
    const [logStats, setLogStats] = useState({});
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const [limit, setLimit] = useState(100);
    const [timeFilter, setTimeFilter] = useState(null);

    const tabs = ["all", "INFO", "ERROR", "WARNING", "DEBUG"];

    // Fetch logs
    const fetchLogs = async () => {
        setLoading(true);
        try {
            let res;
            if (timeFilter) {
                res = await getRecentLogs(timeFilter);
            } else if (activeTab === "all") {
                res = await getLogs(limit);
            } else {
                res = await getLogs(limit, activeTab);
            }
            setLogs(res?.logs || []);
        } catch (err) {
            console.error("Error fetching logs:", err);
            toast.error("Failed to fetch logs");
        } finally {
            setLoading(false);
        }
    };

    // Fetch log statistics
    const fetchLogStats = async () => {
        try {
            const res = await getLogLevels();
            setLogStats(res?.levels || {});
        } catch (err) {
            console.error("Error fetching log stats:", err);
        }
    };

    // Handle clear logs
    const handleConfirmClear = async () => {
        setConfirmVisible(false);
        setRefreshing(true);
        try {
            await clearLogs();
            toast.success("Logs cleared successfully");
            await fetchLogs();
            await fetchLogStats();
        } catch (err) {
            console.error("Error clearing logs:", err);
            toast.error("Failed to clear logs");
        } finally {
            setRefreshing(false);
        }
    };

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchLogs();
        await fetchLogStats();
        setRefreshing(false);
        toast.success("Logs refreshed");
    };

    // Handle download logs
    const handleDownload = () => {
        const logText = logs
            .map((log) => `${log.timestamp} [${log.level}]: ${log.message}`)
            .join("\n");
        const blob = new Blob([logText], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `logs_${new Date().toISOString().split("T")[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Logs downloaded");
    };

    useEffect(() => {
        fetchLogs();
        fetchLogStats();
    }, [activeTab, limit, timeFilter]);

    // Get badge color based on log level
    const getLevelColor = (level) => {
        const colors = {
            INFO: "bg-blue-50 text-blue-700 border border-blue-200",
            ERROR: "bg-red-50 text-red-700 border border-red-200",
            WARNING: "bg-amber-50 text-amber-700 border border-amber-200",
            DEBUG: "bg-gray-50 text-gray-700 border border-gray-200",
        };
        return colors[level] || "bg-gray-50 text-gray-700 border border-gray-200";
    };

    const getLevelIcon = (level) => {
        const icons = {
            INFO: <Info size={12} />,
            ERROR: <AlertCircle size={12} />,
            WARNING: <AlertTriangle size={12} />,
            DEBUG: <Activity size={12} />,
        };
        return icons[level] || <Activity size={12} />;
    };

    return (
        <div className="pb-16 sm:pb-0 p-4 sm:p-6 bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 min-h-screen transition-all">
            <Toaster position="top-right" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                            Application Logs
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
                            <Activity size={16} className="text-blue-500" />
                            Monitor system activity and errors in real-time
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={handleRefresh}
                            className="group px-4 py-2.5 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:bg-white hover:border-gray-300 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={refreshing}
                        >
                            <RefreshCw size={16} className={`${refreshing ? "animate-spin" : ""} group-hover:text-blue-600 transition-colors`} />
                            <span className="hidden sm:inline">Refresh</span>
                        </button>
                        <button
                            onClick={handleDownload}
                            className="group px-4 py-2.5 text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:bg-white hover:border-gray-300 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={logs.length === 0}
                        >
                            <Download size={16} className="group-hover:text-green-600 transition-colors" />
                            <span className="hidden sm:inline">Download</span>
                        </button>
                        <button
                            onClick={() => setConfirmVisible(true)}
                            className="group px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-500 rounded-xl shadow-md hover:shadow-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                            disabled={refreshing}
                        >
                            <Trash2 size={16} />
                            <span className="hidden sm:inline">Clear</span>
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md p-4 sm:p-5 border border-gray-100 hover:border-gray-200 transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Total
                            </p>
                            <Activity size={18} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                            {Object.values(logStats).reduce((a, b) => a + b, 0) || 0}
                        </p>
                    </div>
                    <div className="group bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-sm hover:shadow-md p-4 sm:p-5 border border-blue-100 hover:border-blue-200 transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                                Info
                            </p>
                            <Info size={18} className="text-blue-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                            {logStats.INFO || 0}
                        </p>
                    </div>
                    <div className="group bg-gradient-to-br from-red-50 to-white rounded-2xl shadow-sm hover:shadow-md p-4 sm:p-5 border border-red-100 hover:border-red-200 transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold text-red-600 uppercase tracking-wider">
                                Errors
                            </p>
                            <AlertCircle size={18} className="text-red-400 group-hover:text-red-600 transition-colors" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-red-600">
                            {logStats.ERROR || 0}
                        </p>
                    </div>
                    <div className="group bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-sm hover:shadow-md p-4 sm:p-5 border border-amber-100 hover:border-amber-200 transition-all duration-200">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">
                                Warnings
                            </p>
                            <AlertTriangle size={18} className="text-amber-400 group-hover:text-amber-600 transition-colors" />
                        </div>
                        <p className="text-2xl sm:text-3xl font-bold text-amber-600">
                            {logStats.WARNING || 0}
                        </p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-4 sm:p-5 mb-6 border border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                                Time Filter
                            </label>
                            <select
                                value={timeFilter || ""}
                                onChange={(e) =>
                                    setTimeFilter(e.target.value ? parseInt(e.target.value) : null)
                                }
                                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white hover:border-gray-300 transition-all"
                            >
                                <option value="">All Time</option>
                                <option value="15">Last 15 minutes</option>
                                <option value="30">Last 30 minutes</option>
                                <option value="60">Last 1 hour</option>
                                <option value="360">Last 6 hours</option>
                                <option value="1440">Last 24 hours</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wider">
                                Log Limit
                            </label>
                            <select
                                value={limit}
                                onChange={(e) => setLimit(parseInt(e.target.value))}
                                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white hover:border-gray-300 transition-all"
                            >
                                <option value="50">50 logs</option>
                                <option value="100">100 logs</option>
                                <option value="250">250 logs</option>
                                <option value="500">500 logs</option>
                                <option value="1000">1000 logs</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Logs Table */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-gray-100">
                    <div className="px-2 sm:px-4 pt-2 bg-gray-50/50">
                        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
                    </div>

                    {loading ? (
                        <div className="p-20">
                            <Spinner />
                        </div>
                    ) : (
                        <>
                            {/* Table Header - Desktop */}
                            <div className="hidden md:flex items-center px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100/50 border-y border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wider">
                                <div className="w-2/12">Timestamp</div>
                                <div className="w-1/12 text-center">Level</div>
                                <div className="w-9/12">Message</div>
                            </div>

                            {/* Logs List */}
                            <div className="divide-y divide-gray-100">
                                {logs.length > 0 ? (
                                    logs.map((log, index) => (
                                        <div
                                            key={index}
                                            className="px-4 sm:px-6 py-4 hover:bg-blue-50/30 transition-all duration-150 group"
                                        >
                                            {/* Mobile View */}
                                            <div className="md:hidden space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                                                        {log.timestamp}
                                                    </span>
                                                    <span
                                                        className={`text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1.5 ${getLevelColor(
                                                            log.level
                                                        )}`}
                                                    >
                                                        {getLevelIcon(log.level)}
                                                        {log.level}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700 leading-relaxed break-words bg-gray-50 p-3 rounded-lg">
                                                    {log.message}
                                                </p>
                                            </div>

                                            {/* Desktop View */}
                                            <div className="hidden md:flex items-start gap-4">
                                                <div className="w-2/12">
                                                    <span className="text-sm font-medium text-gray-500 bg-gray-100 group-hover:bg-blue-100 px-2 py-1 rounded-lg transition-colors">
                                                        {log.timestamp}
                                                    </span>
                                                </div>
                                                <div className="w-1/12 flex justify-center">
                                                    <span
                                                        className={`text-xs px-3 py-1.5 rounded-full font-semibold flex items-center gap-1.5 ${getLevelColor(
                                                            log.level
                                                        )}`}
                                                    >
                                                        {getLevelIcon(log.level)}
                                                        {log.level}
                                                    </span>
                                                </div>
                                                <div className="w-9/12">
                                                    <p className="text-sm text-gray-700 leading-relaxed break-words">
                                                        {log.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-20">
                                        <Activity size={48} className="mx-auto text-gray-300 mb-4" />
                                        <p className="text-gray-500 font-medium">No logs available.</p>
                                        <p className="text-gray-400 text-sm mt-1">Logs will appear here when generated</p>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {confirmVisible && (
                <ConfirmModal
                    title="Clear All Logs?"
                    message="This will permanently delete all log entries. This action cannot be undone."
                    onConfirm={handleConfirmClear}
                    onCancel={() => setConfirmVisible(false)}
                />
            )}
        </div>
    );
}
