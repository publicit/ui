export function BaseApiURL():string{
    return process.env.BASE_API_URL || ""
}