import {Button, FileInput, Group, Select, Text, TextInput, Title} from "@mantine/core";
import {UseFormReturnType} from "@mantine/form";
import {DatePickerInput} from "@mantine/dates";
import {UserRegistration, UserSex} from "../models/user_registration";
import {Check} from "tabler-icons-react";
import {IconUpload} from "@tabler/icons-react";
import {FileItem} from "../models/file_item";

type params = {
    onSubmit: any
    form: UseFormReturnType<UserRegistration>
    legend: string
    email?: string | undefined
    is_completed: boolean
    onFileSelected: any
    ineFile: FileItem
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
                                        is_completed,
                                        onFileSelected,
                                        ineFile,
                                    }: params) {
    return (
        <>
            <Title>
                {legend}
                {is_completed && <Check
                    size={32}
                    color="green"/>}
            </Title>
            <form onSubmit={form.onSubmit((data: any) => {
                onSubmit(data)
            })}>
                <br/>
                <TextInput label="Nombre(s)"
                           placeholder="Nombre(s)"
                           disabled={is_completed}
                           {...form.getInputProps("first_name")}/>
                <br/>
                <TextInput label="Apellidos"
                           placeholder="Apellidos"
                           disabled={is_completed}
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
                <DatePickerInput
                    disabled={is_completed}
                    {...form.getInputProps(`dob`)}
                />
                <br/>
                <Select
                    label="Sexo"
                    data={userSex}
                    comboboxProps={{transitionProps: {transition: 'pop', duration: 200}}}
                    {...form.getInputProps("sex")}
                    disabled={is_completed}
                />
                <br/>
                {!is_completed &&
                    <>
                        <FileInput
                            placeholder="Haz click para subir la parte trasera de tu credencial del INE"
                            label="Credencial INE"
                            multiple={false}
                            onChange={file => onFileSelected(file)}
                            leftSection={<IconUpload/>}
                            clearable={true}
                            accept="image/*"
                        />
                        <br/>
                    </>
                }
                <Group>
                    <Button
                        type="submit"
                        variant="outline"
                        disabled={!ineFile.id}
                    >
                        Guardar
                    </Button>
                </Group>
            </form>
        </>
    )
}