import {BreadcrumbItem} from "../models/breadcrumbItem";
import {Breadcrumbs} from "@mantine/core";
import {Link} from "react-router-dom";

type Params = {
    items: BreadcrumbItem[]
}

export function BreadcrumComponent({items}: Params) {
    return (
        <Breadcrumbs>
            {items.map((item: BreadcrumbItem) => (
                <Link to={item.to}>{item.text}</Link>
            ))}
        </Breadcrumbs>
    )
}