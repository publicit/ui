import {Box, Button, Checkbox, Group, LoadingOverlay, Textarea, Title} from "@mantine/core";
import {UseFormReturnType} from "@mantine/form";
import {Answer} from "../models/answer";
import {useDisclosure} from "@mantine/hooks";

type params = {
    onSubmit: any
    onDelete?: any | undefined
    form: UseFormReturnType<Answer>
    legend: string
    answer: Answer
    canEdit: boolean
}


export default function AnswerEditForm({
                                           onSubmit,
                                           form,
                                           legend,
                                           onDelete,
                                           answer,
                                           canEdit,
                                       }: params) {
    const [visible, {toggle}] = useDisclosure(false);
    return (
        <>
            <Title>{legend}</Title>
            <form onSubmit={form.onSubmit(async (data: any) => {
                toggle()
                await onSubmit(data)
                toggle()
            })}>
                <Box pos="relative">
                    <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{radius: "sm", blur: 1}}/>
                    <br/>
                    <Textarea label="Texto de la Respuesta"
                              autosize
                              minRows={5}
                              maxRows={10}
                              placeholder="Texto de la Respuesta"
                              disabled={!canEdit}
                              {...form.getInputProps("body")}/>
                    <br/>
                    <Checkbox
                        label="Respuesta Valida"
                        disabled={!canEdit}
                        {...form.getInputProps('is_valid', {type: 'checkbox'})}
                    />
                    <br/>
                    {canEdit &&
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
                    }
                </Box>
            </form>
        </>
    )
}