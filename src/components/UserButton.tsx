import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import classes from './UserButton.module.css';

export function UserButton() {
    return (
        <UnstyledButton className={classes.user}>
            <Group>
                <Avatar
                    src="https://lh3.googleusercontent.com/a/ACg8ocJgnTdEOykjg1gonkhF_vdyWYYp7mJpMSr6JK3Kx1N6nts6=s96-c"
                    radius="xl"
                />

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        Mauricio Lopez
                    </Text>

                    <Text c="dimmed" size="xs">
                        mauricio.lopez@gmail.com
                    </Text>
                </div>

                <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
            </Group>
        </UnstyledButton>
    );
}