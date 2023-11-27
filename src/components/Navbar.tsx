import {Code, Group, NavLink, rem, ScrollArea} from '@mantine/core';
import {IconGauge, IconNotes,} from '@tabler/icons-react';
import {UserButton} from './UserButton';
import {LinksGroup} from './NavbarLinksGroup';
import Logo from './Logo';
import classes from './NavbarNested.module.css';
import {useNavigate} from "react-router-dom";

const mockdata = [
    {
        label: 'Tablero',
        icon: IconGauge,
        initiallyOpened: true,
        links: [
            {
                label: "Inicio",
                link: "/",
            },
        ],
    },
    {
        label: 'Campañas',
        icon: IconNotes,
        initiallyOpened: true,
        links: [
            {label: 'Listado', link: '/campaigns'},
        ],
    },
    // {label: 'Analytics', icon: IconPresentationAnalytics},
    // {label: 'Contracts', icon: IconFileAnalytics},
    // {
    //     label: 'Configuracion',
    //     icon: IconAdjustments,
    //     links: [
    //         {label: 'Registro', link: '/'},
    //     ],
    // },
];

const version = process.env.REACT_APP_TAG_NAME || ""

// NavbarMain is the real navbar that appears on the left pane of the app.
export default function NavbarMain() {
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

// NavbarSimple is just an example I took from here: https://github.com/arslanah99/mantine_course_v7/blob/main/mantinecoursev7/src/App.tsx
export function NavbarSimple() {
    const navigate = useNavigate();

    return (
        <>
            <NavLink
                label="Home"
                onClick={() => navigate('/')}
                style={{margin: '5px'}}
            />
            <NavLink
                label="Campaigns"
                onClick={() => navigate('/campaigns')}
                style={{margin: '5px'}}
            />
        </>
    )
}