import { Link } from "react-router-dom";
import { IconTrash } from '@tabler/icons-react';
import { Edit, Map, User } from "tabler-icons-react";

// Mantine :
import { Badge, Button, Card, Flex, Group, Image, Text } from "@mantine/core";

// Models :
import { Campaign } from "../models/campaign";

// Helpers :
import { capitalizeAllWords, trimAndCapitalize, trimBigText } from "../helpers/text_utils";


type Params = {
    c: Campaign
}

const maxHeadingLength = 30;
const maxDescriptionLength = 150;

export default function CampaignCard({ c }: Params) {
    return (
        <Card
            withBorder
            shadow="md" radius="lg" padding="lg"
            className="campaign-card-container"
        >
            <Card.Section>
                <Image
                    alt="logo"
                    height={200}
                    src={c.image_url}
                />
            </Card.Section>
            <Flex gap="sm" mt="sm">
                <Map />
                <Text fw={800}>
                    {c.name &&
                        trimAndCapitalize(c.name, maxHeadingLength)
                    }
                </Text>
            </Flex>
            <Text
                size="sm" mt="sm" c="dimmed"
                className="campaign-card-description"
            >
                {c.description ?
                    trimBigText(c.description, maxDescriptionLength) :
                    <>la tarjeta no tiene descripción</>
                }
            </Text>
            <Group justify="space-between" mt="md" >
                <Flex gap="5px" align="center">
                    <User size={20} color="#4dabf7" />
                    <Text size="lg" pt="3px">
                        {c.user.name &&
                            capitalizeAllWords(c.user.name)
                        }
                    </Text>
                </Flex>
                <Badge color="pink" variant="light">
                    {c.status}
                </Badge>
            </Group>
            <Flex gap="md">
                {/* <Button
                    fullWidth
                    color="red"
                    mt="sm" radius="lg" variant="outline"

                >
                    Dileu
                    <IconTrash size={20} />
                </Button> */}
                <Button
                    fullWidth
                    mt="sm" radius="lg" variant="outline"
                    component={Link} to={`/campaigns/${c.id}`}
                >
                    Editar
                    <Edit size={20} />
                </Button>
            </Flex>
        </Card>
    )
}