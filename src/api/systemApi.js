import axios from "axios";

const SYSTEMS_API_URL = process.env.REACT_APP_SYSTEMS_API_URL;
const API_KEY = window.location.pathname.slice(1);

const config = {
  headers: { "X-API-KEY": API_KEY },
};

export const fetchSystems = () => axios.get(SYSTEMS_API_URL, config);

export const fetchSystem = (id) =>
  axios.get(`${SYSTEMS_API_URL}/${id}`, config);

export const createSystem = (systemData) =>
  axios.post(SYSTEMS_API_URL, systemData, config);

export const updateSystem = (id, systemData) =>
  axios.put(`${SYSTEMS_API_URL}/${id}`, systemData, config);

export const deleteSystem = (id) =>
  axios.delete(`${SYSTEMS_API_URL}/${id}`, config);
