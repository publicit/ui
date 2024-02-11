import {MenuItem} from "../models/menuItem";
import {UserProfileResponse} from "../models/user";
import {roleNameToEnum} from "./roles";
import {MenuGroup} from "../models/menuGroup";

export function menuItemHasRoleMembership(item: MenuItem, profile: UserProfileResponse | undefined): boolean {
    // no roles defined, means no authentication
    if (!item.roles || item.roles?.length === 0) return true
    // no profile email, cannot have any role membership
    if (!profile || !profile?.email) return false
    // compute the role membership on each item, first match returns true
    let ok: boolean = false
    item.roles.forEach(x => {
        profile.roles.forEach(y => {
            const newRole = roleNameToEnum(y)
            if (newRole === x) {
                ok = true
                return
            }
        })
    })
    return ok
}

export function filterMenuGroup(group: MenuGroup, profile: UserProfileResponse | undefined): MenuGroup | null {
    const items = group.items.filter(x => menuItemHasRoleMembership(x, profile))
    if (items.length === 0) return null
    return {
        icon: group.icon,
        initiallyOpened: group.initiallyOpened,
        label: group.label,
        items: items,
    }
}

export function glueMenus(groups: MenuGroup[], profile: UserProfileResponse | undefined): MenuGroup[] {
    const result: MenuGroup[] = []
    groups.forEach(group => {
        const filtered = filterMenuGroup(group, profile)
        if (!filtered) return
        result.push(filtered)
    })
    return result.filter(x => x.items.length > 0)
}