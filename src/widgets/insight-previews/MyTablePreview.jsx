import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from "@chakra-ui/react";
import PreviewCard from "./PreviewCard";

const TablePreview = ({ title, columns, data }) => {
    return (
        <PreviewCard title={title}>
            <TableContainer>
                <Table size="sm">
                    <Thead>
                        <Tr>
                            {columns.map((col) => (
                                <Th key={col}>{col}</Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((row, index) => (
                            <Tr key={index} bg={index % 2 === 0 ? "white" : "gray.100"}>
                                <Td>{row.name}</Td>
                                <Td>{row.age}</Td>
                                <Td>{row.email}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </PreviewCard>
    );
};

export default TablePreview;