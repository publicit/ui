import {useEffect, useState} from "react";

// Components :
import PreLoader from "../components/PreLoader";
import CampaignCards from "../components/CampaignCards";
import {notifyErrResponse} from "../components/Errors";

// Models :
import {Campaign} from "../models/campaign";

// Helpers :
import {CampaignList} from "../helpers/api";
import {isLoggedIn} from "../helpers/sso_service";


export default function CampaignsList() {
    const [rows, setRows] = useState<Campaign[]>([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await CampaignList()
                setRows(data);
            } catch (err) {
                await notifyErrResponse(err);
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, []);


    return isLoading ? <PreLoader/> : (
        <>
            <CampaignCards rows={rows}/>
        </>
    )
}
