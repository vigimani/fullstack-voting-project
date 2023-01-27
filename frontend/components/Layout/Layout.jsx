import { Navbar } from "../Navbar/Navbar";
import { calc, Flex } from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import Welcome from "../Welcome/Welcome";
import { Separator } from "../Utils/Separator";

export default function Layout({ children, isOwner, phase, setPhase }) {
  const { isConnected } = useAccount();

  return (
    <>
      <Flex minHeight="100vh" bg="#e2e6f7" w="100%">
        {isConnected ? (
          <>
            <Flex>
              <Navbar phase={phase} setPhase={setPhase} />
            </Flex>
            <Flex w="100%" direction="column" minHeight="100vh" mr="5px">
              <Flex w="100%" direction="column" h="100vh">
                <Header isOwner={isOwner} phase={phase} />
                <Separator></Separator>
                <Flex flexGrow={1}>{children}</Flex>
              </Flex>
              <Footer />
            </Flex>
          </>
        ) : (
          <Welcome />
        )}
      </Flex>
    </>
  );
}
