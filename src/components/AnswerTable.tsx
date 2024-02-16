import { Link } from "react-router-dom";

// Mantine :
import { Button, Checkbox, Table } from "@mantine/core";

// Models :
import { Answer } from "../models/answer";


type Params = {
    rows: Answer[]
    canEdit: boolean
}

type RowParams = {
    answer: Answer
    canEdit: boolean
    index: number
}

function Row({ index, answer, canEdit }: RowParams) {
    return (
        <Table.Tr key={answer.id} className="table-row-container">
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td className="row-title">{answer.body}</Table.Td>
            <Table.Td>
                <Checkbox checked={answer.is_valid}
                    onChange={() => { }}
                    className="row-checkbox"
                />
            </Table.Td>
            <Table.Td className="content-center">
                <Link to={`/answers/${answer.id}`}>
                    <Button type="button" variant="outline">
                        {canEdit ? "Editar" : "Ver"}
                    </Button>
                </Link>
            </Table.Td>
        </Table.Tr>
    )
}
function EmptyTable() {
    return (
        <Table.Tr className="table-row-container">
            <Table.Td></Table.Td>
            <Table.Td></Table.Td>
            <Table.Td className="content-center">Sin datos</Table.Td>
            <Table.Td></Table.Td>
        </Table.Tr>
    )
}

export default function AnswerTable({ rows, canEdit }: Params) {
    return (
        <Table highlightOnHover withTableBorder className="table-container">
            <Table.Thead className="table-head-container">
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Respuesta</Table.Th>
                    <Table.Th className="content-center">Valida</Table.Th>
                    <Table.Th className="content-center">Acciones</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.length > 0 ?
                    <>
                        {rows.map((answer: Answer, index: number) => <Row key={answer.id} answer={answer} canEdit={canEdit} index={index} />)}
                    </>
                    :
                    <EmptyTable />
                }
            </Table.Tbody>
        </Table>
    )
}