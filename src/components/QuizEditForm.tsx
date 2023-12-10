import {Button, Group, NumberInput, TextInput} from "@mantine/core";
import {Quiz, QuizStatus} from "../models/quiz";
import {Link} from "react-router-dom";

type params = {
    onSubmit: any
    onDelete?: any | undefined
    form: any
    legend: string
    quiz: Quiz
    showDelete?: boolean
    onPublish?: any | undefined
}

export default function QuizEditForm({
                                         onSubmit, form, legend, quiz, onDelete,
                                         showDelete = false, onPublish
                                     }: params) {
    return (
        <>
            <form onSubmit={form.onSubmit((data: any) => {
                onSubmit(data)
            })}>
                <legend>{legend}</legend>
                <br/>
                <TextInput label="Nombre"
                           placeholder="Nombre"
                           {...form.getInputProps("name")}/>
                <br/>
                <TextInput label="Video URL"
                           placeholder="URL Video"
                           {...form.getInputProps("video_url")}/>
                <br/>
                <TextInput label="Estatus"
                           disabled={true}
                           {...form.getInputProps("status")}/>
                <br/>
                <NumberInput label="Numero Minimo de Preguntas"
                             placeholder="Numero de Preguntas"
                             {...form.getInputProps("number_of_questions")}/>
                <br/>
                <Group>
                    {quiz.status === QuizStatus[QuizStatus.draft] &&
                        <Button type="submit" variant="outline">
                            Guardar
                        </Button>
                    }
                    {quiz.id && quiz.status === QuizStatus[QuizStatus.draft] &&
                        <Group>
                            <Button type="button" variant="outline">
                                <Link to={`/questions/new/${quiz.id}`}>
                                    Agregar Pregunta
                                </Link>
                            </Button>
                            {quiz.status === QuizStatus[QuizStatus.draft] &&
                                <Button type="button" variant="outline" onClick={() => onPublish()}>
                                    Publicar Encuesta
                                </Button>
                            }
                            {showDelete &&
                                <Button type="button" variant="outline" onClick={onDelete}>
                                    Eliminar Encuesta
                                </Button>
                            }
                        </Group>
                    }
                </Group>
            </form>
        </>
    )
}