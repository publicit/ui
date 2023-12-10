import {Button, Checkbox, Table} from "@mantine/core";
import {Link} from "react-router-dom";
import {Answer} from "../models/answer";

type Params = {
    rows: Answer[]
    canEdit: boolean
}

type RowParams = {
    answer: Answer
    canEdit: boolean
}

function Row({answer, canEdit}: RowParams) {
    return (
        <Table.Tr key={answer.id}>
            <Table.Td>
                {answer.body}
            </Table.Td>
            <Table.Td>
                <Checkbox checked={answer.is_valid} onChange={() => {
                }}/>
            </Table.Td>
            <Table.Td>
                <Button type="button" variant="outline">
                    <Link to={`/answers/${answer.id}`}>
                        {canEdit ? "Editar" : "Ver"}
                    </Link>
                </Button>
            </Table.Td>
        </Table.Tr>
    )
}

export default function AnswerTable({rows, canEdit}: Params) {
    return (
        <Table striped={true} withRowBorders={true}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Respuesta</Table.Th>
                    <Table.Th>Valida</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.map((answer: Answer) => <Row key={answer.id} answer={answer} canEdit={canEdit}/>)}
            </Table.Tbody>
        </Table>
    )
}