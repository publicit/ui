import {Link} from "react-router-dom";

// Mantine :
import {DateTimePicker} from "@mantine/dates";
import {Button, FileInput, Grid, Group, Text, Textarea, TextInput} from "@mantine/core";

// Models :
import {Campaign} from "../models/campaign";
import {IconUpload} from "@tabler/icons-react";


type params = {
    onSubmit: any
    form: any
    campaign: Campaign
    onDelete?: any
    showDelete?: boolean
    canEdit: boolean
    onFileSelected: any
}

export default function CampaignEditForm({
                                             onSubmit,
                                             form,
                                             campaign,
                                             onDelete,
                                             showDelete = false,
                                             canEdit,
                                             onFileSelected,
                                         }: params) {

    return (
        <form onSubmit={form.onSubmit((data: any) => onSubmit(data))}>
            <div className="campaign-image-section">
                {campaign.image_url &&
                    <img
                        src={campaign.image_url}
                        alt="logo"
                        className="form-image"
                    />
                }
            </div>
            <Grid gutter={15}>
                <Grid.Col span={12}>
                    <TextInput label="Nombre"
                               size="md"
                               placeholder="Nombre"
                               disabled={!canEdit}
                               {...form.getInputProps("name")} />
                </Grid.Col>
                <Grid.Col span={12}>
                    <TextInput label="Imagen"
                               size="md"
                               disabled={!canEdit}
                               placeholder="URL Imagen"
                               {...form.getInputProps("image_url")} />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text>Fecha de Inicio</Text>
                    <DateTimePicker
                        size="md"
                        valueFormat="MMM DD, YYYY hh:mm A"
                        disabled={!canEdit}
                        {...form.getInputProps(`start_date`)}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Text>Fecha de Fin</Text>
                    <DateTimePicker
                        size="md"
                        valueFormat="MMM DD, YYYY hh:mm A"
                        disabled={!canEdit}
                        {...form.getInputProps(`end_date`)}
                    />
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
                    <Group mt="md">
                        {canEdit &&
                            <Button type="submit" size="md" variant="outline">
                                Guardar
                            </Button>
                        }
                        {campaign.id &&
                            <Group>
                                {canEdit && <>
                                    <Link to={`/quizs/new/${campaign.id}`}>
                                        <Button type="button" size="md" variant="outline" className="link-button">
                                            Agregar Encuesta
                                        </Button>
                                    </Link>
                                    {
                                        showDelete &&
                                        <Button type="button" size="md" variant="outline" onClick={onDelete}>
                                            Eliminar Campaña
                                        </Button>

                                    }
                                    {onFileSelected &&
                                        <FileInput size="md"
                                                   accept=".yaml"
                                                   multiple={false}
                                                   clearable={true}
                                                   leftSection={<IconUpload/>}
                                                   placeholder="Importar Encuesta"
                                                   label="Permite importar una encuesta desde un archivo en formato YAML"
                                                   onChange={file => onFileSelected(file)}
                                        />}
                                </>
                                }
                            </Group>
                        }
                    </Group>
                </Grid.Col>
            </Grid>
        </form>
    )
}