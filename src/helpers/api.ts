import instance from "./axios"
import {toCampaign} from "../models/campaign";
async function GetCampaignList(){
    const res = await instance.get(`/v1/campaigns`)
    return (res.data || []).map((x:any) => toCampaign(x))
}
export {
    GetCampaignList,
}