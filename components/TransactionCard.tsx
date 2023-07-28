import { Box, Divider, Text, VStack } from "native-base";
import React from "react";
import { useGetProductById } from "../hooks/api/useGetProductById";

export default function TransactionCard({
  actionType,
  productId,
  qty,
  timestamp,
  transactionId,
}) {
  const {
    isLoading: isProductLoading,
    data: productData,
    refetch: refetchProduct,
  } = useGetProductById(parseInt(productId));
  console.log(productData?.data?.product[0]);
  return (
    <Box
      borderRadius="md"
      my={2}
      background={actionType === "add" ? "#17a05e" : "#ea4335"}
      py={2}
      w={`95%`}
      ml={"2.5%"}
    >
      <VStack space="4" divider={<Divider />}>
        <Box px="4" display={"flex"} flexDir={"row"} minH={"100px"}>
          <Box display={"flex"} flexDir={"column"}>
            <Box display={"flex"} flexDir={"row"}>
              <Text color={"white"} fontWeight={600} fontSize={15} mr={5}>
                {isProductLoading ? "⌛" : productData?.data?.product[0]?.name}
              </Text>
            </Box>
            <Box
              mt={2}
              mb={2}
              display={"flex"}
              flexDir={"row"}
              flexWrap={"wrap"}
            >
              <Text
                color={"white"}
                py={0.5}
                px={2}
                bg={"#000000"}
                borderRadius="md"
                mr={1}
                minW={"50px"}
                textAlign={"center"}
              >
                {actionType?.toUpperCase()}
              </Text>
            </Box>
            <Text
              color={"white"}
              py={0.5}
              px={1}
              bg={""}
              borderRadius="md"
              mr={1}
            >
              🕑{timestamp}
            </Text>
          </Box>
          <Text
            color={"white"}
            fontWeight={600}
            mr={5}
            ml={"auto"}
            minW={"50px"}
          >
            Qty: {qty}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
