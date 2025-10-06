// src/api/market.js
import axiosClient from "./axiosClient";


export const getNiftyData = async () => {
  const res = await axiosClient.get(`/market/nifty`);
  return res.data;
};
