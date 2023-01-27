import React from "react";
import { useState } from "react";
import { ethers } from "ethers";
// import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting";
import { abi } from "../Utils/helper";
import { useSigner } from "wagmi";
import {
  Heading,
  Input,
  Flex,
  Button,
  InputGroup,
  InputLeftAddon,
  useToast,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  Icon,
  useDisclosure,
  DrawerCloseButton,
  FormLabel,
  DrawerFooter,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { ImUserPlus } from "react-icons/im";

export default function Addvoter({ setVoterslist }) {
  const { data: signer } = useSigner();
  const toast = useToast();
  const [isloading, setIsloading] = useState(false);
  const [newvoter, setNewvoter] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const contractAddress = process.env.NEXT_PUBLIC_SCADDRESS;

  const addAVoter = async () => {
    setIsloading(true);
    try {
      const contract = await new ethers.Contract(
        contractAddress,
        abi,
        signer
      );
      let x = await contract.addVoter(newvoter);
      await x.wait(1);
      toast({
        title: "New voter added",
        description:
          "Your have added " + newvoter.toString() + " to the voting session",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setVoterslist((current) => [...current, newvoter]);
    } catch (e) {
      if (e.code == "INVALID_ARGUMENT") {
        toast({
          title: "Error",
          description:
            "The address does not exist, make sure to write the address in the adequate format 0x...",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "An error occured, please try again...",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
    setIsloading(false);
    onClose();
    setNewvoter("");
  };

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
          List of Voters
        </Heading>
        <Button
          color="white"
          bg="#1f222e"
          leftIcon={<ImUserPlus />}
          mt="2"
          borderRadius="10"
          mr="4"
          onClick={onOpen}
          // onClick={onToggle}
        >
          Add Voter
        </Button>
      </Flex>
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Add a new voter</DrawerHeader>

          <DrawerBody>
            <FormLabel mt="2rem">
              Wallet Address to whitelist for the vooting session
            </FormLabel>
            <InputGroup>
              {newvoter.length == 42 ? (
                <InputLeftAddon
                  mt="1rem"
                  bg="green.100"
                  children={<Icon color="#9face6" as={FaUser} />}
                />
              ) : (
                <InputLeftAddon mt="1rem" children={<Icon as={FaUser} />} />
              )}
              <Input
                mt="1rem"
                placeholder="wallet address 42 hex string characters -> 0x..."
                onChange={(e) => setNewvoter(e.target.value)}
                bg={newvoter.length == 42 ? "green.100" : "white"}
              ></Input>
            </InputGroup>
          </DrawerBody>
          <DrawerFooter>
            <Button
              mt="2"
              borderRadius="10"
              mr="4"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            {!isloading ? (
              <Button
                color="white"
                bg="#1f222e"
                leftIcon={<ImUserPlus />}
                mt="2"
                borderRadius="10"
                mr="4"
                onClick={() => addAVoter()}
              >
                Submit
              </Button>
            ) : (
              <Button
                color="white"
                bg="#1f222e"
                isLoading
                loadingText="Submitting"
                mt="2"
                borderRadius="10"
                mr="4"
              >
                Submit
              </Button>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
