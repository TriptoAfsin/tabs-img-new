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
import { useAddProduct } from "../../hooks/api/useAddProduct";

function AddProduct({ ref, setModal }) {
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
  const { mutate: productMutate, isLoading } = useAddProduct(
    () => {
      console.log("success");
      toast.show({
        render: () => {
          return (
            <Box bg="#0f9d58" px="2" py="1" rounded="sm" mb={5} color={"white"}>
              <Text color={"white"}>Product Added Successfully 😁</Text>
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
              />
            )}
            name="name"
            defaultValue=""
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
              />
            )}
            name="color"
            defaultValue=""
          />
          {errors.color && (
            <FormControl.ErrorMessage color={"red.500"}>
              <Text color={"red.500"}>{errors.color.message}</Text>
            </FormControl.ErrorMessage>
          )}
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Type</FormControl.Label>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Select
                  selectedValue={value}
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
            defaultValue=""
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
                onChangeText={val => onChange(val)}
                value={value}
              />
            )}
            name="total_qty"
            defaultValue=""
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
                onChangeText={val => onChange(val)}
                value={value}
              />
            )}
            name="style"
            defaultValue=""
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
                onChangeText={val => onChange(val)}
                value={value}
              />
            )}
            name="po"
            defaultValue=""
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
                  autoCompleteType={true}
                  onBlur={onBlur}
                  placeholder="Other Info"
                  type="text"
                  onChangeText={val => onChange(val)}
                  value={value}
                />
              )}
              name="other_info"
              defaultValue=""
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
          <Button.Group space={2} colorScheme="success">
            <Button
              colorScheme="success"
              isLoading={isLoading}
              onPress={() => {
                productMutate({
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
              Add Product
            </Button>
          </Button.Group>
        </Box>
      </Box>
    </ScrollView>
  );
}

export default AddProduct;
