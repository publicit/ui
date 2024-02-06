import { Link } from "react-router-dom";

// Mantine :
import { DatePickerInput } from "@mantine/dates";
import { Button, Grid, Group, Text, Textarea, TextInput } from "@mantine/core";

// Models :
import { Campaign } from "../models/campaign";


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
        <form onSubmit={form.onSubmit((data: any) => onSubmit(data))}>
            {campaign.image_url &&
                <img
                    src={campaign.image_url}
                    alt="logo"
                    className="compaign-image"
                />
            }
            <br />
            <legend className="legend-tag">{legend}</legend>
            <br />
            <Grid gutter="md">
                <Grid.Col span={6}>
                    <TextInput label="Nombre"
                        size="md"
                        placeholder="Nombre"
                        disabled={!canEdit}
                        {...form.getInputProps("name")} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput label="Imagen"
                        size="md"
                        disabled={!canEdit}
                        placeholder="URL Imagen"
                        {...form.getInputProps("image_url")} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text>Fecha de Inicio</Text>
                    <DatePickerInput
                        size="md"
                        disabled={!canEdit}
                        {...form.getInputProps(`start_date`)} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text>Fecha de Fin</Text>
                    <DatePickerInput
                        size="md"
                        disabled={!canEdit}
                        {...form.getInputProps(`end_date`)} />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Textarea label="Descripcion"
                        size="md"
                        minRows={2}
                        maxRows={10}
                        disabled={!canEdit}
                        placeholder="Descripcion"
                        {...form.getInputProps("description")} />
                </Grid.Col>
                <Grid.Col span={12}>
                    <Group>
                        {canEdit &&
                            <Button type="submit" size="md" variant="outline">
                                Guardar
                            </Button>
                        }
                        {campaign.id &&
                            <Group>
                                {canEdit && <>
                                    <Button type="button" size="md" variant="outline" className="link-button">
                                        <Link to={`/quizs/new/${campaign.id}`}>
                                            Agregar Encuesta
                                        </Link>
                                    </Button>
                                    {
                                        showDelete && <Button type="button" size="md" variant="outline" onClick={onDelete}>
                                            Eliminar Campaña
                                        </Button>

                                    }
                                </>
                                }
                            </Group>
                        }
                    </Group>
                </Grid.Col>
            </Grid>
        </form >
    )
}