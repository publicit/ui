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
    const campaign = new Campaign()
    campaign.id = campaignId
    const navigate = useNavigate();
    const [quiz] = useState<Quiz>(new Quiz())
    const form = useForm<Quiz>({
        initialValues: quiz,
        validate: quizValidation(),
    })

    async function onSubmit(data: Quiz) {
        try {
            data.campaign = campaign
            const res = await QuizPost(campaign, data)
            const returnURL = `/quizs/${campaignId}/${res.id}`
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
            <QuizEditForm onSubmit={onSubmit} form={form} legend="Nueva Encuesta" quiz={quiz} campaign={campaign}/>
        </div>
    )
}
