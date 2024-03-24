import React from "react";

// Mantine :
import { Grid, Text, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

// Models :
import { User } from "../models/user";

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
        <React.Fragment>
            <form className="form-wrapper">
                <img
                    src={user.image}
                    alt="thumbnail"
                    className="form-image"
                />
                <Grid>
                    <Grid.Col span={12}>
                        <TextInput label="Nombre" size="md" mt="sm"
                            placeholder="Nombre" disabled={true}
                            {...form.getInputProps("name")}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput label="Email" size="md"
                            placeholder="Email" disabled={true}
                            {...form.getInputProps("email")}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Text>Ultimo inicio de sesion</Text>
                        <DatePickerInput size="md"
                            disabled={true}
                            {...form.getInputProps(`last_login`)}
                        />
                    </Grid.Col>
                </Grid>
            </form>
        </React.Fragment>
    )
}