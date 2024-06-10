import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Mantine :
import { Grid, Progress, Button, TextInput } from '@mantine/core'

// Components :
import PreLoader from '../components/PreLoader'
import { popupSuccess } from '../components/Notifier'
import { QuizSummary } from '../components/QuizSummary'
import { notifyErrResponse } from '../components/Errors'
import { UserQuizShareTable } from '../components/UserQuizShareTable'

// Models :
import { UserQuiz } from '../models/user_quiz'
import { UserQuestion } from '../models/user_question'
import { UserQuizShare } from '../models/user_quiz_share'

// Helpers :
import {
    UserQuizShareLink,
    PostUserQuizRetry,
    UserQuizShareList,
    GetUserQuizSummary,
    UserQuizShareDelete,
} from '../helpers/api'
import { quizTokenShareUrl } from '../helpers/user_quiz_utils'

export default function UserQuizSummaryView() {
    const navigate = useNavigate()
    const userQuizId = useParams().user_quiz_id || ''

    const [sharedUrl, setSharedUrl] = useState('')
    const [email, setEmail] = useState<string>('')
    const [rows, setRows] = useState<UserQuizShare[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isShareLoading, setIsshareLoading] = useState<boolean>(false)
    const [userQuiz, setUserQuiz] = useState<UserQuiz>(new UserQuiz())
    const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([])

    useEffect(() => {
        loadData(userQuizId)
    }, [])

    async function loadData(id: string) {
        try {
            const res = await GetUserQuizSummary(userQuizId)
            setUserQuiz(res.user_quiz)
            setUserQuestions(res.user_questions)
            await loadShares(res.user_quiz?.quiz?.id)
        } catch (err) {
            await notifyErrResponse(err)
        } finally {
            setIsLoading(false)
        }
    }

    async function loadShares(quizId: string) {
        const sharedData = await UserQuizShareList(quizId)
        setRows(sharedData)
    }

    async function retryQuiz() {
        try {
            await PostUserQuizRetry(userQuizId)
            navigate(`/user/quizs/${userQuizId}`)
        } catch (error) {
            await notifyErrResponse(error)
        }
    }

    async function shareQuiz() {
        try {
            const res = await UserQuizShareLink(userQuiz.quiz.id)
            const tokenUrl = quizTokenShareUrl(res)
            setSharedUrl(tokenUrl)
            await loadShares(userQuiz.quiz.id)
        } catch (error) {
            await notifyErrResponse(error)
        }
    }

    async function onDelete(item: UserQuizShare) {
        if (!window.confirm(`Eliminar esta invitacion?`)) return
        try {
            await UserQuizShareDelete(item.id, item.quiz.id)
            await loadShares(userQuiz.quiz.id)
        } catch (error) {
            await notifyErrResponse(error)
        }
    }

    async function shareQuizUsingEmail(uq: UserQuiz) {
        if (!email) return
        try {
            setIsshareLoading(true)
            await UserQuizShareLink(uq.quiz.id, email)
            popupSuccess({
                title: 'Éxito',
                confirmButtonText: true,
                timer: 3000,
                text: `Se ha generado una notificación a ${email} y se ha agregado a la encuesta ${uq.quiz.name}`,
            })
            setIsshareLoading(false)
        } catch (error) {
            await notifyErrResponse(error)
            setIsshareLoading(false)
        }
    }

    function EmailShareForm(uq: UserQuiz) {
        return (
            <React.Fragment>
                <form
                    className="email-dialog-box"
                    onSubmit={(e) => {
                        e.preventDefault()
                        shareQuizUsingEmail(uq).then(() =>
                            console.log(`TODO: close dialog`)
                        )
                    }}
                >
                    <div className="flex-email-field">
                        <TextInput
                            label="Email"
                            type="email"
                            placeholder="someone@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button
                            variant="outline"
                            type="submit"
                            loading={isShareLoading}
                            className="submit-button"
                        >
                            Enviar
                        </Button>
                    </div>
                </form>
            </React.Fragment>
        )
    }

    return isLoading ? (
        <PreLoader />
    ) : (
        <div className="user-quiz-summary-container">
            <h1 className="quiz-name">{userQuiz.quiz.name}</h1>
            <Progress mt="50px" value={userQuiz.percent_completed * 100} />
            <Grid gutter={15} mt="3rem">
                <Grid.Col span={{ md: 12, lg: 6 }}>
                    <QuizSummary
                        userQuiz={userQuiz}
                        shareQuiz={shareQuiz}
                        onRetry={retryQuiz}
                        userQuestions={userQuestions}
                        sharedUrl={sharedUrl}
                        setSharedUrl={setSharedUrl}
                        loadData={() => loadShares(userQuiz.quiz.id)}
                        emailShareDialog={EmailShareForm(userQuiz)}
                    />
                </Grid.Col>
                <Grid.Col span={{ md: 12, lg: 6 }}>
                    <UserQuizShareTable rows={rows} onDelete={onDelete} />
                </Grid.Col>
            </Grid>
        </div>
    )
}
