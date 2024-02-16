// Mantine :
import {Table} from "@mantine/core";

// Models :
import {UserReward} from "../models/user_reward";


type Params = {
    rows: UserReward[]
}

type RowParams = {
    row: UserReward
    index: number
}

function Row({index, row}: RowParams) {
    return (
        <Table.Tr key={row.id} className="table-row-container">
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td className="row-title">{row.op}</Table.Td>
            <Table.Td>{row.created_at.toLocaleDateString()}</Table.Td>
            <Table.Td>{row.amount}</Table.Td>
            <Table.Td>{row.balance}</Table.Td>
        </Table.Tr>
    )
}

function EmptyTable() {
    return (
        <Table.Tr>
            <Table.Td></Table.Td>
            <Table.Td>Sin datos</Table.Td>
            <Table.Td></Table.Td>
            <Table.Td></Table.Td>
            <Table.Td></Table.Td>
        </Table.Tr>
    )
}

export function UserRewardsTable({rows}: Params) {
    return (
        <Table highlightOnHover withTableBorder className="table-container">
            <Table.Thead className="table-head-container">
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Origen</Table.Th>
                    <Table.Th className="content-center">Fecha</Table.Th>
                    <Table.Th className="content-center">Monto</Table.Th>
                    <Table.Th className="content-center">Saldo</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.length > 0 ?
                    <>
                        {rows.map((r, index) => <Row row={r} index={index} key={r.id}/>)}
                    </>
                    : <EmptyTable/>
                }
            </Table.Tbody>
        </Table>
    )
}