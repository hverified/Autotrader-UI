// src/api/stocks.js
import axiosClient from "./axiosClient";


export const getStocks = async () => {
  const res = await axiosClient.get(`/trades/get_stocks`);
  return res.data;
};

export const updateShortlist = async () => {
  const res = await axiosClient.post("/trades/update_shortlist");
  return res.data;
};

export const buyStock = async (symbol) => {
  const res = await axiosClient.post("/trades/buy", { symbol });
  return res.data;
};

export const checkToSell = async () => {
  const res = await axiosClient.post("/trades/check_to_sell");
  return res.data;
};

export const sellNextDay = async () => {
  const res = await axiosClient.post("/trades/sell_next_day");
  return res.data;
};
