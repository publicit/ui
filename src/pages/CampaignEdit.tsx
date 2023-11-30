import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Campaign, campaignValidation} from "../models/campaign";
import {useForm} from "@mantine/form";
import {GetCampaign, PutCampaign} from "../helpers/api"
import {Title} from "@mantine/core";
import CampaignEdit from "../components/CampaignEdit";

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
            } catch (e) {

            }
        }

        loadData(id)
    }, [])

    const onSubmit = async (data: Campaign) => {
        try {
            // clean should remove the time from the dates, and have UTC back and forth
            await PutCampaign(data.clean())
            navigate(returnURL);
        } catch (err) {
            // notifyErrResponse(err);
        }
    };


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
