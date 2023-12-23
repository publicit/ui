import {Button, Table} from "@mantine/core";
import {Link} from "react-router-dom";
import {Role} from "../models/role";

type Params = {
    rows: Role[]
}

type RowParams = {
    role: Role
}

function Row({role}: RowParams) {
    return (
        <Table.Tr key={role.id}>
            <Table.Td>
                {role.name}
            </Table.Td>
            <Table.Td>
                {role.description}
            </Table.Td>
            <Table.Td>
                <Button type="button" variant="outline">
                    <Link to={`/roles/${role.id}`}>
                        Editar
                    </Link>
                </Button>
            </Table.Td>
        </Table.Tr>
    )
}

export function RolesTable({rows}: Params) {
    return (
        <Table striped={true} withRowBorders={true}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Nombre</Table.Th>
                    <Table.Th>Descripcion</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.map((role: Role) => <Row key={role.id} role={role}/>)}
            </Table.Tbody>
        </Table>
    )
}