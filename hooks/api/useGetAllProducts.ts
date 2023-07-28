import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseUrl = `https://api.triptex.me`;
// import querystring from "query-string";

export const useGetAllProducts = () => {
  return useQuery(
    ["all-products"],
    () => {
      return axios.get(
        `${baseUrl}/thesis/products`,
      );
    }
  );
};
