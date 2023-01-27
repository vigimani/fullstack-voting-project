import Head from "next/head";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
// import Contract from "../../backend/artifacts/contracts/Voting.sol/Voting";
import { useAccount, useProvider } from "wagmi";
import Layout from "@/components/Layout/Layout";
import Mainpanel from "@/components/Mainpanel/Mainpanel";
import { abi } from "@/components/Utils/helper";

export default function Home() {
  //EthersJS and wagmi
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log("Connected", { address, connector, isReconnected });
    },
  });
  const contractAddress = process.env.NEXT_PUBLIC_SCADDRESS;

  //chakraUI
  const toast = useToast();

  //Game ownership and workflow
  const [isOwner, setIsOwner] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (isConnected) {
      checkOwner();
      toast({
        title: "Connected",
        description:
          "Welcome to the Voting Dapp, you are connected with the address : " +
          address,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [address, isConnected]);

  useEffect(() => {
    checkOwner();
    getStatusOfTheGame();
  }, []);

  useEffect(() => {
    const contract = new ethers.Contract(
      contractAddress,
      abi,
      provider
    );
    contract.on("WorkflowStatusChange", () => {
      getStatusOfTheGame();
    });
    return () => {
      contract.removeAllListeners();
    };
  }, []);

  //function that checks if the wallet connected is the owner -> setIsOwner
  const checkOwner = async () => {
    const contract = await new ethers.Contract(
      contractAddress,
      abi,
      provider
    );
    let owner = await contract.owner();
    if (address == owner) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  };

  //Function that update the phase workflow of the game according to event WorkflowStatusChange on the blockchain -> setPhase
  const getStatusOfTheGame = async () => {
    const contract = await new ethers.Contract(
      contractAddress,
      abi,
      provider
    );
    const filter = { address: contractAddress, fromBlock: 8387444 };
    let events = await contract.queryFilter(filter, 0);
    let phase = 0;
    events.forEach((event) => {
      if (event.event === "WorkflowStatusChange") {
        phase += 1;
      }
    });
    setPhase(phase);
  };

  return (
    <>
      <Head>
        <title>My Voting Dapp</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo_vote.svg" />
      </Head>
      <Layout bg="#e2e6f7" isOwner={isOwner} phase={phase} setPhase={setPhase}>
        <Mainpanel isOwner={isOwner} phase={phase} />
      </Layout>
    </>
  );
}
