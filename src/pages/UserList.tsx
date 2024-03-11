import {useEffect, useState} from "react";
import {PostUserList, UserListParams} from "../helpers/api";
import {isLoggedIn} from "../helpers/sso_service";
import {Button, TextInput, Title} from "@mantine/core";
import {User} from "../models/user";
import {UserTable} from "../components/UserTable";


export function UsersList() {
    const [rows, setRows] = useState<User[]>([])
    const [offset, setOffset] = useState(0)
    const [email, setEmail] = useState("")
    const limit = 5

    async function loadData() {
        try {
            const params: UserListParams = {
                limit,
                offset,
                emails: []
            }
            if (email.length !== 0) {
                params.emails.push(email)
            }
            const data = await PostUserList(params)
            setRows(data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        loadData();
    }, []);


    if (!isLoggedIn()) return null


    return (
        <div>
            <Title>Listado de Usuarios</Title>
            <UserTable rows={rows}/>
            <hr/>
            <form onSubmit={async (e) => {
                e.preventDefault()
                setOffset(0)
                await loadData()
            }}>
                <TextInput
                    label="Buscar por Email"
                    description="Si hay coincidencias exactas, se mostrara el usuario que coincida con este email"
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button type="submit" variant="outline" disabled={!email}>
                    Buscar
                </Button>
            </form>
            <hr/>
            <div>
                <Button type="button" variant="outline" disabled={offset <= 0}
                        onClick={async () => {
                            setOffset(offset - limit)
                        }}
                >
                    Anterior
                </Button>
                <Button type="button" variant="outline" disabled={rows.length < limit}
                        onClick={async () => {
                            setOffset(offset + limit)
                            await loadData()
                        }}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    )
}
