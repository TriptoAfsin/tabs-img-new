import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = `https://api.triptex.me`;

const handleAddProduct = async (values: any) => {
  const requestBody = {
    name: values.name,
    color: values.color,
    type: values.type,
    style: values.style,
    total_qty: parseInt(values.total_qty),
    po: values.po,
    other_info: values.other_info,
  };
  return axios.post(`${baseUrl}/thesis/products`, requestBody, {
    // headers: {
    //   Authorization: `Bearer ${values?.token}`,
    // },
  });
};

export const useAddProduct = (onSuccessFunc: any, onErrorFunc: any, queryClient: any) => {
  return useMutation(handleAddProduct, {
    onSuccess: onSuccessFunc,
    onError: onErrorFunc,
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });
};
