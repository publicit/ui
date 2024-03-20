import {Location} from "../models/location";
import {Button} from "@mantine/core";
import React from "react";


type Params = {
    onDelete?: any
    locations: Location[]
}


export function LocationsTable({locations, onDelete}: Params) {
    return (
        <>
            <h2>Puntos Seleccionados</h2>
            <ul className='locations-list'>
                {locations.map((c, index) => (
                    <li key={index}>
                        <a
                            href={c.url()}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {c.url()}
                        </a>
                        {onDelete &&
                            <Button
                                variant='outline' mt="sm"
                                onClick={() => onDelete(index)}
                            >
                                Eliminar
                            </Button>
                        }
                    </li>
                ))}
            </ul>
        </>
    )
}