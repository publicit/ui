import {Button, Checkbox, Table} from "@mantine/core";
import {Link} from "react-router-dom";
import {Question} from "../models/question";

type Params = {
    rows: Question[]
    canEdit: boolean
}

type RowParams = {
    question: Question
    index: number
    canEdit: boolean
}

function QuestionRow({question, index, canEdit}: RowParams) {
    return (
        <Table.Tr key={question.id}>
            <Table.Td>
                {`${index + 1}. ${question.body}`}
            </Table.Td>
            <Table.Td>
                {question.type}
            </Table.Td>
            <Table.Td>
                <Checkbox checked={question.allow_any_answer_as_valid} onChange={() => {
                }}/>
            </Table.Td>
            <Table.Td>
                <Button type="button" variant="outline">
                    <Link to={`/questions/${question.id}`}>
                        {canEdit ? "Editar" : "Ver"}
                    </Link>
                </Button>
            </Table.Td>
        </Table.Tr>
    )
}

export default function QuestionTable({rows,canEdit}: Params) {
    return (
        <Table striped={true} withRowBorders={true}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Pregunta</Table.Th>
                    <Table.Th>Tipo</Table.Th>
                    <Table.Th>Cualquiera es Valida</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.map((question: Question, index: number) => <QuestionRow key={question.id} question={question}
                                                                              index={index} canEdit={canEdit} />)}
            </Table.Tbody>
        </Table>
    )
}