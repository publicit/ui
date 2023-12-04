import {Campaign} from "../models/campaign";
import {Badge, Button, Card, Group, Image, Text} from "@mantine/core";
import {Map, User} from "tabler-icons-react";
import {trimBigText} from "../helpers/text_utils";
import {Link} from "react-router-dom";

type Params = {
    campaign: Campaign
}

const maxTextLength = 100

export default function CampaignHeader({campaign}: Params) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Image
                    src={campaign.image_url}
                    alt="logo"
                    height={220}
                />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <Map/>
                <Text fw={800}>
                    {campaign.name}
                </Text>
                <Badge color="pink" variant="light">
                    {campaign.status}
                </Badge>
            </Group>
            {campaign.description &&
                <Text size="sm" c="dimmed">
                    {trimBigText(campaign.description, maxTextLength)}
                </Text>
            }
            <br/>
            <Group>
                <User/>
                <Text size="lg">
                    {campaign.user.name}
                </Text>
            </Group>
            <Button
                variant="outline" color="blue" fullWidth mt="md" radius="md"
                component={Link} to={`/campaigns/${campaign.id}`}
            >
                Editar
            </Button>
        </Card>
    )
}