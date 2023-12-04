import {Button, Group, TextInput} from "@mantine/core";
import {Quiz} from "../models/quiz";
import {Campaign} from "../models/campaign";
import {Link} from "react-router-dom";

type params = {
    onSubmit: any
    onDelete?: any | undefined
    form: any
    legend: string
    quiz: Quiz
    campaign: Campaign
}

export default function QuizEditForm({onSubmit, form, legend, quiz, campaign, onDelete}: params) {
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
                <Group>
                    <Button type="submit" variant="outline">
                        Guardar
                    </Button>
                    <Button type="button" variant="outline">
                        <Link to={`/campaigns/${campaign.id}`}>
                            Regresar
                        </Link>
                    </Button>
                    {quiz.id &&
                        <Group>
                            <Button type="button" variant="outline">
                                <Link to={`/questions/new/${quiz.id}`}>
                                    Agregar Pregunta
                                </Link>
                            </Button>
                            <Button type="button" variant="outline" onClick={onDelete}>
                                Eliminar Encuesta
                            </Button>
                        </Group>
                    }
                </Group>
            </form>
        </>
    )
}