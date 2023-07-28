import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Box, Divider, Text, VStack } from "native-base";
import React from "react";

export default function RackCard({ rackId, cellsArr, rackName }) {
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
        <Box
          px="4"
          display={"flex"}
          flexDir={"row"}
          minH={"100px"}
          minW={"300px"}
        >
          <Box display={"flex"} flexDir={"column"}>
            <Box display={"flex"} flexDir={"row"}>
              <FontAwesome
                name="table"
                size={40}
                color={"#f3f4f6"}
                style={{ marginRight: 20 }}
              />
              <Text color={"white"} fontWeight={600} fontSize={20} mr={5}>
                {`${rackName}`}
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
                ID: {rackId}
              </Text>
              <Text
                color={"white"}
                py={0.5}
                px={1}
                bg={"#c5221f"}
                borderRadius="md"
                mr={1}
              >
                {cellsArr?.length} Cells
              </Text>
            </Box>
          </Box>
        </Box>
      </VStack>
    </Box>
  );
}
