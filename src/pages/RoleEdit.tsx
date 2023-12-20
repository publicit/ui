import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {RoleGet, RolePut, UsersInRole} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {Role, roleValidation} from "../models/role";
import {RoleEditForm} from "../components/RoleEditForm";
import {User} from "../models/user";
import {UserTable} from "../components/UserTable";

export function RoleEdit() {
    const id = useParams().id || ""
    const navigate = useNavigate();
    const [role, setRole] = useState<Role>(new Role())
    const [users,setUsers]=useState<User[]>([])
    const form = useForm<Role>({
        initialValues: role,
        validate: roleValidation(),
    })
    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await RoleGet(id)
                setRole(data)
                form.setValues(data)
                const usersData = await UsersInRole(id)
                setUsers(usersData)
            } catch (e) {
                console.error(e)
            }
        }

        loadData(id);
    }, []);

    async function onSubmit(data: Role) {
        try {
            await RolePut(data)
            const returnURL = `/roles`
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    return (
        <>
            <RoleEditForm onSubmit={onSubmit} form={form} legend={role.name} role={role}/>
            <br/>
            <UserTable rows={users} />
        </>
    )
}
