import {Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {QuestionnaireItem} from "../models/questionnaire_item";
import {User} from "../models/user";
import {QuestionnaireRow} from "./QuestionnaireRow";

export type QuestionnaireListProps = {
    items?: QuestionnaireItem[]
}

const mockedItems: QuestionnaireItem[] = [
    {
        status: "Draft",
        created: new Date(),
        user: {
            email:"juanita.bananas@example.com",
            id:"u1",
            username:"juanita.bananas",
        },
        id: "1",
        url:"https://www.youtube.com/watch?v=zpw4-Yu2d_o",
    },
    {
        status: "Published",
        created: new Date(),
        user: {
            email:"pedrito.fernandez@example.com",
            id:"u2",
            username:"pedrito.fernandez",
        },
        id: "2",
        url:"https://www.youtube.com/watch?v=bTp3pXH4YRk",
    },
]

export function QuestionnaireList({items = mockedItems}: QuestionnaireListProps) {
    return (
        <TableContainer>
            <Table variant='simple' size="md" mt="2">
                <Thead>
                    <Tr>
                        <Th>Autor</Th>
                        <Th>Creado</Th>
                        <Th>URL</Th>
                        <Th>Estatus</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {items?.map(it => <QuestionnaireRow item={it} /> )}
                </Tbody>
            </Table>
        </TableContainer>
    )
}