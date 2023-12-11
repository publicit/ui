import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {notifyErrResponse} from "../components/Errors";
import {UserQuiz} from "../models/user_quiz";
import {GetUserQuizSummary, PostUserQuizRetry, UserQuizShareLink} from "../helpers/api";
import {UserQuestion} from "../models/user_question";
import QuizSummary from "../components/QuizSummary";
import {useDisclosure} from "@mantine/hooks";
import UserQuizShareDialog from "../components/UserQuizShareDialog"
import {ActionIcon, Group, TextInput} from "@mantine/core";
import {IconAdjustments} from "@tabler/icons-react";
import {ClipboardCopy} from "tabler-icons-react";

export default function UserQuizSummaryView() {
    const navigate = useNavigate()
    const userQuizId = useParams().user_quiz_id || ""
    const [userQuiz, setUserQuiz] = useState<UserQuiz>(new UserQuiz())
    const [userQuestions, setUserQuestions] = useState<UserQuestion[]>([])
    const [sharedUrl,setSharedUrl]=useState("")

    async function loadData(id: string) {
        try {
            const res = await GetUserQuizSummary(userQuizId)
            setUserQuiz(res.user_quiz)
            setUserQuestions(res.user_questions)
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    useEffect(() => {
        loadData(userQuizId)
    }, []);

    async function retryQuiz() {
        try {
            await PostUserQuizRetry(userQuizId)
            navigate(`/user/quizs/${userQuizId}`)
        } catch (error) {
            await notifyErrResponse(error)
        }
    }

    async function shareQuiz() {
        try {
            const res = await UserQuizShareLink(userQuizId)
            setSharedUrl(JSON.stringify(res))
        } catch (error) {
            await notifyErrResponse(error)
        }
    }

    function shareDialogBody() {
        return (
            <>
                <Group>
                    <TextInput label="Link"
                               placeholder=""
                               value={sharedUrl}
                               disabled={true}/>
                    <ActionIcon variant="filled">
                        <ClipboardCopy style={{width: '70%', height: '70%'}} onClick={() => shareQuiz()} />
                    </ActionIcon>
                </Group>
            </>
        )
    }



    return (
        <>
            <QuizSummary userQuiz={userQuiz} userQuestions={userQuestions} onRetry={retryQuiz}/>
            <br/>
            <UserQuizShareDialog children={shareDialogBody()} onClose={() => setSharedUrl("")} onOpen={shareQuiz}/>
        </>
    )
}
