import React from "react";
import { Link } from "react-router-dom";

// Mantine :
import { Button } from "@mantine/core";


type params = {
    token: string
}

export function QuizRegisterForm({ token }: params) {
    return (
        <React.Fragment>
            <p>Antes de responder la encuesta, es necesario que te registres.</p>
            <p>Haz click en CONTINUAR para acceder a tu registro. Te tomara 5 minutos el proceso.</p>
            <Button variant="outline" fullWidth mt="md" radius="md"
                component={Link} to={`/user/profile?token=${token}`}
            >
                Iniciar Registro
            </Button>
        </React.Fragment>
    )
}

export function QuizUnregisteredForm({ token }: params) {
    return (
        <React.Fragment>
            <p>Gracias por aplicar para resolver una encuesta.</p>
            <p>Es necesario que inicies sesion y te registres para continuar.</p>
            <p>Haz click en el boton INICIAR SESION.</p>
        </React.Fragment>
    )
}