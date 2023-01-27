import {Flex, useToast} from "@chakra-ui/react";
import DashFirstRow from "./DashFirstRow";
import VotersTable from "../Voterslist/VotersTable";
import ProposalsTable from "../Proposalslist/ProposalsTable";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Contract from "../../../backend/artifacts/contracts/Voting.sol/Voting";
import { useAccount, useProvider, useSigner } from "wagmi";

export default function Mainpanel() {
  const[listhasvoted, setListhasvoted]=useState([])
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const contractAddress = process.env.NEXT_PUBLIC_SCADDRESS;


  const { data: signer } = useSigner();
  const [isloading, setIsloading] = useState(false);
  const [newvoter, setNewvoter] = useState("");

  const toast = useToast();
  const [isOwner, setIsOwner] = useState(false);

  const [voterslist, setVoterslist] = useState([]);




  useEffect(() => {
    if (isConnected) {
      getVoterslist();
      getVoteEvent();
    }
  }, []);
  useEffect(() => {
    const contract = new ethers.Contract(
      contractAddress,
      Contract.abi,
      provider
    );
    contract.on("VoterRegistered", () => {
      getVoterslist();
    });
    contract.on("Voted", () => {
      getVoteEvent();
    });
    return () => {
      contract.removeAllListeners();
    };
  }, []);


  //Get events when vote is emitted -> Set Voterslist state
  const getVoterslist = async () => {
    const contract = await new ethers.Contract(
      contractAddress,
      Contract.abi,
      provider
    );
    const filter = { address: contractAddress, fromBlock: 0 };
    let events = await contract.queryFilter(filter, 0);
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

  //Get events when vote is emitted -> Set Listhasvoted state
  const getVoteEvent = async() => {
    const contract = await new ethers.Contract(
      contractAddress,
      Contract.abi,
      provider
    );
    const filter = { address: contractAddress, fromBlock: 0 };
    let events = await contract.queryFilter(filter, 0);
    let votersVoted = [];
    events.forEach((event) => {
      if (event.event === "Voted") {
        console.log(event)
        let thisVote = {
          id: event.args.proposalId,
          address: event.args.voter,
        };
        votersVoted.push(thisVote);
      }
    });
    setListhasvoted(votersVoted)
  };

  

  return (
    <>
      <Flex direction="column" alignItems="center" w="100%">
        <DashFirstRow />
        <Flex width="100%" justifyContent={"space-between"}>
          <VotersTable voterslist={voterslist} setVoterslist={setVoterslist} listhasvoted={listhasvoted}/>
          <ProposalsTable listhasvoted={listhasvoted}/>
        </Flex>
      </Flex>
    </>
  );
}
