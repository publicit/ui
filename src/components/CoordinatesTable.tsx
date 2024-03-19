import {Coordinate} from "../models/coordinate";
import {Button} from "@mantine/core";
import React from "react";


type Params = {
    onDelete: any
    coordinates: Coordinate[]
}


export function CoordinatesTable({coordinates, onDelete}: Params) {
    return (
        <>
            <h2>Puntos Seleccionados:</h2>
            <ul className='locations-list'>
                {coordinates.map((c, index) => (
                    <li key={index}>
                        <a
                            href={c.url()}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {c.url()}
                        </a>
                        <Button
                            variant='outline' mt="sm"
                            onClick={() => onDelete(index)}
                        >
                            Eliminar
                        </Button>
                    </li>
                ))}
            </ul>
        </>
    )
}