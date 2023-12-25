import {toDate} from "../helpers/text_utils";

export class FileItem {
    id: string
    created: Date
    reference_id: string
    key: string
    name: string
    size: number

    constructor() {
        this.id = ""
        this.created = new Date()
        this.reference_id = ""
        this.key = ""
        this.name = ""
        this.size = 0
    }
}

export function toFileItem(v: any): FileItem {
    if (!v) return new FileItem()
    return {
        ...v,
        last_login: toDate(new Date(v["created"])),
    }
}

