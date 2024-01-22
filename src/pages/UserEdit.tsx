import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {RoleAddUser, RoleList, RoleRemoveUser, RolesInUser, UserLoad} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {Role} from "../models/role";
import {User} from "../models/user";
import {UserEditForm} from "../components/UserEditForm";
import {RolesSimpleTable} from "../components/RolesSimpleTable";
import {Grid} from "@mantine/core";

export function UserEdit() {
    const id = useParams().id || ""
    const navigate = useNavigate();
    const [user, setUser] = useState<User>(new User())
    const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
    const [unselectedRoles, setUnselectedRoles] = useState<Role[]>([])
    const form = useForm<User>({
        initialValues: user,
    })

    async function loadRoles() {
        try {
            const selected = await RolesInUser(id)
            const allRoles = await RoleList()
            const unselected = allRoles.filter((x: Role) => !selected.find((r: Role) => r.id === x.id))
            setSelectedRoles(selected)
            setUnselectedRoles(unselected)
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    async function loadUser(id: string) {
        try {
            const data = await UserLoad(id)
            setUser(data)
            form.setValues(data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        loadUser(id);
        loadRoles()
    }, []);

    async function addRole(r: Role) {
        try {
            await RoleAddUser(r.id,user.id)
            await loadRoles()
        }catch (e){
            notifyErrResponse(e)
        }
    }

    async function removeRole(r: Role) {
        try {
            await RoleRemoveUser(r.id,user.id)
            await loadRoles()
        }catch (e){
            notifyErrResponse(e)
        }
    }


    return (
        <>
            <UserEditForm form={form} user={user}/>
            <br/>
            <hr/>
            <Grid>
                <Grid.Col span={6}>
                    <>
                        <h4>Roles Disponibles</h4>
                        <RolesSimpleTable rows={unselectedRoles} onClick={addRole}/>
                    </>
                </Grid.Col>
                <Grid.Col span={6}>
                    <>
                        <h4>Roles Asignados</h4>
                        <RolesSimpleTable rows={selectedRoles} onClick={removeRole}/>
                    </>
                </Grid.Col>
            </Grid>
        </>
    )
}
