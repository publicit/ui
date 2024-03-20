import {Location} from "../models/location";
import {Button} from "@mantine/core";
import React from "react";
import {Address} from "../models/address";


type Params = {
    onDelete?: any
    locations: Location[]
}


export function LocationsTable({locations, onDelete}: Params) {
    return (
        <>
            <h2>Puntos Seleccionados</h2>
            <ul className='locations-list'>
                {locations.map((location, index) => (
                    <li key={index}>
                        <a
                            href={location.url()}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {location.address
                                ? location.address.full
                                : location.url()}
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