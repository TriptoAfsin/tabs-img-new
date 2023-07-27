import React, { useState } from "react";
import { Input, FormControl, Button, Box, Divider, Text } from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddTransaction } from "../../hooks/api/useAddTransaction";
import { useQueryClient } from "@tanstack/react-query";
import { Select } from "native-base";
import { useToast } from "native-base";
import { useGetAllProducts } from "../../hooks/api/useGetAllProducts";
import { ScrollView } from "react-native-virtualized-view";

function AddTransaction({ setModal, cellId }) {
  const [prodId, setProdId] = useState<any>(null);
  const {
    isLoading: isAllProductsLoading,
    data: allProductsData,
    refetch: refetchAllProducts,
  } = useGetAllProducts();
  console.log(allProductsData?.data);
  const toast = useToast();
  const queryClient = useQueryClient();
  const productSchema = yup.object().shape({
    action_type: yup.string().min(2).required(),
    product: yup.string().min(2).required(),
    qty: yup.number().min(1).required(),
  });
  const { mutate: transactionMutate, isLoading } = useAddTransaction(
    () => {
      console.log("success");
      toast.show({
        render: () => {
          return (
            <Box bg="#0f9d58" px="2" py="1" rounded="sm" mb={5} color={"white"}>
              <Text color={"white"}>Transaction Added Successfully 😁</Text>
            </Box>
          );
        },
        placement: "top",
      });
      setModal(false);
    },
    () => {
      console.log("err");
      toast.show({
        render: () => {
          return (
            <Box
              bg={"red.600"}
              px="5"
              py="1"
              rounded="sm"
              mb={5}
              color={"white"}
            >
              <Text color={"white"}>Error Occurred 😭</Text>
            </Box>
          );
        },
        placement: "top",
      });
    },
    queryClient
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    setError,
    control,
    formState: { errors },
    formState,
  } = useForm({
    resolver: yupResolver(productSchema),
  });
  const onSubmit = (data: any) => {
    console.log("submiting with ", data);
    transactionMutate(data);
  };
  return (
    <ScrollView>
      <Box display={"flex"} flexDir={"column"}>
        <FormControl>
          <FormControl.Label>Select Product</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Select
                  selectedValue={value}
                  minWidth="200"
                  accessibilityLabel="Select Product"
                  placeholder="Select Product"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: (
                      <FontAwesome name="arrow-circle-o-down" size={15} />
                    ),
                  }}
                  mt={1}
                  onValueChange={val => {
                    const prodId = val.split("-")[0];
                    console.log(prodId);
                    setProdId(parseInt(prodId));
                    onChange(val);
                  }}
                >
                  {allProductsData?.data?.products?.map(item => (
                    <Select.Item
                      label={`${item?.product_id}-${item?.name}`}
                      value={`${item?.product_id}-${item?.name}`}
                    />
                  ))}
                </Select>
              </>
            )}
            name="product"
          />
          {errors.product && (
            <FormControl.ErrorMessage color={"red.500"}>
              <Text color={"red.500"}>{errors.product.message}</Text>
            </FormControl.ErrorMessage>
          )}
        </FormControl>

        <FormControl mt="3">
          <FormControl.Label>Action Type</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Select
                  selectedValue={value}
                  minWidth="200"
                  accessibilityLabel="Choose Action Type"
                  placeholder="Choose Action Type"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: (
                      <FontAwesome name="arrow-circle-o-down" size={15} />
                    ),
                  }}
                  mt={1}
                  onValueChange={val => onChange(val)}
                >
                  <Select.Item label="Add" value="add" />
                  <Select.Item label="Remove" value="remove" />
                </Select>
              </>
            )}
            name="action_type"
            defaultValue=""
          />
          {errors.action_type && (
            <FormControl.ErrorMessage color={"red.500"}>
              <Text color={"red.500"}>{errors.action_type.message}</Text>
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Quantity</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Product Quantity"
                keyboardType="numeric"
                onChangeText={val => onChange(parseInt(val))}
                value={value?.toString()}
              />
            )}
            name="qty"
          />
          {errors.qty && (
            <FormControl.ErrorMessage color={"red.500"}>
              <Text color={"red.500"}>{errors.qty.message}</Text>
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <Divider />
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={5}
          mb={5}
        >
          <Button.Group space={2} colorScheme="success">
            <Button
              colorScheme="success"
              isLoading={isLoading}
              onPress={() => {
                transactionMutate({
                  cell_id: cellId,
                  action_type: getValues("action_type"),
                  product_id: prodId,
                  qty: getValues("qty"),
                });
              }}
            >
              Add
            </Button>
          </Button.Group>
        </Box>
      </Box>
    </ScrollView>
  );
}

export default AddTransaction;
