import {Box, Button, Group, Select, Text, Textarea} from "@mantine/core";
import {Link} from "react-router-dom";
import {Question, QuestionType} from "../models/question";
import {UseFormReturnType} from "@mantine/form";

type params = {
    onSubmit: any
    onDelete?: any | undefined
    form: UseFormReturnType<Question>
    question: Question
    showDelete?: boolean
    canEdit: boolean
}

const questionTypes: string[] = [
    QuestionType[QuestionType.single],
    QuestionType[QuestionType.multiple],
]

export default function QuestionEditForm({
                                             onSubmit,
                                             form,
                                             onDelete,
                                             question,
                                             showDelete = false,
                                             canEdit,
                                         }: params) {
    return (
        <>
            <form onSubmit={form.onSubmit((data: any) => onSubmit(data))}>
                <br/>
                <Textarea label="Texto de la Pregunta"
                          autosize
                          minRows={5}
                          maxRows={10}
                          placeholder="Texto de la Pregunta"
                          disabled={!canEdit}
                          {...form.getInputProps("body")}/>
                <br/>
                <Select
                    label="Tipo de Pregunta"
                    data={questionTypes}
                    comboboxProps={{transitionProps: {transition: 'pop', duration: 200}}}
                    {...form.getInputProps("type")}
                />
                <br/>
                {form.values.type === QuestionType[QuestionType.single]
                    ? <Text size="xs">Solo una respuesta puede ser la correcta.</Text>
                    : <Text size="xs">Puede haber una o mas respuestas correctas.</Text>
                }
                <br/>
                {canEdit &&
                    <Group>
                        <Button type="submit" variant="outline">
                            Guardar
                        </Button>
                        {question?.id &&
                            <Group>
                                <Button type="button" variant="outline">
                                    <Link to={`/answers/new/${question.id}`}>
                                        Agregar Respuesta
                                    </Link>
                                </Button>
                                {showDelete &&
                                    <Button type="button" variant="outline" onClick={onDelete}>
                                        Eliminar Pregunta
                                    </Button>
                                }
                            </Group>
                        }
                    </Group>
                }

            </form>
        </>
    )
}