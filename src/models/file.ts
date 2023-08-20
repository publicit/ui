export interface IFile {
    filename: string
    size: number
    key?: string
    created: Date
    id: string
}

export class File {
    id: string
    filename: string
    size: number
    key?: string
    created: Date

    constructor() {
        this.id = ""
        this.filename = ""
        this.size = 0
        this.key = ""
        this.created = new Date()
    }
}

