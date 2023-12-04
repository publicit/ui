import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Campaign} from "../models/campaign";
import {useForm} from "@mantine/form";
import {QuizDelete, QuizLoad, QuizPut} from "../helpers/api"
import {Title} from "@mantine/core";
import {notifyErrResponse} from "../components/Errors";
import {Quiz, quizValidation} from "../models/quiz";
import QuizEditForm from "../components/QuizEditForm";

export default function Edit() {
    const returnURL = `/campaigns/${campaignId}`
    const id = useParams().id || ""
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz>(new Quiz())
    const form = useForm<Quiz>({
        initialValues: quiz,
        validate: quizValidation(),
    })
    useEffect(() => {
        async function loadData(id: string) {
            try {
                const c = new Campaign()
                c.id = campaignId
                const data = await QuizLoad(c, id)
                setQuiz(data)
                form.setValues(data)
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(id)
    }, [])

    async function onSubmit(data: Quiz) {
        try {
            await QuizPut(campaign, data)
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    async function onDelete() {
        try {
            // eslint-disable-next-line no-restricted-globals
            if(!confirm(`Seguro de eliminar la encuesta: ${quiz.name}?`)) return
            await QuizDelete(campaign, id)
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    return (
        <div>
            <Title>
                {quiz.name}
            </Title>
            <br/>
            <QuizEditForm onSubmit={onSubmit} form={form} legend="Datos de la Encuesta" quiz={quiz}
                          campaign={campaign} onDelete={onDelete}/>
        </div>
    )
}
