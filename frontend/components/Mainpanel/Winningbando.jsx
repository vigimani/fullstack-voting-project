import React from "react";
import { Flex } from "@chakra-ui/react";
import { FaBook, FaUser, FaWallet, FaVoteYea } from "react-icons/fa";
import Minicard from "./Minicard";
import { useAccount } from "wagmi";
import {MdStars} from "react-icons/md"

export default function Winningbando({
  winningProposal
}) {
  return (
    <>
      <Flex mb="1rem" w="100%">
        <Flex w="100%" flexDirection={"row"} justifyContent="space-between">
            <Minicard
              title={"Winning proposal"}
              number={"Proposal "+winningProposal[1].toString()}
              proposal={winningProposal[0]}
              votes={winningProposal.voteCount.toString()+" votes"}
              icon={<MdStars size="335" color="yellow"/>}
              width={"100%"}
              bg="#f3f8f1"
            />
        </Flex>
      </Flex>
    </>
  );
}
