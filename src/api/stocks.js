// src/api/stocks.js
import axiosClient from "./axiosClient";

export const getStocks = async () => {
  const res = await axiosClient.get("/trades/get_stocks");
  return res.data;
};

export const updateShortlist = async () => {
  const res = await axiosClient.post("/trades/update_shortlist");
  return res.data;
};

export const buyStockAPI = async (symbol) => {
  const res = await axiosClient.post("/trades/buy_stock", { symbol });
  return res.data;
};

export const markNotTriggeredAPI = async (symbol) => {
  const res = await axiosClient.post("/trades/mark_not_triggered", { symbol });
  return res.data;
};
