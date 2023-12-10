import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Campaign, campaignValidation, cleanCampaign} from "../models/campaign";
import {useForm} from "@mantine/form";
import {CampaignPost} from "../helpers/api"
import {Title} from "@mantine/core";
import CampaignEditForm from "../components/CampaignEditForm";
import {notifyErrResponse} from "../components/Errors";

export default function CampaignNew() {
    const navigate = useNavigate();
    const [campaign] = useState<Campaign>(new Campaign())
    const canEdit=true
    const form = useForm<Campaign>({
        initialValues: campaign,
        validate: campaignValidation(),
    })

    async function onSubmit(data: Campaign) {
        try {
            const res = await CampaignPost(cleanCampaign(data))
            const returnURL = `/campaigns/${res.id}`
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
            <CampaignEditForm form={form} onSubmit={onSubmit} canEdit={canEdit}
                              legend="Nueva Campaña" campaign={campaign}/>

        </div>
    )
}
