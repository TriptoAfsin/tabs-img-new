import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = `https://api.triptex.me`;

const handleUpdateTransaction = async (values: any) => {
  const requestBody = {
    cell_id: values?.cell_id,
    product_id: parseInt(values?.product_id),
    qty: parseInt(values?.qty),
    action_type: values?.action_type,
  };
  return axios.put(
    `${baseUrl}/thesis/transactions/${values?.transaction_id}`,
    requestBody,
    {
      // headers: {
      //   Authorization: `Bearer ${values?.token}`,
      // },
    }
  );
};

export const useUpdateTransaction = (
  onSuccessFunc: any,
  onErrorFunc: any,
  queryClient: any
) => {
  return useMutation(handleUpdateTransaction, {
    onSuccess: onSuccessFunc,
    onError: onErrorFunc,
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });
};
