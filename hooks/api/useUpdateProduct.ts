import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = `https://api.triptex.me`;

const handleUpdateProduct = async (values: any) => {
  const requestBody = {
    id: values?.id,
    name: values.name,
    color: values.color,
    type: values.type,
    style: values.style,
    total_qty: values?.total_qty ? parseInt(values.total_qty) : undefined,
    po: values.po,
  };
  return axios.put(`${baseUrl}/thesis/products/${values?.id}`, requestBody, {
    // headers: {
    //   Authorization: `Bearer ${values?.token}`,
    // },
  });
};

export const useUpdateProduct = (
  onSuccessFunc: any,
  onErrorFunc: any,
  queryClient: any
) => {
  return useMutation(handleUpdateProduct, {
    onSuccess: onSuccessFunc,
    onError: onErrorFunc,
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });
};
