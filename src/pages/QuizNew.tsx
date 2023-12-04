import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {QuizPost} from "../helpers/api"
import {Title} from "@mantine/core";
import {notifyErrResponse} from "../components/Errors";
import {Quiz, quizValidation} from "../models/quiz";
import QuizEditForm from "../components/QuizEditForm";
import {Campaign} from "../models/campaign";

export default function QuizNew() {
    const campaignId = useParams().campaign_id || ""
    const navigate = useNavigate();
    const [quiz] = useState<Quiz>(new Quiz())
    const form = useForm<Quiz>({
        initialValues: quiz,
        validate: quizValidation(),
    })

    async function onSubmit(data: Quiz) {
        try {
            const campaign = new Campaign()
            campaign.id = campaignId
            data.campaign = campaign
            const res: Quiz = await QuizPost(data)
            const returnURL: string = `/quizs/${res.id}`
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
            <QuizEditForm onSubmit={onSubmit} form={form} legend="Nueva Encuesta" quiz={quiz} campaignId={campaignId}/>
        </div>
    )
}
