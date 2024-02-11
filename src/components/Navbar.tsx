import {Code, Group, NavLink, rem, ScrollArea} from '@mantine/core';
import {UserButton} from './UserButton';
import {LinksGroup} from './NavbarLinksGroup';
import Logo from './Logo';
import classes from './NavbarNested.module.css';
import {useNavigate} from "react-router-dom";
import {UserProfileResponse} from "../models/user";
import React from "react";
import {MenuGroups} from "../helpers/menu_groups";
import {filterMenuGroup, glueMenus} from "../helpers/menu";


type NavbarParams = {
    version: string
    profile: UserProfileResponse | undefined
    login: any
    logout: any
}

// NavbarMain is the real navbar that appears on the left pane of the app.
export default function NavbarMain({profile, version, login, logout}: NavbarParams) {
    const menuItems = glueMenus(MenuGroups(),profile)
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
                {profile?.email ?
                    <>
                        <UserButton user={profile}/>
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