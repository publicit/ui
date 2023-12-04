import {Button, Group, Textarea, Title} from "@mantine/core";
import {Link} from "react-router-dom";
import {UseFormReturnType} from "@mantine/form";
import {Answer} from "../models/answer";

type params = {
    onSubmit: any
    onDelete?: any | undefined
    form: UseFormReturnType<Answer>
    legend: string
    questionId: string
    answer: Answer
}


export default function AnswerEditForm({
                                             onSubmit,
                                             form,
                                             legend,
                                             questionId,
                                             onDelete,
                                             answer,
                                         }: params) {
    return (
        <>
            <Title>{legend}</Title>
            <form onSubmit={form.onSubmit((data: any) => {
                onSubmit(data)
            })}>
                <br/>
                <Textarea label="Texto de la Respuesta"
                          autosize
                          minRows={5}
                          maxRows={10}
                          placeholder="Texto de la Respuesta"
                          {...form.getInputProps("body")}/>
                <br/>
                <Group>
                    <Button type="submit" variant="outline">
                        Guardar
                    </Button>
                    <Button type="button" variant="outline">
                        <Link to={`/questions/${questionId}`}>
                            Regresar
                        </Link>
                    </Button>
                    {answer?.id &&
                        <Group>
                            {answer.id &&
                                <Button type="button" variant="outline" onClick={onDelete}>
                                    Eliminar Respuesta
                                </Button>
                            }
                        </Group>
                    }
                </Group>
            </form>
        </>
    )
}