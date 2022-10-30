import React, { useState, useEffect } from "react";
import {
  chakra,
  Flex,
  Link,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { fetchValidators, fetchHeight } from "../services/validators";
import websiteLogo from "../assets/svg/website.svg";

export default function ValidatorList() {
  const [validators, setValidators] = useState<any>([]);
  const [height, setHeight] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchValidators().then((response) => {
      const sorted = response.sort((a: any, b: any) => {
        return b.dposv2votes - a.dposv2votes;
      });
      setValidators(sorted);
      setLoading(false);
    });

    fetchHeight().then((response) => {
      setHeight(response);
    });
  }, []);

  const checkHttp = (url: string) => {
    if (url.indexOf("http://") === 0) return url;
    if (url.indexOf("https://") === 0) return url;
    return `http://${url}`;
  };

  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Validator</Th>
            <Th isNumeric>Stake Weight</Th>
            <Th isNumeric>Commission</Th>
            <Th isNumeric>Time Remaining</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!loading &&
            validators.map((node: any, index: number) => (
              <Tr>
                <Td>
                  <Flex>
                    <Text mr="20px" fontSize="sm">
                      {index + 1}
                    </Text>
                    <Text>{node.nickname}</Text>
                    <Link href={checkHttp(node.url)} isExternal>
                      <chakra.img
                        src={websiteLogo}
                        h="20px"
                        p="2px"
                        ml="10px"
                      />
                    </Link>
                  </Flex>
                </Td>
                <Td>{Math.floor(node.dposv2votes).toLocaleString()}</Td>
                <Td>25%</Td>
                <Td>
                  {Math.floor(
                    (node.stakeuntil - height) / 720
                  ).toLocaleString()}{" "}
                  days
                </Td>
                <Td>{node.dposv2votes >= 3000 ? "Active" : "Inactive"}</Td>
              </Tr>
            ))}

          {/* <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr> */}
        </Tbody>
        {/* <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot> */}
      </Table>
    </TableContainer>
  );
}
