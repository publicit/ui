import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Mantine :
import { Grid } from "@mantine/core";
import { useForm } from "@mantine/form";

// Helpers :
import { AnswerList, QuestionDelete, QuestionLoad, QuestionPut } from "../helpers/api"

// Components :
import PreLoader from "../components/PreLoader";
import AnswerTable from "../components/AnswerTable";
import { notifyErrResponse } from "../components/Errors";
import QuestionEditForm from "../components/QuestionEditForm";
import { BreadcrumComponent } from "../components/BreadcrumComponent";

// Models :
import { Answer } from "../models/answer";
import { Quiz, QuizStatus } from "../models/quiz";
import { BreadcrumbItem } from "../models/breadcrumbItem";
import { Question, questionValidation } from "../models/question";


export default function Edit() {
    const id = useParams().id || ""
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState<Quiz>(new Quiz())
    const [answers, setAnswers] = useState<Answer[]>([])
    const [canEdit, setCanEdit] = useState<boolean>(false)
    const [returnUrl, setReturnUrl] = useState<string>("")
    const [items, setItems] = useState<BreadcrumbItem[]>([])
    const [question, setQuestion] = useState<Question>(new Question())
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const form = useForm<Question>({
        initialValues: question,
        validate: questionValidation(),
    })

    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await QuestionLoad(id)
                setQuestion(data)
                setQuiz(data.quiz)
                enableControls(data.quiz)
                form.setValues(data)
                setReturnUrl(`/quizs/${data.quiz.id}`)
                const answerData = await AnswerList(id)
                setAnswers(answerData)
                setItems([
                    {
                        text: `${data.quiz.campaign.name}`,
                        to: `/campaigns/${data.quiz.campaign?.id}`
                    },
                    {
                        text: `${data.quiz.name}`,
                        to: `/quizs/${data.quiz.id}`
                    },
                ])
            } catch (err) {
                await notifyErrResponse(err)
            } finally {
                setIsLoading(false)
            }
        }

        loadData(id)
    }, [])

    function enableControls(q: Quiz) {
        setCanEdit(q.status === QuizStatus[QuizStatus.draft])
    }

    async function onSubmit(data: Question) {
        try {
            setCanEdit(false)
            await QuestionPut(data)
            navigate(returnUrl);
        } catch (err) {
            await notifyErrResponse(err)
        } finally {
            enableControls(quiz)
        }
    }

    async function onDelete() {
        try {
            // eslint-disable-next-line no-restricted-globals
            if (!confirm(`Seguro de eliminar la pregunta?`)) return
            await QuestionDelete(id)
            navigate(returnUrl);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    return isLoading ? <PreLoader /> : (
        <>
            <BreadcrumComponent items={items} />
            <Grid gutter={15}>
                <Grid.Col span={{ md: 12, lg: 5, }}>
                    <h1>Formulario del Preguntas</h1>
                    <div className="form-wrapper">
                        <QuestionEditForm
                            form={form} question={question}
                            onSubmit={onSubmit} onDelete={onDelete}
                            canEdit={canEdit} showDelete={answers.length === 0}
                        />
                    </div>
                </Grid.Col>
                <Grid.Col span={{ md: 12, lg: 7, }}>
                    <h1>Tabla de Respuestas</h1>
                    <AnswerTable rows={answers} canEdit={canEdit} />
                </Grid.Col>
            </Grid>
        </>
    )
}
