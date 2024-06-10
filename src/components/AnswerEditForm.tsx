// eslint-disable-next-line import/no-duplicates
import { useDisclosure } from '@mantine/hooks'
import { UseFormReturnType } from '@mantine/form'
import { Box, Button, Checkbox, Group, Textarea } from '@mantine/core'

// Models :
import { Answer } from '../models/answer'

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
    const [visible, { toggle }] = useDisclosure(false)
    return (
        <>
            <h1>{legend}</h1>
            <form
                onSubmit={form.onSubmit(async (data: any) => {
                    toggle()
                    await onSubmit(data)
                    toggle()
                })}
                className="form-wrapper"
            >
                <Box pos="relative">
                    {/* <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 1 }} /> */}
                    <Textarea
                        label="Texto de la Respuesta"
                        autosize
                        minRows={5}
                        maxRows={10}
                        placeholder="Texto de la Respuesta"
                        disabled={!canEdit}
                        {...form.getInputProps('body')}
                    />
                    <br />
                    <Checkbox
                        label="Respuesta Valida"
                        disabled={!canEdit}
                        {...form.getInputProps('is_valid', {
                            type: 'checkbox',
                        })}
                    />
                    <br />
                    {canEdit && (
                        <Group>
                            <Button type="submit" variant="outline">
                                Guardar
                            </Button>
                            {answer?.id && (
                                <Group>
                                    {answer.id && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={onDelete}
                                        >
                                            Eliminar Respuesta
                                        </Button>
                                    )}
                                </Group>
                            )}
                        </Group>
                    )}
                </Box>
            </form>
        </>
    )
}
