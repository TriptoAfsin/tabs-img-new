import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import querystring from "query-string";
const baseUrl = `https://api.triptex.me`;

export const useProductSearch = (query) => {
  return useQuery(
    ["product-search", query],
    () => {
      return axios.get(
        `${baseUrl}/thesis/search/products?${querystring.stringify(query, {
          arrayFormat: "comma",
          skipEmptyString: true,
        })}`
      );
    },
    {
      enabled: true,
    }
  );
};
