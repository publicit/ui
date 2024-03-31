import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components :
import {
    QuizRegisterForm,
    QuizUnregisteredForm
} from "../components/UserQuizRegisterForm";
import PreLoader from "../components/PreLoader";
import { popupWarning } from "../components/Notifier";

// Helpers :
import {
    QuizLoadByToken,
    UserQuizRegister,
    UserProfileLoad,
} from "../helpers/api";
import { isLoggedIn } from "../helpers/sso_service";

// Models :
import { Quiz } from "../models/quiz";

export default function ShareStart() {
    const navigate = useNavigate()
    const token = useParams().token || ""
    const [quiz, setQuiz] = useState<Quiz>(new Quiz())
    const [isLoading, isIsLoading] = useState<boolean>(true)

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
                    switch (status) {
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
            } finally {
                isIsLoading(false)
            }
        }

        loadData()
    }, [])

    return isLoading ? <PreLoader /> : (
        <React.Fragment>
            {isLoggedIn() ?
                <QuizRegisterForm token={token} />
                :
                <QuizUnregisteredForm token={token} />
            }
        </React.Fragment>
    )
}