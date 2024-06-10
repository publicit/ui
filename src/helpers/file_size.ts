import { filesize } from 'filesize'
import { AppError, HttpStatusBadRequest } from '../models/errors'

const inc = 1024
const Kb = inc
const Mb = Kb * inc

const MAX_FILE_SIZE = 5 * Mb

export function checkFileSize(file: File) {
    let message
    const size = file?.size
    if (!file) {
        message = 'No has seleccionado ningun archivo'
    } else if (size > MAX_FILE_SIZE) {
        message = `tamanio maximo para subir archivos es: ${filesize(MAX_FILE_SIZE)}, este archivo pesa: ${filesize(size)}`
    }
    if (message) {
        throw new AppError(message, 'file', HttpStatusBadRequest)
    }
}
