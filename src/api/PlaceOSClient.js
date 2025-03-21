// PlaceOSClient.js
import { create } from "@placeos/ts-client";

const SYSTEMS_API_URL = process.env.REACT_APP_SYSTEMS_API_URL;

export const createClient = () => {
  const token = localStorage.getItem("accessToken");
  return create({
    baseUrl: SYSTEMS_API_URL,
    token: token,
  });
};
