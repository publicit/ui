import {Button, Group, TextInput} from "@mantine/core";
import {Link} from "react-router-dom";
import {UserQuiz} from "../models/user_quiz";

type params = {
    onSubmit: any
    form: any
    legend: string
    userQuiz:UserQuiz
    onDelete?: any
    showDelete?: boolean
}

export default function EditForm({onSubmit, form, legend, userQuiz, onDelete, showDelete = false}: params) {
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
                <Group>
                    <Button type="submit" variant="outline">
                        Guardar
                    </Button>
                    <Group>
                        <Button type="button" variant="outline">
                            <Link to={`/quizs/new`}>
                                Agregar Encuesta
                            </Link>
                        </Button>
                        {showDelete &&
                            <Button type="button" variant="outline" onClick={onDelete}>
                                Eliminar Campaña
                            </Button>
                        }
                    </Group>
                </Group>
            </form>
        </>
    )
}