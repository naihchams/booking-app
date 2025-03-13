import axios from "axios";
import { format } from "date-fns-tz";

const EVENTS_API_URL = process.env.REACT_APP_EVENTS_API_URL;
const params = new URLSearchParams(window.location.search);
const API_KEY = params.get("apikey");

// Automatically detect the device's timezone
const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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
    // Ensure event start and end are treated as local times based on the user's timezone
    if (eventData.start) {
      const localStart = new Date(eventData.start).toLocaleString("en-US", { timeZone: userTimeZone });
      eventData.start = format(new Date(localStart), "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: userTimeZone });
    }

    if (eventData.end) {
      const localEnd = new Date(eventData.end).toLocaleString("en-US", { timeZone: userTimeZone });
      eventData.end = format(new Date(localEnd), "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone: userTimeZone });
    }

    // Sending the eventData to the API
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