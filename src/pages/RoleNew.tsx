import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {RolePost} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {Role, roleValidation} from "../models/role";
import {RoleEditForm} from "../components/RoleEditForm";

export function RoleNew() {
    const navigate = useNavigate();
    const [role] = useState<Role>(new Role())
    const form = useForm<Role>({
        initialValues: role,
        validate: roleValidation(),
    })

    async function onSubmit(data: Role) {
        try {
            await RolePost(data)
            const returnURL = `/roles`
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }


    return (
        <>
            <RoleEditForm onSubmit={onSubmit} form={form} legend={role.name} role={role}/>
        </>
    )
}
