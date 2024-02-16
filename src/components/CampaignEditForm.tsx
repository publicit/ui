import { Link } from "react-router-dom";

// ANT-D :
import { Col, Row } from "antd";

// Mantine :
import { DatePickerInput } from "@mantine/dates";
import { Button, Grid, Group, Text, Textarea, TextInput, Title } from "@mantine/core";

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
            <div className="campaign-image-section">
                {campaign.image_url &&
                    <img
                        src={campaign.image_url}
                        alt="logo"
                        className="form-image"
                    />
                }
                {/* <legend className="legend-tag">{legend}</legend> */}
            </div>
            <Row gutter={[10, 10]}>
                <Col span={24}>
                    <TextInput label="Nombre"
                        size="md"
                        placeholder="Nombre"
                        disabled={!canEdit}
                        {...form.getInputProps("name")} />
                </Col>
                <Col span={24}>
                    <TextInput label="Imagen"
                        size="md"
                        disabled={!canEdit}
                        placeholder="URL Imagen"
                        {...form.getInputProps("image_url")} />
                </Col>
                <Col span={12}>
                    <Text>Fecha de Inicio</Text>
                    <DatePickerInput
                        size="md"
                        disabled={!canEdit}
                        {...form.getInputProps(`start_date`)} />
                </Col>
                <Col span={12}>
                    <Text>Fecha de Fin</Text>
                    <DatePickerInput
                        size="md"
                        disabled={!canEdit}
                        {...form.getInputProps(`end_date`)} />
                </Col>
                <Col span={24}>
                    <Textarea label="Descripcion"
                        size="md"
                        minRows={2}
                        maxRows={10}
                        disabled={!canEdit}
                        placeholder="Descripcion"
                        {...form.getInputProps("description")} />
                </Col>
                <Col span={24}>
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
                                        showDelete && <Button type="button" size="md" variant="outline" onClick={onDelete}>
                                            Eliminar Campaña
                                        </Button>

                                    }
                                </>
                                }
                            </Group>
                        }
                    </Group>
                </Col>
            </Row>
        </form>
    )
}