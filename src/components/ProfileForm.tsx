import {Button, FileInput, Select, Text, TextInput, Title} from "@mantine/core";
import {UseFormReturnType} from "@mantine/form";
import {DatePickerInput} from "@mantine/dates";
import {UserProfile, UserProfileFile, UserSex} from "../models/user_profile";
import {Check} from "tabler-icons-react";
import {IconCheck, IconUpload, IconX} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
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
                                        isCompleted,
                                        onFileSelected,
                                        saveEnabled,
                                        fileTypes,
                                        files,
                                    }: params) {
    const [visible, {toggle}] = useDisclosure(false)
    return (
        <>
            <Title>
                {legend}
                {isCompleted && <Check
                    size={32}
                    color="green"/>}
            </Title>
            <form onSubmit={form.onSubmit((data: any) => {
                toggle()
                onSubmit(data)
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
                    data={userSex}
                    comboboxProps={{transitionProps: {transition: 'pop', duration: 200}}}
                    {...form.getInputProps("sex")}
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
                <Button
                    type="submit"
                    variant="outline"
                    disabled={!saveEnabled}
                >
                    Guardar
                </Button>

            </form>
        </>
    )
}