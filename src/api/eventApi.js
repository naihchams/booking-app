import axios from "axios";
import { DateTime } from "luxon";

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
    // Debug: Log the original event start and end times
    console.log("Original event data:", eventData);

    // Ensure event start and end are treated as local times based on the user's timezone
    if (eventData.start) {
      eventData.start = DateTime.fromMillis(eventData.start)
        .setZone(userTimeZone)
        .toFormat("yyyy-MM-dd'T'HH:mm:ssZZ");
    }

    if (eventData.end) {
      eventData.end = DateTime.fromMillis(eventData.end)
        .setZone(userTimeZone)
        .toFormat("yyyy-MM-dd'T'HH:mm:ssZZ");
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