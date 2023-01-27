import React from "react";
import {
  Text,
  Flex,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";

export default function Minicard(props) {
  const {title, number, icon} = props
  return (
    <>
      <Card borderRadius="20" w="22%" minH="83px">
        <CardBody>
          <Flex flexDirection="row" align="center" justify="center" w="100%">
            <Stat me="auto">
              <StatLabel
                fontSize="sm"
                color="gray.400"
                fontWeight="bold"
                pb=".1rem"
              >
                {title}
              </StatLabel>
              <Flex>
                <StatNumber fontSize="lg" color={"gray.700"}>
                  {number}
                </StatNumber>
              </Flex>
            </Stat>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={"12px"}
              h={"45px"}
              w={"45px"}
              bg={"#e2e6f7"}
            >
              {icon}
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}
