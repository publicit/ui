import {Box, Button, Group, LoadingOverlay, Text, Textarea, TextInput} from "@mantine/core";
import {DatePickerInput} from "@mantine/dates";
import {Campaign} from "../models/campaign";
import {Link} from "react-router-dom";
import {useDisclosure} from "@mantine/hooks";

type params = {
    onSubmit: any
    form: any
    legend: string
    campaign: Campaign
    onDelete?: any
    showDelete?: boolean
    canEdit: boolean
}

export default function CampaignEditForm({
                                             onSubmit,
                                             form,
                                             legend,
                                             campaign,
                                             onDelete,
                                             showDelete = false,
                                             canEdit
                                         }: params) {
    const [visible, {toggle}] = useDisclosure(false);
    return (
        <>
            <form onSubmit={form.onSubmit(async (data: any) => {
                toggle()
                await onSubmit(data)
                toggle()
            })}>
                <Box pos="relative">
                    <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{radius: "sm", blur: 1}}/>
                    <legend>{legend}</legend>
                    <br/>
                    <TextInput label="Nombre"
                               placeholder="Nombre"
                               disabled={!canEdit}
                               {...form.getInputProps("name")}/>
                    <br/>
                    <Textarea label="Descripcion"
                              autosize
                              minRows={2}
                              maxRows={5}
                              disabled={!canEdit}
                              placeholder="Descripcion"
                              {...form.getInputProps("description")}/>
                    <br/>
                    <Text>Fecha de Inicio</Text>
                    <DatePickerInput
                        disabled={!canEdit}
                        {...form.getInputProps(`start_date`)} />
                    <br/>
                    <Text>Fecha de Fin</Text>
                    <DatePickerInput
                        disabled={!canEdit}
                        {...form.getInputProps(`end_date`)}  />
                    <br/>
                    <TextInput label="Imagen"
                               placeholder="URL Imagen"
                               disabled={!canEdit}
                               {...form.getInputProps("image_url")}/>
                    <br/>
                    {campaign.image_url &&
                        <img src={campaign.image_url} alt="logo" height="300"/>
                    }
                </Box>
                <Group>
                    {canEdit &&
                        <Button type="submit" variant="outline">
                            Guardar
                        </Button>
                    }
                    {campaign.id &&
                        <Group>
                            {
                                canEdit && <>
                                    <Button type="button" variant="outline">
                                        <Link to={`/quizs/new/${campaign.id}`}>
                                            Agregar Encuesta
                                        </Link>
                                    </Button>
                                    {
                                        showDelete && <Button type="button" variant="outline" onClick={onDelete}>
                                            Eliminar Campaña
                                        </Button>

                                    }
                                </>
                            }
                        </Group>
                    }
                </Group>
            </form>
        </>
    )
}