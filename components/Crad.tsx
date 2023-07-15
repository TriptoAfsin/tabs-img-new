import React from "react";
import { VStack, Box, Divider, Text } from "native-base";
import { Dimensions } from "react-native";

export default function Card({ name, color, qty, type, style }) {
  return (
    <Box borderRadius="md" my={2} background={"#333333"} py={2} w={`95%`} mr={1} ml={1}>
      <VStack space="4" divider={<Divider />}>
        <Box px="4" display={"flex"} flexDir={"row"} minH={"100px"}>
          <Box display={"flex"} flexDir={"column"}>
            <Box display={"flex"} flexDir={"row"}>
              <Text color={"white"} fontWeight={600} fontSize={20} mr={5}>
                {name}
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
                px={1}
                bg={"#c5221f"}
                borderRadius="md"
                mr={1}
              >
                {type}
              </Text>
              <Text
                color={"white"}
                py={0.5}
                px={1}
                bg={"#4285f4"}
                borderRadius="md"
                mr={1}
              >
                Style: {style}
              </Text>
              <Text
                color={"white"}
                py={0.5}
                px={1}
                bg={"#16a05d"}
                borderRadius="md"
                mt={1}
              >
                Color: {color}
              </Text>
            </Box>
          </Box>
          <Text color={"white"} fontWeight={600} mr={5} ml={'auto'}>
            Qty: {qty}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
