import {Button, Checkbox, Image, Table} from "@mantine/core";
import {Link} from "react-router-dom";
import {Answer} from "../models/answer";
import {User} from "../models/user";

type Params = {
    rows: User[]
}

type RowParams = {
    user: User
}

function Row({user}: RowParams) {
    return (
        <Table.Tr key={user.id}>
            <Table.Td>
                {user.email}
            </Table.Td>
            <Table.Td>
                {user.image && <Image src={user.image} width={2}/>}
            </Table.Td>
            <Table.Td>
                {user.last_login_date?.toLocaleDateString()}
            </Table.Td>
            <Table.Td>
                <Button type="button" variant="outline">
                    <Link to={`/users/${user.id}`}>
                        Editar
                    </Link>
                </Button>
            </Table.Td>
        </Table.Tr>
    )
}

export function UserTable({rows}: Params) {
    return (
        <Table striped={true} withRowBorders={true}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Nombre</Table.Th>
                    <Table.Th>Ultimo Inicio de Sesion</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.map((user: User) => <Row key={user.id} user={user}/>)}
            </Table.Tbody>
        </Table>
    )
}