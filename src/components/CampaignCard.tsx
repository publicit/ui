import {Badge, Button, Card, Group, Image, Text} from "@mantine/core";
import {Campaign} from "../models/campaign";
import {Link} from "react-router-dom";
import {trimBigText} from "../helpers/text_utils";
import {Map, User} from "tabler-icons-react";

type Params = {
    c: Campaign
}

const maxTextLength = 250

export default function CampaignCard({c}: Params) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={c.image_url}
                    alt="logo"
                    height={220}
                />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <Map/>
                <Text fw={800}>
                    {c.name}
                </Text>
                <Badge color="pink" variant="light">
                    {c.status}
                </Badge>
            </Group>
            {c.description &&
                <Text size="sm" c="dimmed">
                    {trimBigText(c.description, maxTextLength)}
                </Text>
            }
            <br/>
            <Group>
                <User/>
                <Text size="lg">
                    {c.user.name}
                </Text>
            </Group>
            <Button
                variant="outline" fullWidth mt="md" radius="md"
                component={Link} to={`/campaigns/${c.id}`}
            >
                Editar
            </Button>
        </Card>
    )
}