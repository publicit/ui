import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//  Mantine :
import { useForm } from "@mantine/form";

// Helpers :
import { CampaignLoad, QuizPost } from "../helpers/api"

// Components :
import { QuizEditForm } from "../components/QuizEditForm";
import { notifyErrResponse } from "../components/Errors";
import { BreadcrumComponent } from "../components/BreadcrumComponent";

// Models :
import { Campaign } from "../models/campaign";
import { BreadcrumbItem } from "../models/breadcrumbItem";
import { Quiz, QuizStatus, quizValidation } from "../models/quiz";


export default function QuizNew() {
    const [canEdit, setCanEdit] = useState<boolean>(true)
    const campaignId = useParams().campaign_id || ""
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState<Quiz>(new Quiz())
    const [items, setItems] = useState<BreadcrumbItem[]>([])
    const form = useForm<Quiz>({
        initialValues: quiz,
        validate: quizValidation(),
    })


    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await CampaignLoad(id)
                setItems([
                    {
                        text: `${data.name}`,
                        to: `/campaigns/${data.id}`
                    },
                ])
                quiz.status = QuizStatus[QuizStatus.draft]
                setQuiz(quiz)
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(campaignId)

    }, []);

    async function onSubmit(data: Quiz) {
        try {
            setCanEdit(false)
            const campaign = new Campaign()
            campaign.id = campaignId
            data.campaign = campaign
            const res: Quiz = await QuizPost(data)
            const returnURL: string = `/quizs/${res.id}`
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        } finally {
            setCanEdit(true)
        }
    }

    return (
        <>
            <BreadcrumComponent items={items} />
            <h1>Nueva Encuesta</h1>

            <div className="form-wrapper">
                <QuizEditForm
                    onSubmit={onSubmit} form={form}
                    legend="Nueva Encuesta" quiz={quiz} canEdit={canEdit}
                />
            </div>
        </>
    )
}
