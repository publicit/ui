import {useParams} from "react-router-dom";
import {useState} from "react";
import {Campaign, campaignValidation} from "../models/campaign";
import {useForm} from "@mantine/form";

export default function CampaignEdit() {
    const id = useParams().id
    const [campaign, setCampaign] = useState<Campaign>(new Campaign())
    const form = useForm<Campaign>({
        initialValues: campaign,
        validate: campaignValidation(),
    })
    return (
        <div>
            This is the campaign edit page
        </div>
    )
}
