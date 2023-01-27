import { Heading, Flex, Text, Progress } from "@chakra-ui/react";
import ProgressBar from "./Progressbar";
import { wfstatus } from "../Utils/helper";

export const Header = ({ isOwner, phase }) => {
  return (
    <Flex p="0.5rem" justifyContent={"space-between"}>
      <Flex w="100%">
        <Text
          color="#1f222e"
          mt="1rem"
          fontSize="3xl"
          fontWeight={"bold"}
          p="1rem"
        >
          {wfstatus[phase]}
        </Text>
      </Flex>

      <Flex alignItems={"center"} w="100%">
        <Flex w="100%">
          <ProgressBar progress={((phase + 1) * 100) / 6 + "%"} />
        </Flex>
      </Flex>

      <Flex w="100%" alignItems="center" flexDirection={"row-reverse"}>
        <Heading
          color="#1f222e"
          mt="1rem"
          alignItems={"center"}
          fontSize="xl"
          fontWeight={"thin"}
          p="1rem"
          boxShadow="dark-lg"
          borderRadius="300"
        >
          {isOwner ? "Administrator" : "User"}
        </Heading>
      </Flex>
    </Flex>
  );
};
