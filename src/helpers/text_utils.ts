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

function truncateTime(utcDate: Date): Date {
    return new Date(
        utcDate.getUTCFullYear(),
        utcDate.getUTCMonth(),
        utcDate.getUTCDate(),
    )
}

function formatDate(d: Date): string {
    return dayjs(d).format("YYYY-MM-DD")
}

function trimBigText(d: string, maxLength: number = 50): string {
    return d.length >= maxLength ? `${d.substring(0, maxLength - 1)}...` : d
}


export {
    formatDate,
    trimAll,
    trimBigText,
    truncateTime,
}