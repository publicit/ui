import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react'

// Mantine :
import {
    Button,
    Checkbox,
    CheckIcon,
    Grid,
    Group,
    Radio,
    Text,
} from '@mantine/core'

// Models :
import { UserQuiz } from '../models/user_quiz'
import { QuestionType } from '../models/question'
import { UserAnswer } from '../models/user_answer'
import { UserQuestion } from '../models/user_question'

type params = {
    onSubmit: any
    prevStep: any
    userQuiz: UserQuiz
    userQuestion: UserQuestion
    userAnswers: UserAnswer[]
    setSelectedAnswer: any
    selectMultiAnswer: any
    isSubmitEnabled(): boolean
    selectedAnswer: string
    selectedAnswers: any
}

export default function EditForm({
    onSubmit,
    prevStep,
    userAnswers,
    userQuestion,
    selectedAnswer,
    selectedAnswers,
    isSubmitEnabled,
    setSelectedAnswer,
    selectMultiAnswer,
}: params) {
    return (
        <div className="form-wrapper quiz-form">
            <Text className="question-body">{userQuestion.question.body}</Text>
            {userQuestion.question.type ===
            QuestionType[QuestionType.single] ? (
                <Grid>
                    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
                        <Radio.Group>
                            {userAnswers.map((a: UserAnswer) => (
                                <Radio
                                    key={a.answer.id}
                                    value={a.answer.id}
                                    label={a.answer.body}
                                    variant="outline"
                                    icon={CheckIcon}
                                    className="selected-option"
                                    onClick={(e) =>
                                        setSelectedAnswer(e.currentTarget.value)
                                    }
                                    style={{
                                        borderColor:
                                            selectedAnswer === a.answer.id
                                                ? 'var(--mantine-primary-color-filled)'
                                                : '',
                                        color:
                                            selectedAnswer === a.answer.id
                                                ? 'var(--mantine-primary-color-filled)'
                                                : '',
                                        background:
                                            selectedAnswer === a.answer.id
                                                ? 'var(--mantine-color-blue-outline-hover)'
                                                : '',
                                    }}
                                />
                            ))}
                        </Radio.Group>
                    </Grid.Col>
                </Grid>
            ) : (
                <Grid>
                    <Grid.Col span={6}>
                        {userAnswers.map((a: UserAnswer) => (
                            <Checkbox
                                key={a.answer.id}
                                label={a.answer.body}
                                value={a.answer.id}
                                variant="outline"
                                className="selected-option"
                                onClick={(e) => selectMultiAnswer(e)}
                                style={{
                                    borderColor: selectedAnswers.includes(
                                        a.answer.id
                                    )
                                        ? 'var(--mantine-primary-color-filled)'
                                        : '',
                                }}
                            />
                        ))}
                    </Grid.Col>
                </Grid>
            )}
            <Group mt="md">
                <Button
                    variant="default"
                    size="md"
                    className="back-button"
                    onClick={() => prevStep()}
                >
                    <IconArrowNarrowLeft className="icon" /> Atrás
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className="next-button"
                    onClick={() => onSubmit()}
                    disabled={!isSubmitEnabled()}
                >
                    Siguiente <IconArrowNarrowRight className="icon" />
                </Button>
            </Group>
        </div>
    )
}
