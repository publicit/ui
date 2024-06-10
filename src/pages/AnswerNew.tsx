import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Mantine :
import { useForm } from '@mantine/form'

// Components :
import { notifyErrResponse } from '../components/Errors'
import AnswerEditForm from '../components/AnswerEditForm'
import { BreadcrumComponent } from '../components/BreadcrumComponent'

// Helpers :
import { AnswerPost, QuestionLoad } from '../helpers/api'

// Models :
import { Question } from '../models/question'
import { BreadcrumbItem } from '../models/breadcrumbItem'
import { Answer, answerValidation } from '../models/answer'

export default function AnswerNew() {
    const questionId = useParams().question_id || ''
    const navigate = useNavigate()
    const [answer] = useState<Answer>(new Answer())
    const [canEdit, setCanEdit] = useState<boolean>(true)
    const [items, setItems] = useState<BreadcrumbItem[]>([])
    const [question, setQuestion] = useState<Question>(new Question())
    const form = useForm<Answer>({
        initialValues: answer,
        validate: answerValidation(),
    })

    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await QuestionLoad(id)
                setQuestion(data)
                setItems([
                    {
                        text: `${data.quiz.campaign.name}`,
                        to: `/campaigns/${data.quiz.campaign.id}`,
                    },
                    {
                        text: `${data.quiz.name}`,
                        to: `/quizs/${data.quiz?.id}`,
                    },
                    {
                        text: `${data.body}`,
                        to: `/questions/${data.id}`,
                    },
                ])
            } catch (err) {
                await notifyErrResponse(err)
            }
        }
        loadData(questionId)
    }, [])

    async function onSubmit(data: Answer) {
        try {
            setCanEdit(false)
            data.question = question
            await AnswerPost(data)
            const returnURL = `/questions/${questionId}`
            navigate(returnURL)
        } catch (err) {
            await notifyErrResponse(err)
        } finally {
            setCanEdit(true)
        }
    }

    return (
        <>
            <BreadcrumComponent items={items} />
            <AnswerEditForm
                form={form}
                onSubmit={onSubmit}
                answer={answer}
                legend="Nueva Respuesta"
                canEdit={canEdit}
            />
        </>
    )
}
