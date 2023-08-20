import {File, IFile} from "../models/file";

export function toFile(file: any): IFile {
    const res = Object.assign(new File(), file);
    res.created = new Date(res.created)
    return res
}
