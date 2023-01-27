
import React from "react";
import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting";
import { useSigner } from "wagmi";
import {
  Heading,
  IconButton,
  Flex,
  Button,
  InputGroup,
  useToast,
  Icon,
  useDisclosure,
  Collapse,
  Textarea,
} from "@chakra-ui/react";
import { ImUserPlus } from "react-icons/im";
import {MdCancel, MdLibraryAdd} from "react-icons/md"
import {FcIdea} from "react-icons/fc"

export default function Addproposal({ setProposalslist }) {
  const { data: signer } = useSigner();
  const toast = useToast();
  const [isloading, setIsloading] = useState(false);
  const [newproposal, setNewproposal] = useState("");
  const { isOpen, onToggle } = useDisclosure();
  const contractAddress = process.env.NEXT_PUBLIC_SCADDRESS;

  const addProposal = async () => {
    setIsloading(true);
    try {
      const contract = await new ethers.Contract(
        contractAddress,
        Contract.abi,
        signer
      );
      let x = await contract.addProposal(newproposal);
      await x.wait(1);
      toast({
        title: "Congratulation!",
        description:
          "Your have added a new proposition",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setProposalslist((current) => [...current, newproposal]);
    } catch (e) {
        toast({
          title: "Error",
          description: "An error occured, please try again...",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      setIsloading(false);
      onToggle();
      setNewproposal("");
    }
  
  return (
    <>
      <Flex w="100%" justifyContent={"space-between"}>
        <Heading
          mt="1rem"
          ml="4"
          fontSize="xl"
          color={"gray.700"}
          fontWeight={"extrabold"}
          mb="1rem"
          as="h3"
          size="lg"
        >
          List of Proposals
        </Heading>
        <Button
          color="white"
          bg="#1f222e"
          leftIcon={<ImUserPlus />}
          mt="2"
          borderRadius="10"
          mr="4"
          onClick={onToggle}
        >
          Add Proposal
        </Button>
        </Flex>
       <Collapse in={isOpen} animateOpacity>
          <Flex p="2rem" bg="#e2e6f7" direction="column">
          <Flex p="2rem" borderRadius="20" borderWidth={"3px"} borderColor={"#9face6"} bg="white" ml="2rem" mr="2rem" direction="column" >
          <Heading mb="2px" size={"lg"} borderBottomWidth="1px"><Icon as={FcIdea} /> Enter the description of your proposal</Heading>
          <Flex direction="column">
            <InputGroup>
              <Textarea
                mt="1rem"
                placeholder="Enter the description of your proposal, 100 proposals are allowed for the whole game"
                onChange={(e) => setNewproposal(e.target.value)}
                value={newproposal}
              ></Textarea>
            </InputGroup>
          </Flex>
          <Flex mt="1rem" direction={"row-reverse"}>
            <IconButton
              mt="2"
              borderRadius="10"
              mr="2rem"
              variant="outline"
              onClick={onToggle}
              icon={<MdCancel/>}
            >
              Cancel
            </IconButton>
            {!isloading ? (
            <Button
              color="white"
              bg="#1f222e"
              leftIcon={<MdLibraryAdd />}
              mt="2"
              borderRadius="10"
              mr="4"
              onClick={() => addProposal()}
            >
              Add
            </Button>
            ): (
                <Button
                color="white"
                bg="#1f222e"
                isLoading
                loadingText='Submitting'
                mt="2"
                borderRadius="10"
                mr="4"
              >
                Submit
              </Button>
            )}
          </Flex>
          </Flex>
          </Flex>
        </Collapse>
    </>
  );
}
