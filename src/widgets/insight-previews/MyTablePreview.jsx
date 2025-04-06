import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import PreviewCard from "./PreviewCard";

const TablePreview = ({ title, columns, data }) => {
    return (
        <PreviewCard title={title}>
            <TableContainer width="100%" overflowY="auto" maxHeight="230px">
                <Table size="sm">
                    <Thead
                        key={columns}
                        position="sticky"
                        top={0}
                        zIndex={1}
                        bg="gray.200"
                    >
                        <Tr>
                            {columns.map((col) => (
                                <Th key={col}>{col}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((row, index) => (
                            <Tr key={index} bg={index % 2 === 0 ? "white" : "gray.100"}>
                                {row.map((value, i) => (
                                    <Td key={i}>{value}</Td>
                                ))}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </PreviewCard>
    );
};

export default TablePreview;