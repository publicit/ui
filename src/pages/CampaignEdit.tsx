import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Campaign, campaignValidation, cleanCampaign} from "../models/campaign";
import {useForm} from "@mantine/form";
import {GetCampaign, PutCampaign} from "../helpers/api"
import {Title} from "@mantine/core";
import CampaignEdit from "../components/CampaignEdit";
import {notifyErrResponse} from "../components/Errors";

export default function Edit() {
    const id = useParams().id || ""
    const returnURL = "/campaigns"
    const navigate = useNavigate();
    const [campaign, setCampaign] = useState<Campaign>(new Campaign())
    const form = useForm<Campaign>({
        initialValues: campaign,
        validate: campaignValidation(),
    })
    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await GetCampaign(id)
                setCampaign(data)
                form.setValues(data)
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(id)
    }, [])

    async function onSubmit(data: Campaign) {
        try {
            await PutCampaign(cleanCampaign(data))
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
                          legend="Datos de la Campania"/>

        </div>
    )
}
