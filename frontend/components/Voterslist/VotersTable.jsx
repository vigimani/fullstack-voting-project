import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { VotersTableRow } from "./VotersTableRow";
import Addvoter from "./Addvoter";

export default function VotersTable({
  phase,
  voterslist,
  setVoterslist,
  listhasvoted,
  isOwner
}) {
  //Set the adequate height for card
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      },
      false
    );
  }, []);
  const captions = ["Adress", "Voted"];
  return (
    <Card
      w="49.5%"
      borderRadius="20"
      h={dimensions.height - 109 - 116.58 - 541.2 + 433.61 + 85}
      overflowX={{ sm: "scroll", xl: "hidden" }}
    >
      <CardHeader w="100%" p="6px 0px 2px 0px">
        {phase == 0 && isOwner? (
          <Addvoter setVoterslist={setVoterslist} />
        ) : (
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
        )}
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={"gray.700"}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => {
                return (
                  <Th color="gray.400" key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {voterslist.map((voter, index) => {
              return (
                <VotersTableRow
                  key={index}
                  listhasvoted={listhasvoted}
                  subaddress={
                    voter.address ? (
                      voter.address.substring(0, 5) +
                      "..." +
                      voter.address.substring(voter.address.length - 4)
                    ) : (
                      <Spinner
                        size="md"
                        thickness="5px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="#9face6"
                      />
                    )
                  }
                  fulladdress={voter.address}
                  status="Not Voted"
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
