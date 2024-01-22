import {Table} from "@mantine/core";
import {Role} from "../models/role";

type Params = {
    rows: Role[]
    onClick:any
}

type RowParams = {
    role: Role
    onClick:any
}

function Row({role,onClick}: RowParams) {
    return (
        <Table.Tr key={role.id}>
            <Table.Td style={{cursor: "pointer"}} onClick={() => onClick(role)}>
                {role.name}
            </Table.Td>
        </Table.Tr>
    )
}

export function RolesSimpleTable({rows,onClick}: Params) {
    return (
        <Table striped={true} withRowBorders={true}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Nombre</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.map((role: Role) => <Row key={role.id} role={role} onClick={onClick}/>)}
            </Table.Tbody>
        </Table>
    )
}