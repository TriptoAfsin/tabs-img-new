import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseUrl = process.env.EXPO_PUBLIC_API_URL;
// import querystring from "query-string";

export const useGetAllProducts = () => {
  return useQuery(
    ["all-products"],
    () => {
      return axios.get(
        `https://api.triptex.me/thesis/products`,
      );
    },
  );
};
