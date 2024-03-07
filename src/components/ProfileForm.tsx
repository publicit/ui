import {IconUpload} from "@tabler/icons-react";

// Mantine :
import {UseFormReturnType} from "@mantine/form";
import {DatePickerInput} from "@mantine/dates";
import {Button, FileInput, Grid, Select, Text, TextInput} from "@mantine/core";

// Models :
import {FileType} from "../models/file_item";
import {UserGender, UserProfile, UserProfileFile} from "../models/user_profile";

// Helpers :
import {capitalizeAllWords} from "../helpers/text_utils";


type params = {
    onSubmit: any
    form: UseFormReturnType<UserProfile>
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
                                        email,
                                        isCompleted,
                                        onFileSelected,
                                        saveEnabled,
                                        fileTypes,
                                        files,
                                    }: params) {
    return (
        <form
            onSubmit={form.onSubmit(async (data: any) => {
                await onSubmit(data)
            })}
            className="form-wrapper"
        >

            <Grid gutter={10}>
                <Grid.Col span={6}>
                    <TextInput label="Nombre(s)" size="md"
                               placeholder="Nombre(s)"
                               disabled
                               {...form.getInputProps("first_name")}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <TextInput label="Apellidos" size="md"
                               placeholder="Apellidos"
                               disabled
                               {...form.getInputProps("last_name")}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <TextInput label="Email" size="md"
                               value={email}
                               disabled
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <TextInput label="Telefono" size="md"
                               placeholder="Telefono"
                               disabled={isCompleted}
                               {...form.getInputProps("phone_number")}
                    />
                </Grid.Col>

                <Grid.Col span={6}>
                    <Text>Fecha de Nacimiento</Text>
                    <DatePickerInput size="md"
                                     disabled
                                     {...form.getInputProps(`dob`)}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Select
                        label="Genero" size="md"
                        data={userGender}
                        comboboxProps={{transitionProps: {transition: 'pop', duration: 200}}}
                        {...form.getInputProps("gender")}
                        disabled
                    />
                </Grid.Col>
                <Grid.Col span={12}>
                    {fileTypes.map(fileType => {
                        const file = files.find(f => f.type === fileType.name)
                        if (!file) {
                            return null
                        }
                        return (
                            <div key={file.id}>
                                <FileInput size="md"
                                           accept="image/*"
                                           multiple={false}
                                           clearable={true}
                                           disabled={!!file.is_valid}
                                           leftSection={<IconUpload/>}
                                           placeholder={file.file?.name}
                                           label={capitalizeAllWords(fileType.description)}
                                           onChange={file => onFileSelected(file, fileType.name)}
                                />
                            </div>
                        )
                    })}
                </Grid.Col>
                <Grid.Col span={12} mt="sm">
                    {saveEnabled &&
                        <Button type="submit" size="md" variant="outline">
                            Guardar
                        </Button>
                    }
                </Grid.Col>
            </Grid>

        </form>
    )
}