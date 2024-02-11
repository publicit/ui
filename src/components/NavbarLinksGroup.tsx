import React, {useState} from 'react';
import {Box, Collapse, Group, NavLink, rem, ThemeIcon, UnstyledButton} from '@mantine/core';
import {IconChevronRight} from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';
import {useNavigate} from "react-router-dom";
import {MenuGroup} from "../models/menuGroup";

interface LinksGroupProps {
    menuGroup: MenuGroup
}

export function LinksGroup({menuGroup}: LinksGroupProps) {
    const navigate = useNavigate();
    const hasLinks = true; // TODO: figure this out
    const [opened, setOpened] = useState(menuGroup.initiallyOpened || false);
    const items = menuGroup.items.map((item) => (
        <NavLink
            key={item.link}
            label={item.label}
            onClick={() => navigate(item.link)}
            style={{margin: '5px'}}
        />
    ));

    return (
        <>
            <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                <Group justify="space-between" gap={0}>
                    <Box style={{display: 'flex', alignItems: 'center'}}>
                        <ThemeIcon variant="light" size={30}>
                            <menuGroup.icon style={{width: rem(18), height: rem(18)}}/>
                        </ThemeIcon>
                        <Box ml="md">{menuGroup.label}</Box>
                    </Box>
                    <IconChevronRight
                        className={classes.chevron}
                        stroke={1.5}
                        style={{
                            width: rem(16),
                            height: rem(16),
                            transform: opened ? 'rotate(-90deg)' : 'none',
                        }}
                    />
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}
