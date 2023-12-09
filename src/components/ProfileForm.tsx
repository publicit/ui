import {Button, Group, Select, Text, TextInput, Title} from "@mantine/core";
import {UseFormReturnType} from "@mantine/form";
import {DatePickerInput} from "@mantine/dates";
import {UserRegistration, UserSex} from "../models/user_registration";

type params = {
    onSubmit: any
    form: UseFormReturnType<UserRegistration>
    legend: string
    email?: string | undefined
}

const userSex: string[] = [
    UserSex[UserSex.Hombre],
    UserSex[UserSex.Mujer],
    UserSex[UserSex.Otro],
]

export default function ProfileForm({
                                        onSubmit,
                                        form,
                                        legend,
                                        email,
                                    }: params) {
    return (
        <>
            <Title>{legend}</Title>
            <form onSubmit={form.onSubmit((data: any) => {
                onSubmit(data)
            })}>
                <br/>
                <TextInput label="Nombre(s)"
                           placeholder="Nombre(s)"
                           {...form.getInputProps("first_name")}/>
                <br/>
                <TextInput label="Apellidos"
                           placeholder="Apellidos"
                           {...form.getInputProps("last_name")}/>
                <br/>
                <TextInput label="Email"
                           value={email}
                           disabled
                />
                <br/>
                <TextInput label="Telefono"
                           placeholder="Telefono"
                           {...form.getInputProps("phone_number")}/>
                <br/>
                <Text>Fecha de Nacimiento</Text>
                <DatePickerInput {...form.getInputProps(`dob`)} />
                <br/>
                <Select
                    label="Sexo"
                    data={userSex}
                    comboboxProps={{transitionProps: {transition: 'pop', duration: 200}}}
                    {...form.getInputProps("sex")}
                />
                <br/>
                <Group>
                    <Button type="submit" variant="outline">
                        Guardar
                    </Button>
                </Group>
            </form>
        </>
    )
}