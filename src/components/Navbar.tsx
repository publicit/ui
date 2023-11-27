import {Code, Group, rem, ScrollArea} from '@mantine/core';
import {
    IconAdjustments,
    IconCalendarStats,
    IconFileAnalytics,
    IconGauge,
    IconLock,
    IconNotes,
    IconPresentationAnalytics,
} from '@tabler/icons-react';
import {UserButton} from './UserButton';
import {LinksGroup} from './NavbarLinksGroup';
import Logo from './Logo';
import classes from './NavbarNested.module.css';

const mockdata = [
    {label: 'Tablero', icon: IconGauge},
    {
        label: 'Campañas',
        icon: IconNotes,
        initiallyOpened: true,
        links: [
            {label: 'Listado', link: '/campaigns'},
            {label: 'Forecasts', link: '/'},
            {label: 'Outlook', link: '/'},
            {label: 'Real time', link: '/'},
        ],
    },
    {
        label: 'Releases',
        icon: IconCalendarStats,
        links: [
            {label: 'Upcoming releases', link: '/'},
            {label: 'Previous releases', link: '/'},
            {label: 'Releases schedule', link: '/'},
        ],
    },
    {label: 'Analytics', icon: IconPresentationAnalytics},
    {label: 'Contracts', icon: IconFileAnalytics},
    {label: 'Settings', icon: IconAdjustments},
    {
        label: 'Security',
        icon: IconLock,
        links: [
            {label: 'Enable 2FA', link: '/'},
            {label: 'Change password', link: '/'},
            {label: 'Recovery codes', link: '/'},
        ],
    },
];

const version = process.env.REACT_APP_TAG_NAME || ""

export default function NavbarNested() {
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label}/>);

    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <Group justify="space-between">
                    <Logo style={{width: rem(120)}}/>
                    <Code fw={700}>{version}</Code>
                </Group>
            </div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <UserButton/>
            </div>
        </nav>
    );
}
