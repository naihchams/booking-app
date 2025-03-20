import axios from "axios";

const SYSTEMS_API_URL = process.env.REACT_APP_SYSTEMS_API_URL;

const getConfig = () => {
  const token = localStorage.getItem("accessToken");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

console.log(getConfig());

export const fetchSystems = async () => {
  try {
    const response = await axios.get(SYSTEMS_API_URL, getConfig());
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data from API:",
      error.response || error.message
    );
    throw error;
  }
};

// export const createSystem = (systemData) =>
//   axios.post(SYSTEMS_API_URL, systemData, config);

// export const updateSystem = (id, systemData) =>
//   axios.put(`${SYSTEMS_API_URL}/${id}`, systemData, config);

// export const deleteSystem = (id) =>
//   axios.delete(`${SYSTEMS_API_URL}/${id}`, config);
