import React from 'react'
import {sessionHeaders} from "@/app/helpers/session-headers";
import ApiParams from "@/app/helpers/api-params";
import {Campaign, toCampaign} from "@/app/domain/campaign";

export default async function Campaigns() {
    const params = ApiParams()
    const headers = await sessionHeaders()
    const uri = `${params.BaseURL}/v1/campaigns`
    const res = await fetch(uri, {
        method: "GET",
        headers,
        cache: "no-store",
    })
    const rows = await res.json()
    const data = rows.map((x: any) => toCampaign(x))
    return (
        <div className="p-5">
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm teclassNameft rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Nombre de Campaña
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Inicia
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Termina
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Video
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((x: Campaign) => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row"
                                className="px-6 py-4 font-meclassNametext-gray-900 whitespace-nowrap dark:text-white">
                                {x.name}
                            </th>
                            <td className="px-6 py-4">
                                {x.start_date.toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                {x.end_date.toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                <a href={x.video_url} target="_blank">
                                    {x.video_url}
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
