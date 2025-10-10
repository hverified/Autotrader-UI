import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";

const NiftyCard = ({ nifty }) => {
    if (!nifty || nifty.current === undefined) return null;

    const { current, ema20, ema50, percent_change, symbol } = nifty;
    const positive = percent_change >= 0;
    const Icon = positive ? TrendingUp : TrendingDown;

    const maxValue = Math.max(current, ema20, ema50);
    const minValue = Math.min(current, ema20, ema50);
    const range = maxValue - minValue || 1;
    const toPercent = (value) => ((value - minValue) / range) * 100;

    const markers = [
        { value: ema50, label: "50", color: "from-indigo-500 to-indigo-600", position: toPercent(ema50) },
        { value: ema20, label: "20", color: "from-amber-500 to-amber-600", position: toPercent(ema20) },
        { value: current, label: "C", color: positive ? "from-emerald-500 to-emerald-600" : "from-red-500 to-red-600", position: toPercent(current) },
    ];

    return (
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-md border border-slate-200/70 p-4 sm:p-6 mb-6 hover:shadow-lg transition-all duration-300">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${positive ? 'from-emerald-500 to-emerald-600' : 'from-red-500 to-red-600'} shadow-md`}>
                        <Activity size={22} className="text-white" />
                    </div>
                    <div>
                        <h2 className="text-base sm:text-lg font-bold text-slate-900">{symbol}</h2>
                        <p className="text-xs text-slate-500">Indian Stock Market Index</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="text-right">
                        <p className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{current.toFixed(2)}</p>
                        <div className={`flex justify-end items-center gap-1 text-sm font-semibold ${positive ? "text-emerald-600" : "text-red-600"}`}>
                            {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            {positive ? "+" : ""}{percent_change?.toFixed(2)}%
                        </div>
                    </div>
                    <Icon size={32} className={positive ? "text-emerald-500" : "text-red-500"} />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
                <div className="flex flex-col items-center group bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-md hover:shadow-md p-2 sm:p-3 border border-indigo-50 hover:border-indigo-200 transition-all duration-200 w-full">
                    <p className="text-[10px] sm:text-xs font-medium text-indigo-700 mb-0.5">EMA 50</p>
                    <p className="text-sm sm:text-lg font-bold text-indigo-900">{ema50.toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-center group bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-md hover:shadow-md p-2 sm:p-3 border border-amber-50 hover:border-amber-200 transition-all duration-200 w-full">
                    <p className="text-[10px] sm:text-xs font-medium text-amber-700 mb-0.5">EMA 20</p>
                    <p className="text-sm sm:text-lg font-bold text-amber-900">{ema20.toFixed(2)}</p>
                </div>
                <div className={`flex flex-col items-center group bg-gradient-to-br ${positive ? 'from-emerald-50 to-white border-emerald-50' : 'from-red-50 to-white border-red-50'} rounded-2xl p-2 sm:p-3 border shadow-md w-full`}>
                    <p className={`text-[10px] sm:text-xs font-medium ${positive ? 'text-emerald-700' : 'text-red-700'} mb-0.5`}>Current</p>
                    <p className={`text-sm sm:text-lg font-bold ${positive ? 'text-emerald-900' : 'text-red-900'}`}>{current.toFixed(2)}</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full">
                <p className="text-xs font-semibold text-slate-600 mb-2 uppercase tracking-wider text-center">Price Position Analysis</p>

                {/* Progress Track */}
                <div className="relative h-8 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-full overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>

                    {/* Round Markers */}
                    {markers.sort((a, b) => a.position - b.position).map((marker, index) => {
                        const adjustedPosition = Math.min(96, Math.max(4, marker.position));

                        return (
                            <div
                                key={index}
                                className="absolute flex items-center justify-center"
                                style={{
                                    left: `${adjustedPosition}%`,
                                    top: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <div
                                    className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full bg-gradient-to-br ${marker.color} text-white text-[10px] sm:text-xs font-bold shadow-md border-2 border-white`}
                                >
                                    {marker.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default NiftyCard;
