import React from "react";
import {
  Flex,
} from "@chakra-ui/react";
import { FaBook } from "react-icons/fa";
import Minicard from "./Minicard";

export default function DashFirstRow() {
  return (
    <>
      <Flex mb="1rem" w="100%">
        <Flex w="100%" flexDirection={"row"} justifyContent="space-between">
          <Minicard title={"Number of voters"} number={3} icon={<FaBook />}/>
          <Minicard title={"Number of voters"} number={3} icon={<FaBook />}/>
          <Minicard title={"Number of voters"} number={3} icon={<FaBook />}/>
          <Minicard title={"Number of voters"} number={3} icon={<FaBook />}/>
        </Flex>
      </Flex>
    </>
  );
}
