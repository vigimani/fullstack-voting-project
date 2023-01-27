// Chakra imports
import React from "react";
import { useState, useEffect  } from "react";
import { ethers } from "ethers";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting";
import { useAccount, useProvider, useSigner } from "wagmi";
import Addproposal from "./Addproposal";

//import for children
import {
  Heading,
  Flex,
  useToast,
  Card,
  CardHeader,
  CardBody,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Button,
  useDisclosure,
  Td,
  Spinner
} from "@chakra-ui/react";
import { ProposalsTableRow } from "./ProposalsTableRow";

import {
  IconButton,
  InputGroup,
  InputLeftAddon,
  Icon,
  Collapse,
  Textarea,
} from "@chakra-ui/react";
import { FaBook } from "react-icons/fa";

import { ImUserPlus } from "react-icons/im";
import {MdCancel, MdLibraryAdd} from "react-icons/md"
import {FcIdea} from "react-icons/fc"


export default function ProposalsTable({listhasvoted}) {
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const toast = useToast();
  const [isOwner, setIsOwner] = useState(false);
  const { isOpen, onToggle } = useDisclosure()
  const [proposalslist, setProposalslist] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const contractAddress = process.env.NEXT_PUBLIC_SCADDRESS;

  const { data: signer } = useSigner();
  const [isloading, setIsloading] = useState(false);
  const [newproposal, setNewproposal] = useState("");


  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      },
      false
    );
  }, []);

  useEffect(() => {
    if (isConnected) {
      getEvents();
    }
  }, []);

  useEffect(() => {
    const contract = new ethers.Contract(
      contractAddress,
      Contract.abi,
      provider
    );
    contract.on("ProposalRegistered", () => {
      getEvents()
    })
    return () => {
      contract.removeAllListeners();
  };
  }, [])


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
    setNewproposal("");
    setIsloading(false);
    onToggle();
  }

  const getEvents = async () => {
    const contract = await new ethers.Contract(
      contractAddress,
      Contract.abi,
      provider
    );
    const filter = { address: contractAddress, fromBlock: 0 };
    let events = await contract.queryFilter(filter, 0);
    let proposalsSubmitteddEvents = [];
    events.forEach((event) => {
      if (event.event === "ProposalRegistered") {

        let thisProposal = {
          id: event.args.proposalId.toString(),
          description: event.args.description,
        };
        proposalsSubmitteddEvents.push(thisProposal);
      }
    });
    setProposalslist(proposalsSubmitteddEvents);
  };

  const captions = ["Id", "Description", " "];

  return (
    <Card
      w="49.5%"
      borderRadius="20"
      h={dimensions.height - 109 - 91.59 - 541.2 + 433.61 + 85}
      overflowX={{ sm: "scroll", xl: "hidden" }}
    >
      <CardHeader w="100%" p="6px 0px 2px 0px">

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
          <Flex borderRadius="20" ml="2rem" mr="2rem" p="2rem" bg="#e2e6f7" direction="column">
          <Flex p="2rem" borderRadius="20" borderWidth={"3px"} borderColor={"#9face6"} bg="white" ml="2rem" mr="2rem" direction="column" >
          <Heading mb="2px" size={"lg"} borderBottomWidth="1px"><Icon as={FcIdea} /> Enter the description of your proposal</Heading>
          <Flex direction="column">
            <InputGroup>
              <Textarea
                mt="1rem"
                placeholder="Enter the description of your proposal, 100 proposals are allowed for the whole game"
                onChange={(e) => setNewproposal(e.target.value)}
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

      </CardHeader>
      <CardBody>
        <Table variant="simple" color={"gray.700"}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => {
                return (
                  <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>

            {proposalslist.map((a, index) => {
              return (
                <ProposalsTableRow
                  key={index}
                  id={a.id}
                  listhasvoted={listhasvoted}
                  description={
                    a.description ? (
                      a.description
                    ) : (
                      <Spinner
                        size="md"
                        thickness="5px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="#9face6"
                      />
                    )
                  }
                />);
            })}
            

          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
