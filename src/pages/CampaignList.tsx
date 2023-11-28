import CampaignCards from "../components/CampaignCards";
import {useEffect, useState} from "react";
import {Campaign} from "../models/campaign";
import {GetCampaignList} from "../helpers/api";


export default function CampaignList() {
    const [rows, setRows] = useState<Campaign[]>([])
    useEffect(() => {
        async function loadData() {
            try {
                const data = await GetCampaignList()
                setRows(data)
            } catch (e) {
                console.error(e)
            }
        }

        loadData();
    }, [rows]);
    return (
        <div>
            <CampaignCards rows={rows}/>
        </div>
    )
}
