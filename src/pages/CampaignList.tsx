import CampaignCards from "../components/CampaignCards";
import {useEffect, useState} from "react";
import {Campaign} from "../models/campaign";
import {CampaignList} from "../helpers/api";
import {isLoggedIn} from "../helpers/sso_service";


export default function CampaignsList() {
    const [rows, setRows] = useState<Campaign[]>([])
    useEffect(() => {
        async function loadData() {
            try {
                const data = await CampaignList()
                setRows(data)
            } catch (e) {
                console.error(e)
            }
        }
        loadData();
    }, []);
    if(!isLoggedIn()) return null
    return (
        <div>
            <CampaignCards rows={rows}/>
        </div>
    )
}
