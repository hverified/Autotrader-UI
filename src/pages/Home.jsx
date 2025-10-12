// ============================================
// src/pages/Home.jsx
// ============================================

import { useState } from "react";
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Sparkles,
    BarChart3,
    Clock,
    Target,
    Zap
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
    const portfolioStats = {
        totalValue: 125450.75,
        todayPL: 2345.50,
        todayPLPercent: 1.91,
        totalPL: 15230.25,
        totalPLPercent: 13.82,
        totalStocks: 12,
        activePositions: 8
    };

    const recentTrades = [
        { symbol: "RELIANCE", type: "buy", price: 2456.30, quantity: 10, time: "10:30 AM", profit: null },
        { symbol: "TCS", type: "sell", price: 3890.50, quantity: 5, time: "09:45 AM", profit: 1250.50 },
        { symbol: "INFY", type: "buy", price: 1567.80, quantity: 15, time: "Yesterday", profit: null },
        { symbol: "HDFC", type: "sell", price: 1678.90, quantity: 8, time: "Yesterday", profit: -320.40 },
    ];

    const topPerformers = [
        { symbol: "WIPRO", change: 8.45, price: 456.30 },
        { symbol: "ICICIBANK", change: 5.67, price: 987.50 },
        { symbol: "SBIN", change: 4.23, price: 623.80 },
    ];

    const quickStats = [
        { label: "Win Rate", value: "68%", icon: Target, color: "text-green-600", bg: "bg-green-50" },
        { label: "Avg Hold Time", value: "3.2 days", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Active Alerts", value: "5", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
    ];

    return (
        <div className="pb-16 sm:pb-0 p-4 sm:p-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
                            <BarChart3 size={28} className="text-white" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
                            Welcome Back!
                        </h1>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 flex items-center gap-2 ml-1">
                        <Sparkles size={16} className="text-amber-500" />
                        Your automated trading dashboard
                    </p>
                </div>

                {/* Portfolio Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* Card Template */}
                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-semibold text-slate-600">Portfolio Value</p>
                            <div className="p-2 rounded-lg bg-blue-50">
                                <DollarSign size={20} className="text-blue-600" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">₹{portfolioStats.totalValue.toLocaleString()}</p>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                            <ArrowUpRight size={14} className="text-green-600" />
                            <span className="text-green-600 font-semibold">{portfolioStats.totalPLPercent}%</span>
                            <span>overall</span>
                        </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-semibold text-slate-600">Today's P/L</p>
                            {portfolioStats.todayPL >= 0 ? (
                                <div className="p-2 rounded-lg bg-green-50">
                                    <TrendingUp size={20} className="text-green-600" />
                                </div>
                            ) : (
                                <div className="p-2 rounded-lg bg-red-50">
                                    <TrendingDown size={20} className="text-red-600" />
                                </div>
                            )}
                        </div>
                        <p className={`text-2xl font-bold mb-1 ${portfolioStats.todayPL >= 0 ? "text-green-600" : "text-red-600"}`}>
                            ₹{Math.abs(portfolioStats.todayPL).toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                            {portfolioStats.todayPL >= 0 ? (
                                <ArrowUpRight size={14} className="text-green-600" />
                            ) : (
                                <ArrowDownRight size={14} className="text-red-600" />
                            )}
                            <span className={`font-semibold ${portfolioStats.todayPL >= 0 ? "text-green-600" : "text-red-600"}`}>
                                {portfolioStats.todayPLPercent}%
                            </span>
                            <span>today</span>
                        </p>
                    </div>

                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-semibold text-slate-600">Active Positions</p>
                            <div className="p-2 rounded-lg bg-purple-50">
                                <Activity size={20} className="text-purple-600" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 mb-1">
                            {portfolioStats.activePositions}
                        </p>
                        <p className="text-sm text-slate-500">of {portfolioStats.totalStocks} total</p>
                    </div>

                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-4">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-sm font-semibold text-slate-600">Total Profit</p>
                            <div className="p-2 rounded-lg bg-emerald-50">
                                <TrendingUp size={20} className="text-emerald-600" />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-emerald-600 mb-1">
                            ₹{portfolioStats.totalPL.toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-500">+{portfolioStats.totalPLPercent}% overall</p>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    {quickStats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-4"
                        >
                            <div className={`inline-flex p-2 rounded-xl ${stat.bg} mb-2`}>
                                <stat.icon size={20} className={stat.color} />
                            </div>
                            <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                            <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Trades */}
                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-900">Recent Trades</h2>
                            <Link to="/shortlist" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                View All →
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {recentTrades.map((trade, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-slate-50/70 rounded-xl hover:bg-slate-100 transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${trade.type === "buy" ? "bg-green-100" : "bg-red-100"}`}>
                                            {trade.type === "buy" ? (
                                                <ArrowUpRight size={16} className="text-green-600" />
                                            ) : (
                                                <ArrowDownRight size={16} className="text-red-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">{trade.symbol}</p>
                                            <p className="text-xs text-slate-500">{trade.time}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-slate-900">₹{trade.price}</p>
                                        <p className="text-xs text-slate-500">Qty: {trade.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Performers */}
                    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-slate-200/60 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-900">Top Performers</h2>
                            <TrendingUp size={20} className="text-green-500" />
                        </div>
                        <div className="space-y-3">
                            {topPerformers.map((stock, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100"
                                >
                                    <div>
                                        <p className="font-bold text-slate-900">{stock.symbol}</p>
                                        <p className="text-sm text-slate-600">₹{stock.price}</p>
                                    </div>
                                    <div className="text-right text-green-600 font-bold flex items-center gap-1">
                                        <ArrowUpRight size={18} />
                                        <span>{stock.change}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link
                            to="/shortlist"
                            className="mt-4 block w-full py-3 text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-600 transition-all"
                        >
                            View Full Watchlist
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
