import {Badge, Button, Card, Group, Text} from "@mantine/core";
import {Link} from "react-router-dom";
import {LayoutBoard} from "tabler-icons-react";
import {UserQuiz} from "../models/user_quiz";
import {Progress} from "@mantine/core";

type Params = {
    uq: UserQuiz
}


export default function UserQuizCard({uq}: Params) {
    function resolveLabel(status: string): string {
        switch (status) {
            case "completed":
                return "Ver"
            case "pending":
                return "Comenzar"
            case "started":
                return "Continuar"
            default:
                return ""
        }
    }

    function resolveStatus(status:string):string{
        switch (status) {
            case "completed":
                return "Completado"
            case "pending":
                return "Pendiente"
            case "started":
                return "En Proceso"
            default:
                return "N/A"
        }
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Text fw={800}>
                    {uq.quiz.name}
                </Text>
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <LayoutBoard/>
                <Badge color="pink" variant="light">
                    {resolveStatus(uq.status)}
                </Badge>
            </Group>
            <Progress value={uq.percent_completed * 100} />
            <Button
                variant="outline" color="blue" fullWidth mt="md" radius="md"
                component={Link} to={`/user/quizs/${uq.id}`}
            >
                {resolveLabel(uq.status)}
            </Button>
        </Card>
    )
}