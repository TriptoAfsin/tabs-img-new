import React from "react";
import { VStack, Box, Divider, Text } from "native-base";
import commaFormat from "../app/utils/commaFormat";

export default function Card({ name, color, qty, type = "", style }) {
  const units = {
    yarn: "yds",
    dyes: "gms",
    accessories: "pcs",
    fabric: "yds",
    needle: "pcs",
  };
  return (
    <Box
      borderRadius="md"
      my={2}
      background={"#333333"}
      py={2}
      w={`95%`}
      ml={"2.5%"}
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
                minW={"230px"}
              >
                {name}
              </Text>
              <Text color={"white"} fontWeight={600} mr={5} ml={"auto"}>
                Qty: {commaFormat(qty)} {units[type?.toLocaleLowerCase()]}
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
               
              >
                Color: {color}
              </Text>
            </Box>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}
