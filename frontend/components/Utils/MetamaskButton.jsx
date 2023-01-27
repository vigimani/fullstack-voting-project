import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import {
  Flex,
  Icon,
  Text,
  HStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import { FaWallet, FaEthereum } from "react-icons/fa";

export const MetamaskButton = ({ bgcolormetamask }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Flex p="2rem" direction="row-reverse">
                    <Button
                      boxShadow="dark-lg"
                      bg={bgcolormetamask}
                      onClick={openConnectModal}
                    >
                      <Flex
                        direction="column"
                        p="2"
                        alignItems="center"
                        width="100%"
                      >
                        <HStack p="2rem">
                          <Image
                            src="/metamask-fox.svg"
                            width={30}
                            height={31}
                            alt="metamask"
                          />
                          <Text>Connect</Text>
                        </HStack>
                      </Flex>
                    </Button>
                  </Flex>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <>
                  {colorMode == "light" ? (
                    <Flex
                      p="2rem"
                      w="100%"
                      h="100px"
                      justifyContent="space-between"
                      alignItems="center"
                      bg="#e2e6f7"
                    >
                      <Flex alignItems="center">
                        <Button
                          w="auto"
                          ml="2px"
                          onClick={openAccountModal}
                          boxShadow="dark-lg"
                          bg={""}
                        >
                          <Icon mr="1rem" as={FaWallet} />
                          <Text>{account.address}</Text>
                        </Button>

                        <Button
                          w="auto"
                          ml="2px"
                          onClick={openAccountModal}
                          bg={""}
                        >
                          {account.displayBalance
                            ? `${account.displayBalance.slice(0, -3)}`
                            : ""}
                          <Icon as={FaEthereum} />
                        </Button>
                      </Flex>

                      <Button onClick={openChainModal} bg={""}>
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                style={{ width: 12, height: 12 }}
                              />
                            )}
                          </div>
                        )}

                        {chain.name}
                      </Button>
                    </Flex>
                  ) : (
                    <Flex
                      p="2rem"
                      w="100%"
                      justifyContent="space-between"
                      alignItems="center"
                      bg="gray.800"
                    >
                      <Flex alignItems="center">
                        <Button
                          w="auto"
                          ml="2px"
                          onClick={openAccountModal}
                          boxShadow="dark-lg"
                          bg={""}
                        >
                          <Icon mr="1rem" as={FaWallet} />
                          <Text>{account.address}</Text>
                        </Button>

                        <Button
                          w="auto"
                          ml="2px"
                          onClick={openAccountModal}
                          bg={""}
                        >
                          {account.displayBalance
                            ? `${account.displayBalance.slice(0, -3)}`
                            : ""}
                          <Icon as={FaEthereum} />
                        </Button>
                      </Flex>

                      <Button onClick={openChainModal} bg={""}>
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                style={{ width: 12, height: 12 }}
                              />
                            )}
                          </div>
                        )}

                        {chain.name}
                      </Button>
                    </Flex>
                  )}
                </>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
