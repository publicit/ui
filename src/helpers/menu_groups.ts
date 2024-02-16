import {MenuGroup} from "../models/menuGroup";
import {IconBellQuestion, IconGauge, IconLock, IconNotes, IconUser} from "@tabler/icons-react";
import {RoleNames} from "../models/role";

// returns the default menu groups for the whole application
// these items appear in the sidebar menu
export function MenuGroups(): MenuGroup[] {
    return [
        {
            label: 'PublicitUX',
            icon: IconGauge,
            initiallyOpened: false,
            items: [
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
            items: [
                {
                    label: 'Mis Campañas',
                    link: '/campaigns',
                    roles: [RoleNames.CampaignOwners],
                },
                {
                    label: 'Nueva Campaña',
                    link: '/campaigns/new',
                    roles: [RoleNames.CampaignOwners],
                },
            ],
        },
        {
            label: "Encuestas",
            initiallyOpened: true,
            icon: IconBellQuestion,
            items: [
                {
                    label: 'Mis Encuestas',
                    link: '/user/quizs',
                    roles: [RoleNames.Users],
                },
            ],
        },
        {
            label: 'Usuario',
            icon: IconUser,
            initiallyOpened: true,
            items: [
                {
                    label: 'Perfil',
                    link: '/user/profile',
                    roles: [RoleNames.Users],
                },
                {
                    label: 'Recompensas',
                    link: '/user/rewards',
                    roles: [RoleNames.Users],
                },
            ],
        },
        {
            label: 'Seguridad',
            icon: IconLock,
            initiallyOpened: true,
            items: [
                {
                    label: 'Roles',
                    link: '/roles',
                    roles: [RoleNames.Administrators],
                },
                {
                    label: 'Usuarios',
                    link: '/users',
                    roles: [RoleNames.Administrators],
                },
            ],
        },
        // {label: 'Analytics', icon: IconPresentationAnalytics},
        // {label: 'Contracts', icon: IconFileAnalytics},
        // {
        //     label: 'Configuracion',
        //     icon: IconAdjustments,
        //     items: [
        //         {label: 'Registro', link: '/'},
        //     ],
        // },
    ]
}