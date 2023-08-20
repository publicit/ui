import instance from "./axios";
import {IFile} from "../models/file";

export async function fileUploadSignature(f: IFile, file: File) {
    const res = await instance.post(`/v1/files/upload/sign`, f);
    const parsed = JSON.parse(JSON.stringify(res.data))
    const headers = parsed['header']
    const uri = parsed['uri']
    f.key = parsed['key']
    await fetch(uri, {
        method: "PUT",
        body: file,
        headers,
    })
    return f
}

export async function fileDownloadURL(id: string) {
    const res = await instance.get(`/v1/files/${id}/download`)
    return res.data || {}
}

export async function openFileFromId(id: string) {
    const res = await fileDownloadURL(id)
    const uri = res.uri
    window.open(uri, "_blank")
}