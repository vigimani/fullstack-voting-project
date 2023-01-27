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
  Heading
} from "@chakra-ui/react";
import { ProposalsTableRow } from "./ProposalsTableRow";
import Addproposal from "./Addproposal";

export default function ProposalsTable({
  phase,
  proposalslist,
  setProposalslist,
  listhasvoted,
}) {
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
  const captions = ["Id", "Description", " "];
  return (
    <Card
      w="49.5%"
      borderRadius="20"
      h={dimensions.height - 109 - 116.58 - 541.2 + 433.61 + 85}
      overflowX={{ sm: "scroll", xl: "hidden" }}
    >
      <CardHeader w="100%" p="6px 0px 2px 0px">
      {phase == 1 ? (
          <Addproposal setProposalslist={setProposalslist} />
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
          List of Proposals
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
            {proposalslist.map((a, index) => {
              return (
                <ProposalsTableRow
                  key={index}
                  phase={phase}
                  id={a.id}
                  listhasvoted={listhasvoted}
                  description={
                    a.description ? (
                      a.description
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
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
}
