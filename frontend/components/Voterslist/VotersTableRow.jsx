import { Badge, Flex, Td, Text, Tr, Icon } from "@chakra-ui/react";
import React from "react";
import { FaUser } from "react-icons/fa";
import { TimeIcon } from "@chakra-ui/icons";
import { AiFillCheckCircle } from "react-icons/ai";
export function VotersTableRow(props) {
  const { subaddress, fulladdress, listhasvoted } = props;
  return (
    <Tr>
      <Td pl="0px">
        <Flex align="center" flexWrap="nowrap">
          <Icon as={FaUser} mr="3" />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={"gray.700"}
              fontWeight="bold"
              minWidth="100%"
            >
              {subaddress}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {fulladdress}
            </Text>
          </Flex>
        </Flex>
      </Td>
      {listhasvoted.map((e) => e.address).includes(fulladdress) ? (
        <Td>
          <Badge
            bg={"white"}
            color={"white"}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            <AiFillCheckCircle size="25" color="green" />{" "}
          </Badge>
        </Td>
      ) : (
        <Td>
          <Badge
            bg={"white"}
            color={"white"}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            <TimeIcon color="gray.400" boxSize="6" />
          </Badge>
        </Td>
      )}
    </Tr>
  );
}
