import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {
    fileUpload,
    QuizRegisterInvitation,
    UserProfileLoad,
    UserProfilePost,
    UserWhoAmi
} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {fromUserProfile, UserProfile, userProfileValidation} from "../models/user_profile";
import {User} from "../models/user";
import ProfileForm from "../components/ProfileForm";
import {FileItem} from "../models/file_item"

export default function Edit() {
    const returnUrl = "/"
    const navigate = useNavigate();
    const [user, setUser] = useState<User>(new User())
    const [userRegistration, setUserRegistration] = useState<UserProfile>(new UserProfile())
    const form = useForm<UserProfile>({
        initialValues: userRegistration,
        validate: userProfileValidation(),
    })
    const params = new URLSearchParams(window.location.search)
    const [ineFile, setIneFile] = useState<FileItem>(new FileItem())
    const [saveEnabled, setSaveEnabled] = useState(false)
    const [showUpload, setShowUpload] = useState(false)
    useEffect(() => {
        async function loadData() {
            try {
                const userData: User = await UserWhoAmi()
                setUser(userData)
                const userId: string = userData?.id || ""
                const data: UserProfile = await UserProfileLoad(userId)
                setUserRegistration(data)
                setShowUpload(!data.is_completed)
                form.setValues(data)
            } catch (err) {
                // ignoring since the first time may fail, we still need to load the data if available,
                // so
            }
        }

        loadData()
    }, [])

    async function onSubmit(data: UserProfile) {
        try {
            data.user_id = user.id || ""
            const userProfile = fromUserProfile(data)
            await UserProfilePost(userProfile, ineFile)
            // check if user is coming from a shared quiz url
            const token = params.get('token')
            if (params.has('token')) {
                //  call the server api to validate the token
                await QuizRegisterInvitation(token || "")
            }
            navigate(returnUrl)
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    async function onFileSelected(file: File) {
        if (!file) return
        try {
            // TODO: check file size is not beyond limit
            const f = new FileItem()
            const newFile = await fileUpload(f, file)
            setIneFile(newFile)
        } catch (err) {
            await notifyErrResponse(err)
        }
    }

    return (
        <>
            <ProfileForm onSubmit={onSubmit} form={form} email={user.email}
                         legend={`${userRegistration.first_name} ${userRegistration.last_name}`}
                         isCompleted={userRegistration.is_completed}
                         onFileSelected={onFileSelected}
                         saveEnabled={saveEnabled}
                         showUpload={showUpload}
            />
        </>
    )
}
