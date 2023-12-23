import {Button, Group, NumberInput, TextInput} from "@mantine/core";
import {Quiz} from "../models/quiz";
import {Link} from "react-router-dom";

type params = {
    onSubmit: any
    onDelete?: any | undefined
    form: any
    legend: string
    quiz: Quiz
    showDelete?: boolean
    onPublish?: any | undefined
    canEdit:boolean
}

export default function QuizEditForm({
                                         onSubmit, form, legend, quiz, onDelete,
                                         showDelete = false, onPublish, canEdit,
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
                <img src="https://img.youtube.com/vi/-yIsQPp31L0/0.jpg" alt="thumbnail" />
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
                    {canEdit &&
                        <Button type="submit" variant="outline">
                            Guardar
                        </Button>
                    }
                    {quiz.id && canEdit &&
                        <Group>
                            <Button type="button" variant="outline">
                                <Link to={`/questions/new/${quiz.id}`}>
                                    Agregar Pregunta
                                </Link>
                            </Button>
                            <Button type="button" variant="outline" onClick={() => onPublish()}>
                                Publicar Encuesta
                            </Button>
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