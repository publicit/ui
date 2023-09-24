import {QuestionnaireItem} from "../models/questionnaire_item";
import {Td, Tr} from "@chakra-ui/react";
import {Link} from "react-router-dom";

type QuestionnaireRowProps = {
    item: QuestionnaireItem
}

export function QuestionnaireRow({item}:QuestionnaireRowProps){
    return (
        <Tr key={item.id}>
            <Td>{item.user.email}</Td>
            <Td>{item.created.toLocaleDateString()} {item.created.toLocaleTimeString()}</Td>
            <Td>{item.url ? <Link to={item.url}>Ver</Link> : null }</Td>
            <Td>{item.status}</Td>
        </Tr>
    )
}