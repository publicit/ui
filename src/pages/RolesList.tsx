import {useEffect, useState} from "react";
import {RoleList} from "../helpers/api";
import {isLoggedIn} from "../helpers/sso_service";
import {Role} from "../models/role";
import {RolesTable} from "../components/RolesTable";
import {Title} from "@mantine/core";


export function RolesList() {
    const [rows, setRows] = useState<Role[]>([])
    useEffect(() => {
        async function loadData() {
            try {
                const data = await RoleList()
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
            <Title>Listado de Roles</Title>
            <RolesTable rows={rows} />
        </div>
    )
}
