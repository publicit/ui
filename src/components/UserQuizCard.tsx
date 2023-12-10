import {Badge, Button, Card, Group, Progress, Text} from "@mantine/core";
import {Link} from "react-router-dom";
import {CircleCheck, LayoutBoard} from "tabler-icons-react";
import {UserQuiz, UserQuizStatus} from "../models/user_quiz";
import {resolveUserQuizStatus, resolveUserQuizStatusIcon} from "../helpers/user_quiz_utils";

type Params = {
    uq: UserQuiz
}


function resolveLabel(status: string): string {
    switch (status) {
        case UserQuizStatus[UserQuizStatus.success]:
        case UserQuizStatus[UserQuizStatus.failed]:
            return "Ver"
        case UserQuizStatus[UserQuizStatus.pending]:
            return "Comenzar"
        case UserQuizStatus[UserQuizStatus.started]:
            return "Continuar"
        default:
            return ""
    }
}

export default function UserQuizCard({uq}: Params) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Text fw={800}>
                    {uq.quiz.name}
                </Text>
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <LayoutBoard/>
                {resolveUserQuizStatus(uq.status)}
                {resolveUserQuizStatusIcon(uq.status)}
            </Group>
            <Progress value={uq.percent_completed * 100}/>
            <Group>
                {(uq.status === UserQuizStatus[UserQuizStatus.success] || uq.status === UserQuizStatus[UserQuizStatus.failed]) &&
                    <Button
                        variant="outline" color="blue" fullWidth mt="md" radius="md"
                        component={Link} to={`/user/quizs/${uq.id}/summary`}
                    >
                        Ver
                    </Button>
                }
                {uq.percent_completed !== 1 &&
                    <Button
                        variant="outline" color="blue" fullWidth mt="md" radius="md"
                        component={Link} to={`/user/quizs/${uq.id}`}
                    >
                        {resolveLabel(uq.status)}
                    </Button>
                }
            </Group>
        </Card>
    )
}