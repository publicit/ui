import {useEffect, useState} from "react";
import {UserQuizList} from "../helpers/api";
import {UserQuiz} from "../models/user_quiz";
import UserQuizCards from "../components/UserQuizCards";


export default function List() {
    const [rows, setRows] = useState<UserQuiz[]>([])
    useEffect(() => {
        async function loadData() {
            try {
                const data = await UserQuizList()
                setRows(data)
            } catch (e) {
                console.error(e)
            }
        }

        loadData();
    }, []);
    return (
        <div>
            <UserQuizCards rows={rows}/>
        </div>
    )
}
