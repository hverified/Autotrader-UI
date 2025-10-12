// src/api/users.js
import axiosClient from "./axiosClient";

export const registerUser = async (userData) => {
  const res = await axiosClient.post(`/users/register`, userData);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await axiosClient.post(`/users/login`, credentials);
  if (res.data.access_token) {
    localStorage.setItem('token', res.data.access_token);
  }
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await axiosClient.get(`/users/me`);
  localStorage.setItem('user', JSON.stringify(res.data));
  return res.data;
};

export const updateUserProfile = async (userData) => {
  const res = await axiosClient.put(`/users/me`, userData);
  localStorage.setItem('user', JSON.stringify(res.data));
  return res.data;
};

export const changePassword = async (passwordData) => {
  const res = await axiosClient.post(`/users/change-password`, passwordData);
  return res.data;
};

export const deleteAccount = async () => {
  const res = await axiosClient.delete(`/users/me`);
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};