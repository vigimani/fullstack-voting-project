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
  const { title, number, icon, width, bg, proposal, votes } = props;
  return (
    <>
      <Card borderRadius="20" width={width} minH="83px" bg={bg}>
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
                  <br></br>
                  <strong>{proposal}</strong>
                  <br></br>
                  <i>{votes}</i>
                </StatNumber>
              </Flex>
            </Stat>
            <Flex
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={"12px"}
              h={"45px"}
              w={"45px"}
              bg={"#1f222e"}
              color="white"
              size="50"
            >
              {icon}
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}
