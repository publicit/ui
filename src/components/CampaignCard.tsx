import {Badge, Button, Card, Group, Image, Text} from "@mantine/core";
import {Campaign} from "../models/campaign";
import {Link} from "react-router-dom";

type Params = {
    c: Campaign
}

export default function CampaignCard({c}: Params) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={c.image}
                    alt="logo"
                    height={220}
                />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} size="xl">{c.name}</Text>
                <Badge color="pink" variant="light">
                    {c.status}
                </Badge>
            </Group>
            {c.description &&
                <Text size="sm" c="dimmed">
                    {c.description}
                </Text>
            }
            <Text size="xs">
                {`${c.start_date.toLocaleDateString()} a ${c.end_date.toLocaleDateString()}`}
            </Text>
            <Text size="xs">
                {c.user.name}
            </Text>
            <Button
                variant="outline" color="blue" fullWidth mt="md" radius="md"
                component={Link} to={`/campaigns/${c.id}`}
            >
                Editar
            </Button>
        </Card>
    )
}