import FontAwesome from "@expo/vector-icons/FontAwesome";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  Select,
  Text,
  TextArea,
  useToast,
} from "native-base";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native-virtualized-view";
import * as yup from "yup";
import { useUpdateProduct } from "../../hooks/api/useUpdateProduct";

function UpdateProduct({ ref, setModal, oldData }) {
  console.log(oldData?.total_qty);
  const toast = useToast();
  const queryClient = useQueryClient();
  const productSchema = yup.object().shape({
    name: yup.string().min(2).required(),
    color: yup.string().min(2).required(),
    type: yup.string().min(2).required(),
    po: yup.string().min(1).required(),
    style: yup.string().min(1).required(),
    total_qty: yup.string().min(1).required(),
    other_info: yup.string().min(1).optional().nullable(),
  });
  const { mutate: productMutate, isLoading } = useUpdateProduct(
    () => {
      console.log("success");
      toast.show({
        render: () => {
          return (
            <Box bg="#0f9d58" px="3" py="1" rounded="sm" mb={5} color={"white"}>
              <Text color={"white"}>Product Updated Successfully 😁</Text>
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
    productMutate(data);
  };
  return (
    <ScrollView>
      <Box display={"flex"} flexDir={"column"}>
        <FormControl>
          <FormControl.Label>Name</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="New Product"
                type="text"
                onChangeText={val => onChange(val)}
                value={value}
                defaultValue={oldData?.name}
              />
            )}
            name="name"
            defaultValue={oldData?.name}
          />
          {errors.name && (
            <FormControl.ErrorMessage color={"red.500"}>
              <Text color={"red.500"}>{errors.name.message}</Text>
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Color</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Product Color"
                type="text"
                onChangeText={val => onChange(val)}
                value={value}
                defaultValue={oldData?.color}
              />
            )}
            name="color"
            defaultValue={oldData?.color}
          />
          {errors.color && (
            <FormControl.ErrorMessage color={"red.500"}>
              <Text color={"red.500"}>{errors.color.message}</Text>
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl mt="3" isReadOnly>
          <FormControl.Label>Type</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Select
                  selectedValue={value}
                  defaultValue={oldData?.type}
                  minWidth="200"
                  accessibilityLabel="Choose Product Type"
                  placeholder="Choose Product Type"
                  _selectedItem={{
                    bg: "teal.600",
                    endIcon: (
                      <FontAwesome name="arrow-circle-o-down" size={15} />
                    ),
                  }}
                  mt={1}
                  onValueChange={val => onChange(val)}
                >
                  <Select.Item label="Yarn" value="Yarn" />
                  <Select.Item label="Thread" value="Thread" />
                  <Select.Item label="Dyes" value="Dyes" />
                  <Select.Item label="Accessories" value="Accessories" />
                  <Select.Item label="Fabric" value="Fabric" />
                  <Select.Item label="Needle" value="Needle" />
                  <Select.Item label="Others" value="Others" />
                </Select>
              </>
            )}
            name="type"
            defaultValue={oldData?.type}
          />
          {errors.type && (
            <FormControl.ErrorMessage color={"red.500"}>
              <Text color={"red.500"}>{errors.type.message}</Text>
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
                type="text"
                defaultValue={oldData?.total_qty?.toString()}
                onChangeText={val => {
                  if (val) {
                    return onChange(val);
                  } else {
                    return onChange("0");
                  }
                }}
                value={value}
              />
            )}
            name="total_qty"
            defaultValue={oldData?.total_qty?.toString()}
          />
          {errors.total_qty && (
            <FormControl.ErrorMessage color={"red.500"}>
              <Text color={"red.500"}>{errors.total_qty.message}</Text>
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Style</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="Product Style"
                type="text"
                defaultValue={oldData?.style}
                onChangeText={val => onChange(val)}
                value={value}
              />
            )}
            name="style"
            defaultValue={oldData?.style}
          />
          {errors.style && (
            <FormControl.ErrorMessage color={"red.500"}>
              <Text color={"red.500"}>{errors.style.message}</Text>
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>PO</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                placeholder="PO"
                type="text"
                defaultValue={oldData?.po}
                onChangeText={val => onChange(val)}
                value={value}
              />
            )}
            name="po"
            defaultValue={oldData?.po}
          />
          {errors.po && (
            <FormControl.ErrorMessage color={"red.500"}>
              <Text color={"red.500"}>{errors.po.message}</Text>
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <>
          <FormControl.Label>Other Info</FormControl.Label>
          <Box alignItems="center" w="100%">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextArea
                  h={20}
                  w="100%"
                  maxW="300"
                  defaultValue={oldData?.other_info}
                  autoCompleteType={true}
                  onBlur={onBlur}
                  placeholder="Other Info"
                  type="text"
                  onChangeText={val => onChange(val)}
                  value={value}
                />
              )}
              name="other_info"
              defaultValue={oldData?.other_info}
            />
          </Box>
        </>

        <Divider />
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={5}
          mb={5}
        >
          <Button.Group space={2}>
            <Button
              isLoading={isLoading}
              colorScheme="success"
              onPress={() => {
                productMutate({
                  id: oldData?.product_id,
                  name: getValues("name"),
                  color: getValues("color"),
                  style: getValues("style"),
                  total_qty: getValues("total_qty"),
                  other_info: getValues("other_info"),
                  type: getValues("type"),
                  po: getValues("po"),
                });
              }}
            >
              Update Product
            </Button>
          </Button.Group>
        </Box>
      </Box>
    </ScrollView>
  );
}

export default UpdateProduct;
