import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const baseUrl = `https://api.triptex.me`;
// import querystring from "query-string";

export const useGetProdCells = (id: number) => {
  console.log("prod cells id", id);
  return useQuery(
    ["product-cells", id],
    () => {
      return axios.get(`${baseUrl}/thesis/cells/product/${id}`);
    },
    {
      enabled: false,
    }
  );
};
