import {Button, Table} from "@mantine/core";
import {User} from "../models/user";

type Params = {
    onDelete: any
    rows: User[]
}

type RowParams = {
    onDelete: any
    user: User
}

function Row({user, onDelete}: RowParams) {
    return (
        <Table.Tr key={user.id}>
            <Table.Td>
                {user.email}
            </Table.Td>
            <Table.Td>
                {user.image && <img alt="avatar" src={user.image} width={"10%"}/>}
            </Table.Td>
            <Table.Td>
                {user.name}
            </Table.Td>
            <Table.Td>
                {`${user.last_login?.toLocaleDateString()} ${user.last_login?.toLocaleTimeString()}`}
            </Table.Td>
            <Table.Td>
                <Button type="button" variant="outline" onClick={() => onDelete(user)}>
                    Quitar
                </Button>
            </Table.Td>
        </Table.Tr>
    )
}

export function UserTable({rows, onDelete}: Params) {
    return (
        <Table striped={true} withRowBorders={true}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Email</Table.Th>
                    <Table.Th>Avatar</Table.Th>
                    <Table.Th>Nombre</Table.Th>
                    <Table.Th>Ultimo Inicio de Sesion</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.map((user: User) => <Row key={user.id} user={user} onDelete={onDelete}/>)}
            </Table.Tbody>
        </Table>
    )
}