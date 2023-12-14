import {Button} from "@mantine/core";
import {Link} from "react-router-dom";

type params = {
    id: string
    token:string
}


export function QuizRegisterForm({id,token}:params) {
    return (
        <>
            <p>Antes de responder la encuesta, es necesario que te registres.</p>
            <p>Haz click en CONTINUAR para acceder a tu registro. Te tomara 5 minutos el proceso.</p>
            <Button variant="outline" fullWidth mt="md" radius="md"
                    component={Link} to={`/user/profile?quiz_id=${id}&token=${token}`}
            >
                Iniciar Registro
            </Button>
        </>
    )
}


export function QuizUnregisteredForm({id}: params) {
    return (
        <div>
            <p>Gracias por aplicar para resolver una encuesta.</p>
            <p>Es necesario que inicies sesion y te registres para continuar.</p>
            <p>Haz click en el boton INICIAR SESION.</p>
            <div>hello user quiz shared start {`id: ${id}`}</div>
        </div>
    )
}