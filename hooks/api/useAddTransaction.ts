import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = `https://api.triptex.me`;

const handleAddTransaction = async (values: any) => {
  const requestBody = 
    {
        cell_id: parseInt(values?.cell_id),
        product_id: parseInt(values?.product_id),
        qty: parseInt(values?.qty),
        action_type: values?.action_type
      }
  ;
  return axios.post(`${baseUrl}/thesis/transactions`, requestBody, {
    // headers: {
    //   Authorization: `Bearer ${values?.token}`,
    // },
  });
};

export const useAddTransaction = (onSuccessFunc: any, onErrorFunc: any, queryClient: any) => {
  return useMutation(handleAddTransaction, {
    onSuccess: onSuccessFunc,
    onError: onErrorFunc,
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });
};
