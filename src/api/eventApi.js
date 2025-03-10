import axios from "axios";

const EVENTS_API_URL = process.env.REACT_APP_EVENTS_API_URL;
const API_KEY = process.env.REACT_APP_SYSTEMS_API_KEY;

const config = {
  headers: { "X-API-KEY": API_KEY },
};

export const fetchEvents = async (periodStart, periodEnd, zoneIds) => {
  try {
    const url = `${EVENTS_API_URL}?zone_ids=${zoneIds}&period_start=${periodStart}&period_end=${periodEnd}`;

    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(EVENTS_API_URL, eventData, {
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating event:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
