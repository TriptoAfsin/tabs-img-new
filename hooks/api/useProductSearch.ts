import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = `https://api.triptex.me`;

const handleProductSearch = async (values: any) => {
  const requestBody = {
    name: values.name ? values.name : undefined,
    type: values.type ? values.type : undefined,
    style: values.style ? values.style : undefined,
    po: values.po ? values.po : undefined,
  };
  return axios.post(`${baseUrl}/thesis/search/products`, requestBody, {
    // headers: {
    //   Authorization: `Bearer ${values?.token}`,
    // },
  });
};

export const useProductSearch = (
  onSuccessFunc: any,
  onErrorFunc: any,
  queryClient: any
) => {
  return useMutation(handleProductSearch, {
    onSuccess: onSuccessFunc,
    onError: onErrorFunc,
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });
};
