import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {UserRegistrationLoad, UserRegistrationPost, UserWhoAmi} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {fromUserRegistration, UserRegistration, userRegistrationValidation} from "../models/user_registration";
import {User} from "../models/user";
import ProfileForm from "../components/ProfileForm";

export default function Edit() {
    const returnUrl = "/"
    const navigate = useNavigate();
    const [user, setUser] = useState<User>(new User())
    const [userRegistration, setUserRegistration] = useState<UserRegistration>(new UserRegistration())
    const form = useForm<UserRegistration>({
        initialValues: userRegistration,
        validate: userRegistrationValidation(),
    })
    const params = new URLSearchParams(window.location.search)
    useEffect(() => {
        async function loadData() {
            try {
                const userData: User = await UserWhoAmi()
                setUser(userData)
                const userId: string = userData?.id || ""
                const data: UserRegistration = await UserRegistrationLoad(userId)
                setUserRegistration(data)
                form.setValues(data)
            } catch (err) {
                // ignoring since the first time will always fail
            }
        }

        loadData()
    }, [])

    async function onSubmit(data: UserRegistration) {
        try {
            data.user_id = user.id || ""
            await UserRegistrationPost(fromUserRegistration(data))
            // check if user is coming from a shared quiz url
            const quizId = params.get('quiz_id')
            const token = params.get('token')
            if (!quizId || !token) navigate(returnUrl)
            //  TODO: call the server api to validate the token
            console.info(`TODO: use quizId: ${quizId} and token: ${token}`)
            //  TODO: once quiz has been validated, redirect to the quiz list
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    return (
        <>
            <ProfileForm onSubmit={onSubmit} form={form} email={user.email}
                         legend={`${userRegistration.first_name} ${userRegistration.last_name}`}/>
        </>
    )
}
