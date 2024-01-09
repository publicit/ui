import {Button, FileInput, Select, Text, TextInput, Title} from "@mantine/core";
import {UseFormReturnType} from "@mantine/form";
import {DatePickerInput} from "@mantine/dates";
import {UserGender, UserProfile, UserProfileFile} from "../models/user_profile";
import {Check} from "tabler-icons-react";
import {IconCheck, IconUpload, IconX} from "@tabler/icons-react";
import {FileType} from "../models/file_item";

type params = {
    onSubmit: any
    form: UseFormReturnType<UserProfile>
    legend: string
    email?: string | undefined
    isCompleted: boolean
    onFileSelected: any
    saveEnabled: boolean
    fileTypes: FileType[]
    files: UserProfileFile[]
}

const userGender: string[] = [
    UserGender[UserGender.Hombre],
    UserGender[UserGender.Mujer],
    UserGender[UserGender.Otro],
]

export default function ProfileForm({
                                        onSubmit,
                                        form,
                                        legend,
                                        email,
                                        isCompleted,
                                        onFileSelected,
                                        saveEnabled,
                                        fileTypes,
                                        files,
                                    }: params) {
    return (
        <>
            <Title>
                {legend}
                {isCompleted && <Check
                    size={32}
                    color="green"/>}
            </Title>
            <form onSubmit={form.onSubmit(async (data: any) => {
                await onSubmit(data)
            })}>
                <br/>
                <TextInput label="Nombre(s)"
                           placeholder="Nombre(s)"
                           disabled={isCompleted}
                           {...form.getInputProps("first_name")}/>
                <br/>
                <TextInput label="Apellidos"
                           placeholder="Apellidos"
                           disabled={isCompleted}
                           {...form.getInputProps("last_name")}/>
                <br/>
                <TextInput label="Email"
                           value={email}
                           disabled
                />
                <br/>
                <TextInput label="Telefono"
                           placeholder="Telefono"
                           disabled={isCompleted}
                           {...form.getInputProps("phone_number")}/>
                <br/>
                <Text>Fecha de Nacimiento</Text>
                <DatePickerInput
                    disabled={isCompleted}
                    {...form.getInputProps(`dob`)}
                />
                <br/>
                <Select
                    label="Sexo"
                    data={userGender}
                    comboboxProps={{transitionProps: {transition: 'pop', duration: 200}}}
                    {...form.getInputProps("gender")}
                    disabled={isCompleted}
                />
                <br/>
                {
                    fileTypes.map(fileType => {
                        const file = files.find(f => f.type === fileType.name)
                        if (!file) {
                            return null
                        }
                        const iconRight = !!file.is_valid ? <IconCheck style={{color: "green"}}/> :
                            <IconX style={{color: "red"}}/>
                        return (
                            <>
                                <FileInput
                                    placeholder={file.file?.name}
                                    label={fileType.description}
                                    multiple={false}
                                    onChange={file => onFileSelected(file, fileType.name)}
                                    leftSection={<IconUpload/>}
                                    rightSection={iconRight}
                                    clearable={true}
                                    accept="image/*"
                                    disabled={!!file.is_valid}
                                />
                                <br/>
                            </>
                        )
                    })
                }
                {saveEnabled && <Button
                    type="submit"
                    variant="outline"
                >
                    Guardar
                </Button>
                }
            </form>
        </>
    )
}