import axios from "axios";

const AVAILABILITY_API_URL = process.env.REACT_APP_AVAILABILITY_API_URL;
const API_KEY = process.env.REACT_APP_SYSTEMS_API_KEY;

const config = {
  headers: { "X-API-KEY": API_KEY },
};

export const fetchAvailibily = async (periodStart, periodEnd) => {
  try {
    const url = `${AVAILABILITY_API_URL}?system_ids=sys-I9Z2FiApOu&&sys-IEoQW~kga5&&sys-IJL~RiGidX&&sys-IJMAG5Te42&period_start=${periodStart}&period_end=${periodEnd}`;

    console.log(url);

    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
