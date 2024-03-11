import { Link } from "react-router-dom";

// Mantine :
import { Breadcrumbs } from "@mantine/core";

// Models :
import { BreadcrumbItem } from "../models/breadcrumbItem";

// Helpers :
import { trimAndCapitalize } from "../helpers/text_utils";


type Params = {
    items: BreadcrumbItem[]
}

const maxCharLength = 20;
export function BreadcrumComponent({ items }: Params) {
    return (
        <Breadcrumbs>
            {items.map((item: BreadcrumbItem, index) => (
                <div key={index}>
                    {index < items.length - 1 ? (
                        <Link key={item.to} to={item.to} className="non-active-link">
                            {trimAndCapitalize(item.text, maxCharLength)}
                        </Link>
                    ) : (
                        <Link key={item.to} to={item.to} className="active-link">
                            {trimAndCapitalize(item.text, maxCharLength)}
                        </Link>
                    )}
                </div>
            ))}
        </Breadcrumbs>
    )
}