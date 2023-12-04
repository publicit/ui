import {Button, Group, Select, Textarea, TextInput, Title} from "@mantine/core";
import {Quiz} from "../models/quiz";
import {Link} from "react-router-dom";
import {Question, QuestionType} from "../models/question";

type params = {
    onSubmit: any
    onDelete?: any | undefined
    form: any
    legend: string
    quiz: Quiz
    question?:Question|undefined
}

const questionTypes:string[] = [
    QuestionType[QuestionType.single],
    QuestionType[QuestionType.multiple],
]

export default function QuestionEditForm({onSubmit, form, legend, quiz, onDelete, question}: params) {
    return (
        <>
            <Title>{legend}</Title>
            <form onSubmit={form.onSubmit((data: any) => {
                onSubmit(data)
            })}>
                <br/>
                <Textarea label="Texto de la Pregunta"
                          autosize
                          minRows={5}
                          maxRows={10}
                          placeholder="Texto de la Pregunta"
                           {...form.getInputProps("body")}/>
                <br/>
                <Select
                    label="Tipo de Pregunta"
                    data={questionTypes}
                    {...form.getInputProps("type")}
                />
                <br/>
                <Group>
                    <Button type="submit" variant="outline">
                        Guardar
                    </Button>
                    <Button type="button" variant="outline">
                        <Link to={`/quizs/${quiz.campaign.id}/${quiz.id}`}>
                            Regresar
                        </Link>
                    </Button>
                    {question?.id &&
                        <Group>
                            <Button type="button" variant="outline">
                                <Link to={`/quizs/${quiz.id}`}>
                                    Agregar Respuesta
                                </Link>
                            </Button>
                            <Button type="button" variant="outline" onClick={onDelete}>
                                Eliminar Pregunta
                            </Button>
                        </Group>
                    }
                </Group>
            </form>
        </>
    )
}