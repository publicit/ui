type Params = {
    BaseURL: string | undefined
    DbURL: string | undefined
}

export default function ApiParams(): Params {
    return {
        BaseURL: process.env.BASE_API_URL,
        DbURL: process.env.DB_URL,
    }
}