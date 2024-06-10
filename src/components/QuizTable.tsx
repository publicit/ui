import { Link } from 'react-router-dom'

// Mantine :
import { Button, Table } from '@mantine/core'

// Models :
import { Quiz } from '../models/quiz'

type Params = {
    rows: Quiz[]
}

type RowParams = {
    quiz: Quiz
    index: number
}

function QuizRow({ index, quiz }: RowParams) {
    return (
        <Table.Tr key={quiz.id} className="table-row-container">
            <Table.Td className="content-center">{index + 1}</Table.Td>
            <Table.Td className="row-title">{quiz.name}</Table.Td>
            <Table.Td className="content-center">{quiz.status}</Table.Td>
            <Table.Td className="content-center">
                {quiz.thumbnail_url && (
                    <Link to={quiz.video_url} target="_blank">
                        <img alt="avatar" src={quiz.thumbnail_url} />
                    </Link>
                )}
            </Table.Td>
            <Table.Td className="content-center">
                {quiz.number_of_questions}
            </Table.Td>
            <Table.Td className="content-center">{quiz.reward_amount}</Table.Td>
            <Table.Td className="content-center">
                <Link to={`/quizs/${quiz.id}`}>
                    <Button type="button" variant="outline">
                        {quiz.status === 'draft' ? 'Editar' : 'Ver'}
                    </Button>
                </Link>
            </Table.Td>
        </Table.Tr>
    )
}

function EmpteyRow() {
    return (
        <Table.Tr className="table-row-container">
            <Table.Td></Table.Td>
            <Table.Td></Table.Td>
            <Table.Td></Table.Td>
            <Table.Td className="content-center">Sin datos</Table.Td>
            <Table.Td></Table.Td>
            <Table.Td></Table.Td>
            <Table.Td></Table.Td>
        </Table.Tr>
    )
}

export default function QuizTable({ rows }: Params) {
    return (
        <Table highlightOnHover withTableBorder className="table-container">
            <Table.Thead className="table-head-container">
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Nombre de Encuesta</Table.Th>
                    <Table.Th className="content-center">Estatus</Table.Th>
                    <Table.Th className="content-center">Imagen</Table.Th>
                    <Table.Th className="content-center numbers">
                        Numero de Preguntas
                    </Table.Th>
                    <Table.Th className="content-center">Recompensa</Table.Th>
                    <Table.Th className="content-center">Acciones</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.length > 0 ? (
                    <>
                        {rows.map((r: Quiz, index: number) => (
                            <QuizRow key={r.id} quiz={r} index={index} />
                        ))}
                    </>
                ) : (
                    <EmpteyRow />
                )}
            </Table.Tbody>
        </Table>
    )
}
