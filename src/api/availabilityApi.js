import axios from "axios";

const AVAILABILITY_API_URL = process.env.REACT_APP_AVAILABILITY_API_URL;

const params = new URLSearchParams(window.location.search);
const API_KEY = params.get("apikey");

const config = {
  headers: { "X-API-KEY": API_KEY },
};

export const fetchAvailability = async (periodStart, periodEnd, roomId) => {
  try {
    const url = `${AVAILABILITY_API_URL}?system_ids=${roomId}&period_start=${periodStart}&period_end=${periodEnd}`;
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
