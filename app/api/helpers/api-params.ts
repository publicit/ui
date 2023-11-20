type Params = {
    BaseURL: string | undefined
}

export default function ApiParams(): Params {
    return {
        BaseURL: process.env.BASE_API_URL,
    }
}