import {MenuItem} from "./menuItem";

export type MenuGroup = {
    label: string
    icon: any
    initiallyOpened: boolean
    items: MenuItem[]
}
