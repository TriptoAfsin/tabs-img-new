import React from "react";
import { Input, FormControl, Button, Box, Divider } from "native-base";

function UpdateProduct({ ref, setModal, oldData }) {
  return (
    <Box display={"flex"} flexDir={"column"}>
      <FormControl>
        <FormControl.Label>Name</FormControl.Label>
        <Input ref={ref} defaultValue={oldData?.name} />
      </FormControl>
      <FormControl mt="3">
        <FormControl.Label>Color</FormControl.Label>
        <Input defaultValue={oldData?.color} />
      </FormControl>
      <FormControl mt="3">
        <FormControl.Label>Type</FormControl.Label>
        <Input defaultValue={oldData?.type} />
      </FormControl>
      <FormControl mt="3">
        <FormControl.Label>Quantity</FormControl.Label>
        <Input defaultValue={oldData?.total_qty} />
      </FormControl>
      <FormControl mt="3">
        <FormControl.Label>Style</FormControl.Label>
        <Input defaultValue={oldData?.style} />
      </FormControl>
      <FormControl mt="3">
        <FormControl.Label>PO</FormControl.Label>
        <Input defaultValue={oldData?.po} />
      </FormControl>
      <FormControl mt="3">
        <FormControl.Label>Other Info</FormControl.Label>
        <Input defaultValue={oldData?.other_info}/>
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
        <Button.Group space={2}>
          <Button
            onPress={() => {
              setModal(false);
            }}
          >
            Update Product
          </Button>
        </Button.Group>
      </Box>
    </Box>
  );
}

export default UpdateProduct;
