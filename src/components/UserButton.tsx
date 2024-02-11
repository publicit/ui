import {Avatar, Group, rem, Text, UnstyledButton} from '@mantine/core';
import {IconChevronRight} from '@tabler/icons-react';
import classes from './UserButton.module.css';
import {UserProfileResponse} from "../models/user"

type params = {
    user: UserProfileResponse
}

export function UserButton({user}:params) {
    return (
        <UnstyledButton className={classes.user}>
            <Group>
                <Avatar
                    src={user.picture}
                    radius="xl"
                />

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {user.name}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {user.email}
                    </Text>
                </div>

                <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
            </Group>
        </UnstyledButton>
    );
}