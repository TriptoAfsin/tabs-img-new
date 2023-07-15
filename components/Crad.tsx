import React from "react";
import { VStack, Box, Divider, Text } from "native-base";
import { Dimensions } from "react-native";

export default function Card({ name, color, qty, type, style }) {
  return (
    <Box
      borderRadius="md"
      my={2}
      background={"#121212"}
      py={2}
      w={`${Dimensions?.get("window")}px`}
    >
      <VStack space="4" divider={<Divider />}>
        <Box px="4" display={"flex"} flexDir={"row"} minH={"100px"}>
          <Box display={"flex"} flexDir={"column"}>
            <Box display={"flex"} flexDir={"row"}>
              <Text
                color={"white"}
                fontWeight={600}
                fontSize={20}
                mr={5}
                minW={`${Dimensions?.get("window")}px`}
              >
                {name}
              </Text>
            </Box>
            <Box
              mt={2}
              mb={2}
              display={"flex"}
              flexDir={"row"}
              maxW={"70vw"}
              flexWrap={"wrap"}
            >
              <Text
                color={"white"}
                py={0.5}
                px={1}
                bg={"#c5221f"}
                borderRadius="md"
                minW={"100px"}
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
          <Text color={"white"} fontWeight={600} mr={5}>
            Qty: {qty}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
