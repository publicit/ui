import {IFile} from "../models/file";
import {filesize} from "filesize";

export const maxAllowedFileSize = 10 * 1024 * 1024

export function checkFileSize(f: IFile): boolean {
    return f.size <= maxAllowedFileSize
}

export function fileToIFile(f: File | null): IFile | undefined {
    if (!f) return
    return {
        id: "",
        size: f.size,
        filename: f.name,
        created: new Date(),
    }
}

export function fileSize(size: number): any | undefined {
    return filesize(size, {standard: "jedec"})
}