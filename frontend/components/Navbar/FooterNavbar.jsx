import {
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Button,
} from "@chakra-ui/react";
import { Icon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { FaWallet, FaEthereum } from "react-icons/fa";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function FooterNavBar({}) {
  const { colorMode, toggleColorMode } = useColorMode();
  const activeBg = useColorModeValue("white", "gray.700");
  const spacing = " ";

  return (
    <Flex width="100%" alignItems="center" justifyContent="space-evenly">
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
            <>
              {chain.unsupported ? (
                <>
                  <Button onClick={openChainModal}>Wrong network</Button>
                  {window.alert("Careful network not supported")}
                </>
              ) : (
                <>
                  <IconButton
                    aria-label="toggle theme"
                    // boxShadow="dark-lg"
                    rounded="full"
                    size="lg"
                    bg={activeBg}
                    onClick={toggleColorMode}
                    boxShadow="dark-lg"
                    border="2px"
                    borderColor="#1f222e"
                    icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
                  />
                  <Menu>
                    <MenuButton 
                      rounded="full"
                      boxShadow="dark-lg"
                      borderColor="#1f222e"
                      border="2px"
                      px={"12px"}
                      py={"12px"}
                      h="48px"
                        >
                    <Icon w="20px" as={FaWallet} />
                    </MenuButton>
                    <MenuList p="16px 8px">
                      <Flex flexDirection="column">
                        <MenuItem
                          onClick={openAccountModal}
                          borderRadius="8px"
                          mb="10px"
                        >
                          <FaWallet />
                          <Flex ml="1rem" flexDirection="column">
                            <Text fontSize="14px" mb="5px">
                              <Text fontWeight="bold" fontSize="14px" as="span">
                                Wallet{spacing}
                              </Text>
                              {account.address}
                            </Text>
                          </Flex>
                        </MenuItem>

                        <MenuItem
                          onClick={openAccountModal}
                          borderRadius="8px"
                          mb="10px"
                        >
                          <Icon as={FaEthereum} />
                          <Flex ml="1rem" flexDirection="column">
                            <Text fontSize="14px" mb="5px">
                              <Text fontWeight="bold" fontSize="14px" as="span">
                                Balance{spacing}
                              </Text>
                              {account.displayBalance}
                            </Text>
                          </Flex>
                        </MenuItem>

                        <MenuItem
                          onClick={openChainModal}
                          borderRadius="8px"
                          mb="10px"
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 15, height: 15 }}
                            />
                          )}
                          <Flex ml="1rem" flexDirection="column">
                            <Text fontSize="14px" mb="5px">
                              <Text fontWeight="bold" fontSize="14px" as="span">
                                Network{spacing}
                              </Text>
                              {chain.name}
                            </Text>
                          </Flex>
                        </MenuItem>
                      </Flex>
                    </MenuList>
                  </Menu>
                </>
              )}
            </>
          );
        }}
      </ConnectButton.Custom>
    </Flex>
  );
}
