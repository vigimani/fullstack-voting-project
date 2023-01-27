import {
  Heading,
  HStack,
  Image,
  Box,
  Flex,
} from "@chakra-ui/react";

export default function HeaderNavbar({}) {
  return (
    <Box>
      <HStack ml="30px" mr="50px" minH="100px">
        <Image src="/Logo_vote.svg" boxSize="70px" alt="logo" />
        <Flex>
        <Heading fontWeight={"black"} as="b" fontSize="3xl" color="594B7E" noOfLines={2}>
          Voting Game
        </Heading>
        </Flex>
      </HStack>
      </Box>
  );
}
