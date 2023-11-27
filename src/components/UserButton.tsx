import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';
import {User} from "../models/user"

export function UserButton(u:User) {
    return (
        <UnstyledButton className={classes.user}>
            <Group>
                <Avatar
                    src={u.image}
                    radius="xl"
                />

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {u.name}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {u.email}
                    </Text>
                </div>

                <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
            </Group>
        </UnstyledButton>
    );
}