import {Button, Checkbox, Group, Textarea, Title} from "@mantine/core";
import {UseFormReturnType} from "@mantine/form";
import {Answer} from "../models/answer";

type params = {
    onSubmit: any
    onDelete?: any | undefined
    form: UseFormReturnType<Answer>
    legend: string
    answer: Answer
}


export default function AnswerEditForm({
                                           onSubmit,
                                           form,
                                           legend,
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
                <Checkbox
                    label="Respuesta Valida"
                    {...form.getInputProps('is_valid', {type: 'checkbox'})}
                />
                <br/>
                <Group>
                    <Button type="submit" variant="outline">
                        Guardar
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