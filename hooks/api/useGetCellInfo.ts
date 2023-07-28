import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseUrl = `https://api.triptex.me`;
// import querystring from "query-string";

export const useGetCellInfo = (id: number) => {
  return useQuery(["cell-info", id], () => {
    return axios.get(`${baseUrl}/thesis/cells/${id}`);
  });
};
