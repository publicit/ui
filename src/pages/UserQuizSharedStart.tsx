import {useParams} from "react-router-dom";
import {isLoggedIn} from "../helpers/sso_service";
import {QuizRegisterForm, QuizUnregisteredForm} from "../components/UserQuizRegisterForm";
import {useEffect, useState} from "react";
import {User} from "../models/user";
import {QuizLoad, UserRegistrationLoad, UserWhoAmi} from "../helpers/api";
import {UserRegistration} from "../models/user_registration";

export default function ShareStart() {
    const id = useParams().id || ""
    const [quizId,setQuizId]=useState<string>("")
    useEffect(() => {
        async function loadData() {
            try {
                const res = await QuizLoad()
            } catch (err) {
                // ignoring since the first time will always fail
            }
        }

        loadData()
    }, [])

    return (
        <>
            {isLoggedIn() ?
                <QuizRegisterForm />
                :
                <QuizUnregisteredForm id={id} />
            }
        </>
    )
}