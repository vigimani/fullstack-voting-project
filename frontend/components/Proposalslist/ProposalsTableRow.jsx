import {
    Badge,
    Flex,
    Td,
    Text,
    Tr,
    Icon,
    Button,
    useToast,
  } from "@chakra-ui/react";
  import React from "react";
  import { useState, useEffect } from "react";
  import { FaBook } from "react-icons/fa";
  import { useAccount, useSigner, useProvider } from "wagmi";
  import { ethers } from "ethers";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting";

export function ProposalsTableRow(props) {
    const [isloading, setIsloading] = useState(false);
    const { data: signer } = useSigner();
    const { address, isConnected } = useAccount();
    const provider = useProvider();
    const toast = useToast();
    const contractAddress = process.env.NEXT_PUBLIC_SCADDRESS;


    const setMyvote =  async(id) => {
      setIsloading(true);
      try {
        const contract = new ethers.Contract(
          contractAddress,
          Contract.abi,
          signer
        );
        console.log(id)
        let x = await contract.setVote(id);
        await x.wait(1);
        toast({
          title: "Vote registered !",
          description:
            "Your vote has been taken into account",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (e) {
        console.log(e)
        toast({
          title: "Error",
          description: "An error occured, please try again...",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      setIsloading(false);
    }

    const { id, description, listhasvoted, phase } = props;

    return (

<Tr>
        <Td pl="0px">
          <Flex align="center"  flexWrap="nowrap">
            <Icon as={FaBook} mr="3" />
            <Flex direction="column">
              <Text
                fontSize="md"
                color={"gray.700"}
                fontWeight="bold"
                minWidth="100%"
              >
                {id}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td>
          <Text fontSize="md" color={"gray.700"} fontWeight="bold" pb=".5rem">
            {description}
          </Text>
        </Td>
        {listhasvoted.map((e) => e.address).includes(address) ? (
          listhasvoted[listhasvoted.map((e) => e.address).indexOf(address)].id.toString()==id ? (
            <Td>
            <Badge
            bg="green.400"
            color={"white"}
            fontSize="16px"
            p="3px 10px"
            borderRadius="8px"
          >
            Your vote
          </Badge>
          </Td>
          ):
          ( <Td><Text></Text></Td>)  
        ):
        (        
        <Td>
          {phase >2 ? (        <Button p="0px" bg="transparent" variant="no-hover" onClick={()=> setMyvote(id)}>
          <Text
            fontSize="md"
            color="gray.400"
            fontWeight="bold"
            cursor="pointer"
          >
            Vote
          </Text>
        </Button>):(<Text></Text>)}

        </Td>
        )}

      </Tr>
    );
}
