import {Button, Table} from "@mantine/core";
import {Link} from "react-router-dom";
import {Question} from "../models/question";

type Params = {
    rows: Question[]
}

type RowParams = {
    question: Question
}

function QuestionRow({question}: RowParams) {
    return (
        <Table.Tr key={question.id}>
            <Table.Td>
                {question.body}
            </Table.Td>
            <Table.Td>
                {question.type}
            </Table.Td>
            <Table.Td>
                <Button type="button" variant="outline">
                    <Link to={`/questions/${question.id}`}>
                        Editar
                    </Link>
                </Button>
            </Table.Td>
        </Table.Tr>
    )
}

export default function QuestionTable({rows}: Params) {
    return (
        <Table striped={true} withRowBorders={true}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Pregunta</Table.Th>
                    <Table.Th>Tipo</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.map((question: Question) => <QuestionRow key={question.id} question={question}/>)}
            </Table.Tbody>
        </Table>
    )
}