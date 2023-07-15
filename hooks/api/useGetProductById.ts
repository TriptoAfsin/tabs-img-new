import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseUrl = `https://api.triptex.me`;
// import querystring from "query-string";

export const useGetProductById = (id: number) => {
  return useQuery(
    ["single-product", id],
    () => {
      return axios.get(
        `${baseUrl}/thesis/products/${id}`,
      );
    },
  );
};
