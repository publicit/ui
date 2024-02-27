import {useNavigate, useParams} from "react-router-dom";
import {isLoggedIn} from "../helpers/sso_service";
import {QuizRegisterForm, QuizUnregisteredForm} from "../components/UserQuizRegisterForm";
import {useEffect, useState} from "react";
import {QuizLoadByToken, UserQuizRegister, UserProfileLoad, UserWhoAmi} from "../helpers/api";
import {Quiz} from "../models/quiz";
import {popupWarning} from "../components/Notifier";

export default function ShareStart() {
    const navigate = useNavigate()
    const token = useParams().token || ""
    const [quiz, setQuiz] = useState<Quiz>(new Quiz())
    useEffect(() => {
        async function loadData() {
            try {
                // load the quiz
                const q = await QuizLoadByToken(token)
                setQuiz(q)
                // load user data
                // check user registration is completed
                const user = await UserProfileLoad()
                if (!user.is_completed) return
                //  register the user to this quiz
                try {
                    await UserQuizRegister(q, token)
                    navigate(`/user/quizs`)
                } catch (err: any) {
                    const status = err.response?.status
                    switch (status){
                        case 409:
                            // TODO: fix the double registration thing, code is reaching here two times
                            // intercepting the 409 status from the backend to avoid ugly workflow
                            // in the ui
                            return
                        default:
                            popupWarning({
                                title: "Error",
                                text: "No se pudo hacer el registro de la encuesta",
                            })
                    }
                    navigate(`/user/quizs`)
                }
            } catch (err) {
                // first time will always fail
            }
        }

        loadData()
    }, [])


    return (
        <>
            {isLoggedIn() ?
                <QuizRegisterForm token={token}/>
                :
                <QuizUnregisteredForm token={token}/>
            }
        </>
    )
}