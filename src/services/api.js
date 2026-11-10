import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/**
 * Submit coaching booking and payment details
 */
export const createBooking = async (bookingData) => {
  const response = await apiClient.post("/bookings", bookingData);
  return response.data;
};

/**
 * Submit consultation request
 */
export const createConsultation = async (consultationData) => {
  const response = await apiClient.post("/consultations", consultationData);
  return response.data;
};

/**
 * Submit general contact message
 */
export const sendContactMessage = async (contactData) => {
  const response = await apiClient.post("/contact", contactData);
  return response.data;
};

/**
 * Check backend health & DB connection
 */
export const checkHealth = async () => {
  const response = await apiClient.get("/health");
  return response.data;
};
