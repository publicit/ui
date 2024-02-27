// Mantine :
import {Table} from "@mantine/core";

// Models :
import {UserQuizShare} from "../models/user_quiz_share";


type Params = {
    rows: UserQuizShare[]
}

type RowParams = {
    item: UserQuizShare
    index: number
}

function Row({ index, item }: RowParams) {
    return (
        <Table.Tr key={item.id} className="table-row-container">
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td className="row-title">{`${item.created_at.toLocaleDateString()} ${item.created_at.toLocaleTimeString()}`}</Table.Td>
            <Table.Td className="content-center">{item.user_referred?.email}</Table.Td>
            <Table.Td>{item.used_at ? 'X' : null}</Table.Td>
        </Table.Tr>
    )
}
function EmptyTable() {
    return (
        <Table.Tr className="table-row-container">
            <Table.Td></Table.Td>
            <Table.Td></Table.Td>
            <Table.Td></Table.Td>
            <Table.Td className="content-center">Sin datos</Table.Td>
        </Table.Tr>
    )
}

export function UserQuizShareTable({ rows }: Params) {
    return (
        <Table highlightOnHover withTableBorder className="table-container">
            <Table.Thead className="table-head-container">
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Fecha</Table.Th>
                    <Table.Th className="content-center">Email</Table.Th>
                    <Table.Th>Completado</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.length > 0 ?
                    <>
                        {rows.map((row: UserQuizShare, index: number) => <Row key={row.id} item={row} index={index} />)}
                    </>
                    :
                    <EmptyTable />
                }
            </Table.Tbody>
        </Table>
    )
}