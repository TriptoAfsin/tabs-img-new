import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = `https://api.triptex.me`;

const handleFindProCells = async (values: any) => {
  const requestBody = {
    id: parseInt(values?.id),
  };
  return axios.post(`${baseUrl}/thesis/cells/product`, requestBody, {
    // headers: {
    //   Authorization: `Bearer ${values?.token}`,
    // },
  });
};

export const useFindProdCells = (
  onSuccessFunc: any,
  onErrorFunc: any,
  queryClient: any
) => {
  return useMutation(handleFindProCells, {
    onSuccess: onSuccessFunc,
    onError: onErrorFunc,
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });
};
