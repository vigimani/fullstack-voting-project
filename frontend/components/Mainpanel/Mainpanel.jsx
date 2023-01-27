import { Flex, useToast } from "@chakra-ui/react";
import DashFirstRow from "./DashFirstRow";
import VotersTable from "../Voterslist/VotersTable";
import ProposalsTable from "../Proposalslist/ProposalsTable";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
// import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting";
import { useAccount, useProvider } from "wagmi";
import Winningbando from "./Winningbando";
import { abi } from "../Utils/helper";

//Renders the main dashboard 
export default function Mainpanel({ isOwner, phase }) {
  const { isConnected } = useAccount();
  const provider = useProvider();
  const contractAddress = process.env.NEXT_PUBLIC_SCADDRESS;
  const [voterslist, setVoterslist] = useState([]);
  const [proposalslist, setProposalslist] = useState([]);
  const [listhasvoted, setListhasvoted] = useState([]);
  const [winningProposal, setWinningProposal] = useState();

  useEffect(() => {
    if (isConnected) {
      getVoterslist();
      getProposalslist();
      getVoteEvent();
      if (phase == 5) {
        getWinningProposal();
      }
    }
  }, []);

  useEffect(() => {
    const contract = new ethers.Contract(
      contractAddress,
      abi,
      provider
    );
    contract.on("VoterRegistered", () => {
      getVoterslist();
    });
    contract.on("ProposalRegistered", () => {
      getProposalslist();
    });
    contract.on("Voted", () => {
      getVoteEvent();
    });
    contract.on("WorkflowStatusChange", () => {
      getWinningProposal();
    });
    return () => {
      contract.removeAllListeners();
    };
  }, []);

  useEffect(() => {}, [winningProposal]);

  const getEvents = async () => {
    const contract = await new ethers.Contract(
      contractAddress,
      abi,
      provider
    );
    const filter = { address: contractAddress, fromBlock: 0 };
    let events = await contract.queryFilter(filter, 0);
    return events;
  };

  //Get events when vote is emitted -> Set Voterslist state
  const getVoterslist = async () => {
    let events = await getEvents();
    let voterRegisteredEvents = [];
    events.forEach((event) => {
      if (event.event === "VoterRegistered") {
        let thisVoter = {
          id: event.transactionHash,
          address: event.args.voterAddress,
        };
        voterRegisteredEvents.push(thisVoter);
      }
    });
    setVoterslist(voterRegisteredEvents);
  };

  //Get events when Proposal is added -> Set Proposalslist state
  const getProposalslist = async () => {
    let events = await getEvents();
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

  //Get events when vote is emitted -> Set Listhasvoted state
  const getVoteEvent = async () => {
    let events = await getEvents();
    let votersVoted = [];
    events.forEach((event) => {
      if (event.event === "Voted") {
        let thisVote = {
          id: event.args.proposalId,
          address: event.args.voter,
        };
        votersVoted.push(thisVote);
      }
    });
    setListhasvoted(votersVoted);
  };

  //Get event of the endGame
  const getWinningProposal = async () => {
    const contract = await new ethers.Contract(
      contractAddress,
      abi,
      provider
    );
    let id = await contract.winningProposalID();
    let winningProposal = await contract.getOneProposal(id);
    setWinningProposal(winningProposal);
  };
  return (
    <>
      <Flex direction="column" alignItems="center" w="100%">
        {phase == 5 && winningProposal != undefined ? (
          <Winningbando winningProposal={winningProposal} />
        ) : (
          ""
        )}
        <DashFirstRow
          phase={phase}
          voterslist={voterslist}
          proposalslist={proposalslist}
          listhasvoted={listhasvoted}
          winningProposal={winningProposal}
        />
        <Flex width="100%" justifyContent={"space-between"}>
          <VotersTable
            isOwner={isOwner}
            phase={phase}
            voterslist={voterslist}
            setVoterslist={setVoterslist}
            listhasvoted={listhasvoted}
          />
          <ProposalsTable
            phase={phase}
            proposalslist={proposalslist}
            setProposalslist={setProposalslist}
            listhasvoted={listhasvoted}
          />
        </Flex>
      </Flex>
    </>
  );
}
