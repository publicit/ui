import {Text, TextInput, Title} from "@mantine/core";
import {User} from "../models/user";
import {DatePickerInput} from "@mantine/dates";

type params = {
    form: any
    user: User
    showDelete?: boolean
}

export function UserEditForm({
                                 user,
                                 form,
                             }: params) {
    return (
        <>
            <form onSubmit={form.onSubmit((data: any) => {
                console.log(JSON.stringify(data))
            })}>
                <Title>{user.name}</Title>
                <br/>
                <TextInput label="Nombre"
                           placeholder="Nombre"
                           disabled={true}
                           {...form.getInputProps("name")}/>
                <br/>
                <TextInput label="Email"
                           placeholder="Email"
                           disabled={true}
                           {...form.getInputProps("email")}/>
                <br/>
                <Text>Ultimo inicio de sesion</Text>
                <DatePickerInput
                    disabled={true}
                    {...form.getInputProps(`last_login`)} />
            </form>
        </>
    )
}