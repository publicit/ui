import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mantine :
import { useForm } from "@mantine/form";

// Components :
import { notifyErrResponse } from "../components/Errors";
import CampaignEditForm from "../components/CampaignEditForm";

// Models :
import { Campaign, campaignValidation, cleanCampaign } from "../models/campaign";

// Helper :
import { CampaignPost } from "../helpers/api"


export default function CampaignNew() {
    const navigate = useNavigate();
    const [campaign] = useState<Campaign>(new Campaign())
    const [canEdit, setCanEdit] = useState<boolean>(true)
    const form = useForm<Campaign>({
        initialValues: campaign,
        validate: campaignValidation(),
    })

    async function onSubmit(data: Campaign) {
        try {
            setCanEdit(false)
            const res = await CampaignPost(cleanCampaign(data))
            const returnURL = `/campaigns/${res.id}`
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        } finally {
            setCanEdit(true)
        }
    }

    return (
        <>
            <h1>Nueva Campaña</h1>
            <div className="form-wrapper">
                <CampaignEditForm form={form}
                    onSubmit={onSubmit} canEdit={canEdit}
                    legend="Nueva Campaña" campaign={campaign}
                />
            </div>
        </>
    )
}
