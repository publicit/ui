import { Link } from "react-router-dom";

// Mantine :
import { Button, Grid, Group, NumberInput, TextInput } from "@mantine/core";

// Models :
import { Quiz } from "../models/quiz";


type params = {
    onSubmit: any
    onDelete?: any | undefined
    form: any
    legend: string
    quiz: Quiz
    showDelete?: boolean
    onPublish?: any | undefined
    canEdit: boolean
}

export function QuizEditForm({
    onSubmit, form, legend, quiz, onDelete,
    showDelete = false, onPublish, canEdit,
}: params) {
    return (
        <>
            <form onSubmit={form.onSubmit(async (data: any) => onSubmit(data))}>
                <Grid gutter={10} pos="relative">
                    {/* <legend>{legend}</legend> */}
                    <Grid.Col span={12}>
                        {quiz.thumbnail_url &&
                            <Link to={quiz.video_url} target="_blank">
                                <img
                                    src={quiz.thumbnail_url}
                                    alt="thumbnail"
                                    className="form-image"
                                />
                            </Link>
                        }
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput label="Nombre"
                            size="md" placeholder="Nombre"
                            {...form.getInputProps("name")}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput label="Video URL"
                            size="md" placeholder="URL Video"
                            {...form.getInputProps("video_url")}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <TextInput label="Estatus"
                            size="md" disabled={true}
                            {...form.getInputProps("status")}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <NumberInput label="Numero de Preguntas"
                            size="md" placeholder="Numero de Preguntas"
                            {...form.getInputProps("number_of_questions")}
                        />
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Group mt="md">
                            {canEdit &&
                                <Button type="submit" size="md" variant="outline">
                                    Guardar
                                </Button>
                            }
                            {quiz.id && canEdit &&
                                <Group>
                                    <Link to={`/questions/new/${quiz.id}`}>
                                        <Button type="button" size="md" variant="outline">
                                            Agregar Pregunta
                                        </Button>
                                    </Link>
                                    <Button type="button" size="md" variant="outline" onClick={() => onPublish()}>
                                        Publicar Encuesta
                                    </Button>
                                    {showDelete &&
                                        <Button type="button" size="md" variant="outline" onClick={onDelete}>
                                            Eliminar Encuesta
                                        </Button>
                                    }
                                </Group>
                            }
                        </Group>
                    </Grid.Col>
                </Grid>
            </form>
        </>
    )
}