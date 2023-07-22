import { Input, Box, Button } from "native-base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable } from "react-native";

const Search = () => {
  return (
    <Box display={"flex"} flexDir={"column"} alignItems={"center"}>
      <Box display={"flex"} flex={"row"} flexWrap={"wrap"}></Box>
      <Input
        mx="3"
        placeholder="Product name"
        w="90%"
        mt={5}
        color={"white"}
        py={2}
      />
      <Box display={"flex"} flexDir={"column"} alignItems={"center"}>
        <Pressable>
          <Button
            colorScheme="success"
            //    isLoading={isLoading}
            leftIcon={<FontAwesome name="search" size={20} color={"#f3f4f6"} />}
          >
            Search
          </Button>
        </Pressable>
      </Box>
    </Box>
  );
};

export default Search;
