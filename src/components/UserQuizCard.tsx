import { Link } from 'react-router-dom'
import { Map } from 'tabler-icons-react'

// Mantine :
import { Button, Card, Flex, Group, Progress, Text } from '@mantine/core'

// Models :
import { UserQuiz, UserQuizStatus } from '../models/user_quiz'

// Helpers :
import { trimAndCapitalize } from '../helpers/text_utils'
import {
    resolveUserQuizStatus,
    resolveUserQuizStatusIcon,
} from '../helpers/user_quiz_utils'

type Params = {
    uq: UserQuiz
}

function resolveLabel(status: string): string {
    switch (status) {
        case UserQuizStatus[UserQuizStatus.success]:
        case UserQuizStatus[UserQuizStatus.failed]:
            return 'Ver'
        case UserQuizStatus[UserQuizStatus.pending]:
            return 'Comenzar'
        case UserQuizStatus[UserQuizStatus.started]:
            return 'Continuar'
        default:
            return ''
    }
}

export default function UserQuizCard({ uq }: Params) {
    return (
        <Card
            radius="lg"
            withBorder
            shadow="sm"
            padding="lg"
            className="user-quiz-card-container"
        >
            <Card.Section>
                <div className="card-image">
                    <img src={uq.quiz.thumbnail_url} alt="logo" />
                </div>
            </Card.Section>

            <Flex gap="sm" mt="sm" align="center">
                <Map />
                <Text fw={700}>
                    {uq.quiz.name && trimAndCapitalize(uq.quiz.name, 30)}
                </Text>
            </Flex>

            <div className="quiz-reward">
                <div>Premio : </div>
                <div> ${uq.quiz?.reward_amount} </div>
            </div>

            <div className="quiz-status">
                <div>Estado :</div>
                <div className="status">
                    {resolveUserQuizStatus(uq.status)}
                    {resolveUserQuizStatusIcon(uq.status)}
                </div>
            </div>

            <div className="quiz-expire-date">
                {uq.quiz?.expired ? (
                    <div style={{ color: 'red' }}>La encuesta ha expirado</div>
                ) : (
                    <div className="expire-date">
                        <span>Puedes responder hasta:</span>
                        {uq.quiz?.campaign?.end_date.toLocaleDateString()}
                    </div>
                )}
            </div>

            <Progress value={uq.percent_completed * 100} mt="sm" />

            <Group mt="md">
                {(uq.status === UserQuizStatus[UserQuizStatus.success] ||
                    uq.status === UserQuizStatus[UserQuizStatus.failed]) && (
                    <Button
                        variant="outline"
                        color="blue"
                        fullWidth
                        radius="md"
                        component={Link}
                        to={`/user/quizs/${uq.id}/summary`}
                    >
                        Ver
                    </Button>
                )}
                {uq.percent_completed !== 1 && !uq.quiz?.expired && (
                    <Button
                        variant="outline"
                        color="blue"
                        fullWidth
                        radius="md"
                        component={Link}
                        to={`/user/quizs/${uq.id}`}
                    >
                        {resolveLabel(uq.status)}
                    </Button>
                )}
            </Group>
        </Card>
    )
}
