import {useState} from 'react';
import {Box, Collapse, Group, NavLink, rem, ThemeIcon, UnstyledButton} from '@mantine/core';
import {IconChevronRight} from '@tabler/icons-react';
import classes from './NavbarLinksGroup.module.css';
import {useNavigate} from "react-router-dom";

interface LinksGroupProps {
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    links?: { label: string; link: string }[];
}

export function LinksGroup({icon: Icon, label, initiallyOpened, links}: LinksGroupProps) {
    const navigate = useNavigate();
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const items = (hasLinks ? links : []).map((link) => (
        <NavLink
            key={link.link}
            label={link.label}
            onClick={() => navigate(link.link)}
            style={{margin: '5px'}}
        />
    ));

    return (
        <>
            <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                <Group justify="space-between" gap={0}>
                    <Box style={{display: 'flex', alignItems: 'center'}}>
                        <ThemeIcon variant="light" size={30}>
                            <Icon style={{width: rem(18), height: rem(18)}}/>
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            style={{
                                width: rem(16),
                                height: rem(16),
                                transform: opened ? 'rotate(-90deg)' : 'none',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}
