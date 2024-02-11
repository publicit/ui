import {UserProfileResponse} from "../models/user";
import {glueMenus, menuItemHasRoleMembership} from "./menu";
import {RoleNames} from "../models/role";

function mockedProfile(): UserProfileResponse {
    return {
        name: "test",
        email: "me@example.com",
        roles: [],
        picture: "whatever",
        id: "1",
    }
}

test('no profile no auth membership', () => {
    const item = {
        label: "Inicio",
        link: "/",
    }
    const got = menuItemHasRoleMembership(item, undefined)
    expect(got).toEqual(true)
})

test('membership matches profile', () => {
    const item = {
        label: "Matches",
        link: "/",
        roles: [RoleNames.Unknown]
    }
    const profile = mockedProfile()
    profile.roles = ["users"]
    const got = menuItemHasRoleMembership(item, profile)
    expect(got).toEqual(false)
})

test("home page no auth", () => {
    const menus = [{
        label: 'Home',
        icon: null,
        initiallyOpened: false,
        items: [
            {
                label: "Inicio",
                link: "/",
            },
        ],
    }]
    const profile = mockedProfile()
    profile.roles = []
    const result = glueMenus(menus, profile)
    const expected = [{
        label: 'Home',
        icon: null,
        initiallyOpened: false,
        items: [
            {
                label: "Inicio",
                link: "/",
            },
        ],
    }]
    expect(result).toEqual(expected)
})

test("home page auth", () => {
    const menus = [{
        label: 'Home',
        icon: null,
        initiallyOpened: false,
        items: [
            {
                label: "Inicio",
                link: "/",
                roles: [RoleNames.Users],
            },
            {
                label: "Another",
                link: "/",
                roles: [RoleNames.Administrators],
            },
        ],
    }]
    const profile = mockedProfile()
    profile.roles = ['users']
    const result = glueMenus(menus, profile)
    const expected = [{
        label: 'Home',
        icon: null,
        initiallyOpened: false,
        items: [
            {
                label: "Inicio",
                link: "/",
                roles: [RoleNames.Users],
            },
        ],
    }]
    expect(result).toEqual(expected)
})