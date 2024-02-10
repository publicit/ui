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
                    // TODO: fix the double registration thing, code is reaching here two times
                    await UserQuizRegister(q, token)
                    navigate(`/user/quizs`)
                } catch (err: any) {
                    const req = err?.request
                    if (!req) return
                    const text = req.response
                    if (!text) return
                    const body = JSON.parse(text)
                    popupWarning({
                        title: "Error",
                        text: body?.error || "No se pudo hacer el registro de la encuesta",
                    })
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