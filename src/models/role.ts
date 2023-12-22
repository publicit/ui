import {trimAll} from "../helpers/text_utils";

export class Role {
    id: string
    name: string
    description:string

    constructor() {
        this.id = ""
        this.name=""
        this.description=""
    }
}


export function roleValidation() {
    return {
        name: (value: string) => trimAll(value).length === 0 ? "Nombre es mandatorio" : null,
    }
}
