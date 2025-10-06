// src/api/stocks.js
import axiosClient from "./axiosClient";

// Fetch all stocks grouped by status
export const getStocks = async () => {
  const res = await axiosClient.get("/trades/get_stocks");
  return res.data;
};

// Update shortlist (scrape & store stocks)
export const updateShortlist = async () => {
  const res = await axiosClient.post("/trades/update_shortlist");
  return res.data;
};

// Buy a shortlisted stock
export const buyStockAPI = async (symbol) => {
  const res = await axiosClient.post("/trades/buy_stock", { symbol });
  return res.data;
};

// Mark a shortlisted stock as not_triggered
export const markNotTriggeredAPI = async (symbol) => {
  const res = await axiosClient.post("/trades/mark_not_triggered", { symbol });
  return res.data;
};
