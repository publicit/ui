import {useParams} from "react-router-dom";
import {isLoggedIn} from "../helpers/sso_service";
import {QuizRegisterForm, QuizUnregisteredForm} from "../components/UserQuizRegisterForm";
import {useEffect, useState} from "react";
import {User} from "../models/user";
import {QuizLoad, QuizLoadByToken, UserRegistrationLoad, UserWhoAmi} from "../helpers/api";
import {UserRegistration} from "../models/user_registration";
import {Quiz} from "../models/quiz";
import {popupWarning} from "../components/Notifier";

export default function ShareStart() {
    const token = useParams().token || ""
    const [quiz, setQuiz] = useState<Quiz>(new Quiz())
    useEffect(() => {
        async function loadData() {
            try {
                const res = await QuizLoadByToken(token)
                setQuiz(res)
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