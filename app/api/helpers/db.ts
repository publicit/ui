import ApiParams from "@/app/api/helpers/api-params";
import {Client} from "pg";

export default function Db() {
    const connStr = ApiParams().DbURL
    return new Client({
        connectionString: connStr,
    })
}