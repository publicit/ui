import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {
    QuizLoadByToken,
    QuizRegisterInvitation,
    UserRegistrationLoad,
    UserRegistrationPost,
    UserWhoAmi
} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {fromUserRegistration, UserRegistration, userRegistrationValidation} from "../models/user_registration";
import {User} from "../models/user";
import ProfileForm from "../components/ProfileForm";
import {Quiz} from "../models/quiz";

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
                //  user may be redirected from a token invitation
                const token = params.get('token')
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
            const token = params.get('token')
            if (!token) navigate(returnUrl)
            //  call the server api to validate the token
            await QuizRegisterInvitation(token || "")
            //  once quiz has been validated, redirect to the quiz list
            navigate(`/`)
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
