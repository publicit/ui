import {useEffect, useState} from "react";
import {PostUserList} from "../helpers/api";
import {isLoggedIn} from "../helpers/sso_service";
import {Title} from "@mantine/core";
import {User} from "../models/user";
import {UserTable} from "../components/UserTable";


export function UsersList() {
    const [rows, setRows] = useState<User[]>([])
    useEffect(() => {
        async function loadData() {
            try {
                const data = await PostUserList()
                setRows(data)
            } catch (e) {
                console.error(e)
            }
        }
        loadData();
    }, []);
    if(!isLoggedIn()) return null
    return (
        <div>
            <Title>Listado de Usuarios</Title>
            <UserTable rows={rows} />
        </div>
    )
}
