import {
  Box,
  Grid,
  GridItem,
  Text,
  Button,
  Flex,
  Divider,
} from "@chakra-ui/react";
import HeaderNavbar from "./HeaderNavbar";
import { Workflowstatus } from "../Workflowstatus/Workflowstatus";
import FooterNavBar from "./FooterNavbar";
import { Separator } from "../Utils/Separator";

export const Navbar = ({ isOwner, phase, setPhase }) => {
  return (
    <Flex p="0.5rem" bg="#e2e6f7" direction="column" h="100vh">
      <Flex
        bg="white"
        direction="column"
        width="100%"
        h="100vh"
        borderRadius="20"
      >
        <Flex alignItems="center" justifyContent="center">
          <HeaderNavbar />
        </Flex>
        <Flex>
          <Separator></Separator>
        </Flex>
        <Flex
          display="flex"
          direction="column"
          h="100%"
          justifyContent="space-between"
        >
          <Flex h="100%" justifyContent="center">
            <Workflowstatus phase={phase} setPhase={setPhase}/>
          </Flex>
          <Separator></Separator>
        </Flex>
        <Separator></Separator>
        <Flex mt="1rem" flexDirection={"column"}>
          <Flex mb="2rem" h="100%">
            <FooterNavBar />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
