import {
  List,
  ListItem,
  ListIcon,
  Box,
  Button,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  SettingsIcon,
  NotAllowedIcon,
} from "@chakra-ui/icons";
import { ImNext } from "react-icons/im";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting";
import { useAccount, useProvider, useSigner } from "wagmi";
import { wfstatus } from "../Utils/helper";

export const Workflowstatus = ({ phase, setPhase }) => {
  const { data: signer } = useSigner();
  const contractAddress = process.env.NEXT_PUBLIC_SCADDRESS;

  const nextphase = async () => {
    const contract = await new ethers.Contract(
      contractAddress,
      Contract.abi,
      signer
    );
    switch (phase) {
      case 0:
        let wf_p0 = await contract.startProposalsRegistering();
        await wf_p0.wait(1);
        setPhase(1);
        break;
      case 1:
        let wf_p1 = await contract.endProposalsRegistering();
        await wf_p1.wait(1);
        setPhase(2);
        break;
      case 2:
        let wf_p2 = await contract.startVotingSession();
        await wf_p2.wait(1);
        setPhase(3);
        break;
      case 3:
        let wf_p3 = await contract.endVotingSession();
        await wf_p3.wait(1);
        setPhase(4);
        break;
      case 4:
        let wf_p4 = await contract.tallyVotes();
        await wf_p4.wait(1);
        setPhase(5);
        break;
    }
  };

  return (
    <Box overflow="hidden" w="100%" ml="5px">
      <Flex direction="column" alignItems="center" w="100%">
        <Box
          mt="5"
          w="100%"
          textAlign={"center"}
          fontWeight="bold"
          as="h1"
          lineHeight="tight"
          noOfLines={1}
        >
          Workflow of the game
        </Box>
      </Flex>

      <List mt="3rem" mb="3rem" p="1rem" spacing={3}>
        {wfstatus.map((wf, index) => {
          return (
            <ListItem key={index}>
              <HStack>
                {phase > index ? (
                  <ListIcon as={CheckCircleIcon} color="green.500" />
                ) : phase == index ? (
                  <ListIcon as={SettingsIcon} color="green.500" />
                ) : phase == index - 1 ? (
                  <ListIcon as={ImNext} color="blue.500" />
                ) : (
                  <ListIcon as={NotAllowedIcon} color="red.500" />
                )}
                <Text fontWeight={"bold"}>{wf}</Text>
              </HStack>
            </ListItem>
          );
        })}
      </List>
      <Flex h="100%" justifyContent="center">
        <Button
          color="white"
          bg="#1f222e"
          // leftIcon={<ImNext />}
          mt="2"
          borderRadius="10"
          mr="4"
          onClick={() => nextphase()}
        >
          Next step
        </Button>
      </Flex>
    </Box>
  );
};
