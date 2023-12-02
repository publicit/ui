import instance from "./axios"
import {Campaign, toCampaign} from "../models/campaign";

async function GetCampaignList() {
    const res = await instance.get(`/v1/campaigns`)
    return (res.data || []).map((x: any) => toCampaign(x))
}

async function GetCampaign(id: string) {
    const res = await instance.get(`/v1/campaigns/${id}`)
    return toCampaign(res.data)
}

async function PostCampaign(c: Campaign) {
    const res = await instance.post(`/v1/campaigns`, c)
    return toCampaign(res.data)
}

async function PutCampaign(c: Campaign) {
    const res = await instance.put(`/v1/campaigns/${c.id}`, c)
    return toCampaign(res.data)
}

export {
    GetCampaign,
    GetCampaignList,
    PostCampaign,
    PutCampaign,
}