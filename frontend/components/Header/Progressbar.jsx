import React from "react";
import { Text, Flex } from "@chakra-ui/react";

export default function ProgressBar({ progress }) {
  return (
    <Flex w="100%" direction="column" alignItems="center">
      <Text fontWeight={"bold"}>{parseInt(progress).toFixed() + "%"}</Text>
      <Flex
        h="20px"
        border="2px"
        bg="white"
        borderColor={"#1f222e"}
        w="100%"
        borderRadius={"30px"}
      >
        <Flex
          h="18px"
          bg="#1f222e"
          borderColor={"#1f222e"}
          w={progress}
          borderRadius={"30px"}
        ></Flex>
      </Flex>
    </Flex>
  );
}
