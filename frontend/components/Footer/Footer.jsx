import { Flex, Text } from '@chakra-ui/react'
export const Footer = () => {
  return (
    <Flex  w="100%" bg="#e2e6f7">
    <Flex flexDirection={"row-reverse"}  alignItems={"flex-end"} w="100%">
      <Flex
        p="1rem"
        justifyContent="right"
        alignItems="flex-end"
      >
        <Text>
          &copy;  {new Date().getFullYear()} made by Victor G. for Alyra project {" "}
        </Text>
      </Flex>
    </Flex>
    </Flex>
  )
};

