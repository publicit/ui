import {Button, Group, Text, Textarea, TextInput} from "@mantine/core";
import {DatePickerInput} from "@mantine/dates";
import {Campaign} from "../models/campaign";
import {Link} from "react-router-dom";

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
    return (
        <>
            <form onSubmit={form.onSubmit((data: any) => {
                onSubmit(data)
            })}>
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
                <Group>
                    {canEdit &&
                        <Button type="submit" variant="outline">
                            Guardar
                        </Button>
                    }
                    {campaign.id &&
                        <Group>
                            <Button type="button" variant="outline">
                                <Link to={`/quizs/new/${campaign.id}`}>
                                    Agregar Encuesta
                                </Link>
                            </Button>
                            {showDelete &&
                                <Button type="button" variant="outline" onClick={onDelete}>
                                    Eliminar Campaña
                                </Button>
                            }
                        </Group>
                    }
                </Group>
            </form>
        </>
    )
}