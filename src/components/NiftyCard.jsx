import { TrendingUp, TrendingDown } from "lucide-react";

const NiftyCard = ({ nifty }) => {
    if (!nifty || nifty.current === undefined) return null;

    const { current, ema20, ema50, percent_change, symbol } = nifty;
    const positive = current - (nifty.previous_close || current) >= 0;
    const Icon = positive ? TrendingUp : TrendingDown;

    const maxValue = Math.max(current, ema20, ema50);
    const minValue = Math.min(current, ema20, ema50);
    const range = maxValue - minValue || 1;
    const toPercent = (value) => ((value - minValue) / range) * 100;

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 mb-5 hover:shadow-lg transition-all">
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{symbol}</h2>
                    <p className="text-2xl font-bold text-gray-900">{current.toFixed(2)}</p>
                    <p
                        className={`text-sm font-medium ${positive ? "text-green-700" : "text-red-600"
                            }`}
                    >
                        {positive ? "+" : ""}
                        {percent_change?.toFixed(2)}%
                    </p>
                </div>
                <Icon
                    size={36}
                    className={positive ? "text-green-600" : "text-red-500"}
                />
            </div>

            {/* Gray progress line with colored markers */}
            <div className="relative h-6 mb-2">
                {/* Gray Background Line */}
                <div className="absolute top-2 left-0 right-0 h-3 rounded-full bg-gray-300"></div>

                {/* Markers */}
                {[current, ema20, ema50].map((value, index) => {
                    const colors = ["green-600", "yellow-600", "blue-600"];
                    return (
                        <div
                            key={index}
                            className="absolute top-0"
                            style={{ left: `${toPercent(value)}%` }}
                        >
                            <div
                                className={`w-4 h-4 rounded-full bg-${colors[index]} border-2 border-white transform -translate-x-1/2`}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Min/Max Labels */}
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{minValue.toFixed(2)}</span>
                <span>{maxValue.toFixed(2)}</span>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-4 text-xs mt-3">
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-green-600 rounded-full" /> Current
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-yellow-600 rounded-full" /> EMA20
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-3 h-3 bg-blue-600 rounded-full" /> EMA50
                </div>
            </div>
        </div>
    );
};

export default NiftyCard;
