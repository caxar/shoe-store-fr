import { API_URL, STRAPI_API_TOKEN } from "./urls.js";

export const fetchDataFromApi = async (endpoint) => {
  const options = {
    method: "GET",
    header: {
      Authorization: " " + STRAPI_API_TOKEN,
    },
  };
  const res = await fetch(`${API_URL}${endpoint}`, options);
  const data = await res.json();

  return data;
};
