import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Mantine :
import { useForm } from '@mantine/form'

// Components :
import { notifyErrResponse } from '../components/Errors'
import AnswerEditForm from '../components/AnswerEditForm'
import { BreadcrumComponent } from '../components/BreadcrumComponent'

// Models :
import { QuizStatus } from '../models/quiz'
import { Question } from '../models/question'
import { BreadcrumbItem } from '../models/breadcrumbItem'
import { Answer, answerValidation } from '../models/answer'

// Helpers :
import { AnswerDelete, AnswerLoad, AnswerPut } from '../helpers/api'
import PreLoader from '../components/PreLoader'

export default function AnswerEdit() {
    const id = useParams().id || ''
    const navigate = useNavigate()
    const [answer, setAnswer] = useState<Answer>(new Answer())
    const [question, setQuestion] = useState<Question>(new Question())
    const [items, setItems] = useState<BreadcrumbItem[]>([])
    const [canEdit, setCanEdit] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const form = useForm<Answer>({
        initialValues: answer,
        validate: answerValidation(),
    })

    function returnUrl() {
        return `/questions/${question.id}`
    }

    useEffect(() => {
        async function loadData() {
            try {
                const data = await AnswerLoad(id)
                setAnswer(data)
                setQuestion(data.question)
                enableControls(data.question)
                form.setValues(data)
                setItems([
                    {
                        text: `${data.question.quiz.campaign.name}`,
                        to: `/campaigns/${data.question.quiz.campaign?.id}`,
                    },
                    {
                        text: `${data.question.quiz.name}`,
                        to: `/quizs/${data.question.quiz.id}`,
                    },
                    {
                        text: `${data.question.body}`,
                        to: `/questions/${data.question.id}`,
                    },
                ])
            } catch (err) {
                await notifyErrResponse(err)
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [])

    function enableControls(q: Question) {
        setCanEdit(q.quiz.status === QuizStatus[QuizStatus.draft])
    }

    async function onSubmit(data: Answer) {
        try {
            data.question = question
            await AnswerPut(data)
            navigate(returnUrl())
        } catch (err) {
            await notifyErrResponse(err)
        } finally {
            enableControls(question)
        }
    }

    async function onDelete() {
        try {
            // eslint-disable-next-line no-restricted-globals
            if (!confirm(`Seguro de eliminar la respuesta?`)) return
            await AnswerDelete(answer.id)
            navigate(returnUrl())
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    return isLoading ? (
        <PreLoader />
    ) : (
        <>
            <BreadcrumComponent items={items} />
            <AnswerEditForm
                form={form}
                onSubmit={onSubmit}
                answer={answer}
                legend="Formulario de Respuesta"
                onDelete={onDelete}
                canEdit={canEdit}
            />
        </>
    )
}
