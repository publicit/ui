import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {QuestionPost, QuizLoad} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {Quiz} from "../models/quiz";
import {Question, questionValidation} from "../models/question";
import QuestionEditForm from "../components/QuestionEditForm";
import {BreadcrumbItem} from "../models/breadcrumbItem";
import {BreadcrumComponent} from "../components/BreadcrumComponent";

export default function QuestionNew() {
    const quizId = useParams().quiz_id || ""
    const navigate = useNavigate();
    const [canEdit,setCanEdit]=useState<boolean>(true)
    const [question] = useState<Question>(new Question())
    const [quiz, setQuiz] = useState<Quiz>(new Quiz())
    const [items, setItems] = useState<BreadcrumbItem[]>([])
    const form = useForm<Question>({
        initialValues: question,
        validate: questionValidation(),
    })

    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await QuizLoad(id)
                setQuiz(data)
                setItems([
                    {
                        text: `${data.campaign.name}`,
                        to: `/campaigns/${data.campaign?.id}`
                    },
                    {
                        text: `${data.name}`,
                        to: `/quizs/${data.id}`
                    },
                ])
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(quizId)

    }, []);

    async function onSubmit(data: Question) {
        try {
            setCanEdit(false)
            data.quiz = quiz
            const res = await QuestionPost(data)
            const returnURL = `/questions/${res.id}`
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        }finally {
            setCanEdit(true)
        }
    }


    return (
        <>
            <BreadcrumComponent items={items}/>
            <br/>
            <QuestionEditForm onSubmit={onSubmit} form={form}
                              question={question} canEdit={canEdit}/>
        </>
    )
}
