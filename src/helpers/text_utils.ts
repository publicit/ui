import dayjs from "dayjs";

function trimAll(s: any): any {
    switch (typeof s) {
        case "string":
            return s.trim()
        case "object":
            for (const [key] of Object.entries(s)) {
                s[key] = trimAll(s[key])
            }
    }
}

function truncateTime(date: Date): Date {
    return new Date(
        Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
        )
    )
}

export {
    trimAll,
    truncateTime,
}