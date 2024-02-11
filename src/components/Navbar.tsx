import {Code, Group, NavLink, rem, ScrollArea} from '@mantine/core';
import {UserButton} from './UserButton';
import {LinksGroup} from './NavbarLinksGroup';
import Logo from './Logo';
import classes from './NavbarNested.module.css';
import {UserProfileResponse} from "../models/user";
import React from "react";
import {MenuGroups} from "../helpers/menu_groups";
import {glueMenus} from "../helpers/menu";


type NavbarParams = {
    version: string
    profile: UserProfileResponse | undefined
    login: any
    logout: any
}

// NavbarMain is the real navbar that appears on the left pane of the app.
export default function NavbarMain({profile, version, login, logout}: NavbarParams) {
    const menuGroups = glueMenus(MenuGroups(),profile)
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
                    {menuGroups.map((menuGroup) => <LinksGroup menuGroup={menuGroup} key={menuGroup.label}/>)}
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
