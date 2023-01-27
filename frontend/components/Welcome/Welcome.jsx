import { Flex, Alert, AlertIcon, Heading, Text } from "@chakra-ui/react";
import { MetamaskButton } from "../Utils/MetamaskButton";
import HeaderNavbar from "../Navbar/HeaderNavbar";

export default function Welcome({ children }) {
  return (
    <>
      <Flex mt="2rem" direction="column" w="100%" alignItems={"center"}>
        <Flex
          bg="#e2e6f7"
          height="80vh"
          width="75%"
          borderRadius="20px"
          justifyContent={"space-between"}
        >
          <HeaderNavbar />
          <Flex
            width="50%"
            alignItems="center"
            justifyContent="center"
            borderRadius="20px"
            flexDirection="column"
          >
            <Flex fontWeight={"extrabold"} mb="3rem">
              <Heading>Welcome to Voting Game</Heading>
            </Flex>
            <Text mb="5rem">
              If you are not registered as a player you can still watch the game
            </Text>

            <Flex
              direction="column"
              h="45vh"
              justifyContent="center"
              alignItems="center"
            >
              <MetamaskButton />
              <Alert mt="1rem" status="warning" w="auto" borderRadius="10px">
                <AlertIcon />
                Connect to Metamask to use the Dapp
              </Alert>
            </Flex>
          </Flex>
          <Flex w="180px"></Flex>
        </Flex>
      </Flex>
    </>
  );
}
