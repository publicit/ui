import {Quiz} from "../models/quiz";
import {Button, Table} from "@mantine/core";
import {Link} from "react-router-dom";

type Params = {
    rows: Quiz[]
}

type RowParams = {
    quiz: Quiz
}

function QuizRow({quiz}: RowParams) {
    return (
        <Table.Tr key={quiz.id}>
            <Table.Td>
                {quiz.name}
            </Table.Td>
            <Table.Td>
                {quiz.number_of_questions}
            </Table.Td>
            <Table.Td>
                <Button type="button" variant="outline">
                    <Link to={`/quizs/${quiz.id}`}>
                        Editar
                    </Link>
                </Button>
            </Table.Td>
        </Table.Tr>
    )
}

export default function QuizTable({rows}: Params) {
    return (
        <Table striped={true} withRowBorders={true}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Nombre de Encuesta</Table.Th>
                    <Table.Th>Numero de Preguntas</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.map((r: Quiz) => <QuizRow key={r.id} quiz={r}/>)}
            </Table.Tbody>
        </Table>
    )
}