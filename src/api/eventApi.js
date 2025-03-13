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
    if (eventData.start) {
      eventData.start = format(
        new Date(eventData.start),
        "yyyy-MM-dd'T'HH:mm:ssXXX",
        { timeZone: userTimeZone }
      );
    }

    if (eventData.end) {
      eventData.end = format(
        new Date(eventData.end),
        "yyyy-MM-dd'T'HH:mm:ssXXX",
        { timeZone: userTimeZone }
      );
    }

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