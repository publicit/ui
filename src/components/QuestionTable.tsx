import { Link } from 'react-router-dom'
import { IconCheck, IconX } from '@tabler/icons-react'

// Mantine :
import { Button, Checkbox, Table } from '@mantine/core'

// Models :
import { Question } from '../models/question'

type Params = {
    rows: Question[]
    canEdit: boolean
}

type RowParams = {
    question: Question
    index: number
    canEdit: boolean
}

function QuestionRow({ question, index, canEdit }: RowParams) {
    const iconRight = question.is_valid ? (
        <IconCheck style={{ color: 'green' }} />
    ) : (
        <IconX style={{ color: 'red' }} />
    )
    return (
        <Table.Tr key={question.id} className="table-row-container">
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td className="row-title">{question.body}</Table.Td>
            <Table.Td className="content-center">{question.type}</Table.Td>
            <Table.Td>
                <Checkbox
                    checked={question.allow_any_answer_as_valid}
                    className="row-checkbox"
                />
            </Table.Td>
            <Table.Td className="content-center">{iconRight}</Table.Td>
            <Table.Td className="content-center">
                <Link to={`/questions/${question.id}`}>
                    <Button type="button" variant="outline">
                        {canEdit ? 'Editar' : 'Ver'}
                    </Button>
                </Link>
            </Table.Td>
        </Table.Tr>
    )
}
function EmptyTable() {
    return (
        <Table.Tr className="table-row-container">
            <Table.Td className="content-center"></Table.Td>
            <Table.Td className="survey-name"></Table.Td>
            <Table.Td className="content-center"></Table.Td>
            <Table.Td className="content-center">Sin datos</Table.Td>
            <Table.Td className="content-center"></Table.Td>
            <Table.Td className="content-center"></Table.Td>
        </Table.Tr>
    )
}

export default function QuestionTable({ rows, canEdit }: Params) {
    return (
        <Table highlightOnHover withTableBorder className="table-container">
            <Table.Thead className="table-head-container">
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Pregunta</Table.Th>
                    <Table.Th className="content-center">Tipo</Table.Th>
                    <Table.Th className="content-center">
                        Cualquiera es Valida
                    </Table.Th>
                    <Table.Th className="content-center">Lista</Table.Th>
                    <Table.Th className="content-center">Acciones</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows.length > 0 ? (
                    <>
                        {rows.map((question: Question, index: number) => (
                            <QuestionRow
                                key={question.id}
                                question={question}
                                index={index}
                                canEdit={canEdit}
                            />
                        ))}
                    </>
                ) : (
                    <EmptyTable />
                )}
            </Table.Tbody>
        </Table>
    )
}
