import React from 'react'
import {sessionHeaders} from "@/app/helpers/session-headers";
import ApiParams from "@/app/helpers/api-params";
import {Campaign, toCampaign} from "@/app/domain/campaign";
import Link from "next/link";

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
        <div className="mt-4 -mb-3">
            <div>
                <Link href="/campaigns/new"
                      className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">
                    Crear Campaña
                </Link>
            </div>
            <div className="not-prose relative bg-slate-50 overflow-hidden dark:bg-slate-800/25">
                <div
                    className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"></div>
                <div className="relative rounded-xl overflow-auto">
                    <div className="shadow-sm overflow-hidden my-8">
                        <table className="border-collapse table-auto w-full text-sm">
                            <thead className="uppercase">
                            <tr>
                                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                    Nombre de Campaña
                                </th>
                                <th className="border-b dark:border-slate-600 font-medium p-4 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                    Inicia
                                </th>
                                <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                    Termina
                                </th>
                                <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                    Creado por
                                </th>
                                <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-800">
                            {data.map((x: Campaign) => (
                                <tr>
                                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                                        {x.name}
                                    </td>
                                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                                        {x.start_date.toLocaleDateString()}
                                    </td>
                                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                        {x.end_date.toLocaleDateString()}
                                    </td>
                                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                        {x.user?.name}
                                    </td>
                                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                                        <Link href={`/campaigns/${x.id}`}>Editar</Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
            </div>
        </div>
    )
}
