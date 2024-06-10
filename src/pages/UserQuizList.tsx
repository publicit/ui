import { useEffect, useState } from 'react'

// Components :
import PreLoader from '../components/PreLoader'
import UserQuizCards from '../components/UserQuizCards'

// Models :
import { UserQuiz } from '../models/user_quiz'

// Helpers :
import { UserQuizList } from '../helpers/api'

export default function List() {
    const [rows, setRows] = useState<UserQuiz[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        async function loadData() {
            try {
                const data = await UserQuizList()
                setRows(data)
            } catch (e) {
                console.error(e)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [])

    return isLoading ? <PreLoader /> : <UserQuizCards rows={rows} />
}
