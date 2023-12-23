import {Quiz} from "../models/quiz";
import {Button, Table} from "@mantine/core";
import {Link} from "react-router-dom";

type Params = {
    rows: Quiz[]
}

type RowParams = {
    quiz: Quiz
    index: number
}

function QuizRow({index, quiz}: RowParams) {
    return (
        <Table.Tr key={quiz.id}>
            <Table.Td>
                {`${index + 1}. ${quiz.name}`}
            </Table.Td>
            <Table.Td>
                {quiz.status}
            </Table.Td>
            <Table.Td>
                {quiz.thumbnail_url &&
                    <Link to={quiz.video_url} target="_blank">
                        <img alt="avatar" src={quiz.thumbnail_url} width={"10%"}/>
                    </Link>
                }
            </Table.Td>
            <Table.Td>
                {quiz.number_of_questions}
            </Table.Td>
            <Table.Td>
                <Button type="button" variant="outline">
                    <Link to={`/quizs/${quiz.id}`}>
                        {quiz.status === "draft" ? "Editar" : "Ver"}
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
                    <Table.Th>Estatus</Table.Th>
                    <Table.Th>Imagen</Table.Th>
                    <Table.Th>Numero de Preguntas</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.map((r: Quiz, index: number) => <QuizRow key={r.id} quiz={r} index={index}/>)}
            </Table.Tbody>
        </Table>
    )
}