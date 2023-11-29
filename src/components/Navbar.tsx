import {Code, Group, NavLink, rem, ScrollArea} from '@mantine/core';
import {IconGauge, IconNotes,} from '@tabler/icons-react';
import {UserButton} from './UserButton';
import {LinksGroup} from './NavbarLinksGroup';
import Logo from './Logo';
import classes from './NavbarNested.module.css';
import {useNavigate} from "react-router-dom";
import {User} from "../models/user";
import React from "react";

type MenuItem = {
    label: string
    link: string
    authenticated: boolean
}

type MenuGroup = {
    label: string
    icon: any
    initiallyOpened: boolean
    authenticated: boolean
    links: MenuItem[]
}

const menuData: MenuGroup[] = [
    {
        label: 'PublicitUX',
        icon: IconGauge,
        initiallyOpened: true,
        authenticated:false,
        links: [
            {
                label: "Inicio",
                link: "/",
                authenticated: false,
            },
        ],
    },
    {
        label: 'Campañas',
        icon: IconNotes,
        initiallyOpened: true,
        authenticated:true,
        links: [
            {
                label: 'Listado',
                link: '/campaigns',
                authenticated: true,
            },
            // {label: 'Nueva', link: '/campaign-new'},
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

type NavbarParams = {
    version: string
    user: User
    login: any
    logout: any
}

// NavbarMain is the real navbar that appears on the left pane of the app.
export default function NavbarMain({user, version, login, logout}: NavbarParams) {
    const menuItems = user?.email ? menuData : menuData.filter(x => !x.authenticated)
    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <Group justify="space-between">
                    <Logo style={{width: rem(120)}}/>
                    <Code fw={700}>{version}</Code>
                </Group>
            </div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>
                    {menuItems.map((item) => <LinksGroup {...item} key={item.label}/>)}
                </div>
            </ScrollArea>

            <div className={classes.footer}>
                {user?.email ?
                    <>
                        <UserButton email={user.email} name={user.name} image={user.image}/>
                        <NavLink label="Cerrar Sesion" onClick={logout}/>
                    </>
                    : <NavLink label="Iniciar Sesion" onClick={login}/>
                }
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