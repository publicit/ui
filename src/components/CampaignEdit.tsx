import {Button, Text, Textarea, TextInput} from "@mantine/core";
import {DatePickerInput} from "@mantine/dates";

type params = {
    onSubmit: any
    form: any
    legend: string
}

export default function CampaignEdit({onSubmit, form, legend}: params) {
    return (
        <>
            <form onSubmit={form.onSubmit((data: any) => {
                onSubmit(data)
            })}>
                <legend>{legend}</legend>
                <TextInput label="Nombre"
                           placeholder="Nombre"
                           {...form.getInputProps("name")}/>
                <Textarea label="Descripcion"
                          autosize
                          minRows={2}
                          maxRows={5}
                          placeholder="Descripcion"
                          {...form.getInputProps("description")}/>
                <Text>Fecha de Inicio</Text>
                <DatePickerInput
                    {...form.getInputProps(`start_date`)} />
                <Text>Fecha de Fin</Text>
                <DatePickerInput {...form.getInputProps(`end_date`)} />
                <br/>
                <Button type="submit" variant="outline">
                    Guardar
                </Button>
            </form>
        </>
    )
}