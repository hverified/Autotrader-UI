// src/api/stocks.js
import axiosClient from "./axiosClient";

// ✅ 1. Update shortlist (scrape new)
export const updateShortlist = async () => {
  const res = await axiosClient.post("/trades/update_shortlist");
  return res.data;
};

// ✅ 2. Get all stocks grouped by status
export const getStocks = async (manual = true) => {
  const res = await axiosClient.get(`/trades/get_stocks?manual=${manual}`);
  return res.data;
};

// ✅ 3. Buy shortlisted stocks
export const buyStock = async (symbol) => {
  const res = await axiosClient.post("/trades/buy", { symbol });
  return res.data;
};

// ✅ 4. Check which stocks to sell
export const checkToSell = async () => {
  const res = await axiosClient.post("/trades/check_to_sell");
  return res.data;
};

// ✅ 5. Execute sell for next day
export const sellNextDay = async () => {
  const res = await axiosClient.post("/trades/sell_next_day");
  return res.data;
};
