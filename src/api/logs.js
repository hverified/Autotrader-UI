
import axiosClient from "./axiosClient";

export async function getLogs(limit = 100, level = null) {
  const params = { limit };
  if (level) params.level = level;
  
  const response = await axiosClient.get("/logs/", { params });
  return response.data;
}

export async function getLogLevels() {
  const response = await axiosClient.get("/logs/levels");
  return response.data;
}

export async function clearLogs() {
  const response = await axiosClient.delete("/logs/");
  return response.data;
}

export async function getRecentLogs(minutes = 60) {
  const response = await axiosClient.get("/logs/recent", {
    params: { minutes },
  });
  return response.data;
}