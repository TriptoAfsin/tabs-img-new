import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseUrl = `https://api.triptex.me`;
// import querystring from "query-string";

export const useGetRacks = () => {
  return useQuery(
    ["all-racks"],
    () => {
      return axios.get(
        `${baseUrl}/thesis/racks`,
      );
    },
  );
};
