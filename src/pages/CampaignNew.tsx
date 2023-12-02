import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Campaign, campaignValidation, cleanCampaign} from "../models/campaign";
import {useForm} from "@mantine/form";
import {PostCampaign} from "../helpers/api"
import {Title} from "@mantine/core";
import CampaignEdit from "../components/CampaignEdit";
import {notifyErrResponse} from "../components/Errors";

export default function CampaignNew() {
    const returnURL = "/campaigns"
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState<Campaign>(new Campaign())
    const form = useForm<Campaign>({
        initialValues: campaign,
        validate: campaignValidation(),
    })

    async function onSubmit(data: Campaign) {
        try {
            await PostCampaign(cleanCampaign(data))
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }


    return (
        <div>
            <Title>
                {campaign.name}
            </Title>
            <br/>
            <CampaignEdit form={form} onSubmit={onSubmit}
                          legend="Nueva Campania"/>

        </div>
    )
}
