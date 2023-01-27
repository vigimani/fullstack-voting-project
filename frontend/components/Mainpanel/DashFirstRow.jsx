import React from "react";
import { Flex } from "@chakra-ui/react";
import { FaBook, FaUser, FaWallet, FaVoteYea } from "react-icons/fa";
import Minicard from "./Minicard";
import { useAccount } from "wagmi";

export default function DashFirstRow({
  voterslist,
  proposalslist,
  listhasvoted,
}) {
  const { address } = useAccount();

  return (
    <>
      <Flex mb="1rem" w="100%">
        <Flex w="100%" flexDirection={"row"} justifyContent="space-between">
          <Minicard
            title={"Number of players"}
            number={voterslist.length}
            icon={<FaUser size="25"/>}
            width={"24%"}
          />
          <Minicard
            title={"Number of proposals"}
            number={proposalslist.length}
            icon={<FaBook size="25"/>}
            width={"24%"}
          />
          <Minicard
            title={"Number of votes"}
            number={listhasvoted.length}
            icon={<FaVoteYea size="25"/>}
            width={"24%"}
          />
          <Minicard
            title={"Connected with wallet"}
            number={
              address.substring(0, 5) +
              "..." +
              address.substring(address.length - 4)
            }
            icon={<FaWallet size="25"/>}
            width={"24%"}
          />
        </Flex>
      </Flex>
    </>
  );
}
