import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {
    FileItemUpload,
    FileTypes,
    QuizRegisterInvitation, UserProfileFileSave,
    UserProfileFilesLoad,
    UserProfileLoad,
    UserProfilePost,
    UserWhoAmi
} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {
    FileTypeNames,
    fromUserProfile,
    UserProfile,
    UserProfileFile,
    userProfileValidation
} from "../models/user_profile";
import {User} from "../models/user";
import ProfileForm from "../components/ProfileForm";
import {FileItem, FileType} from "../models/file_item"

export default function Edit() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>(new User())
    const [userProfile, setUserProfile] = useState<UserProfile>(new UserProfile())
    const form = useForm<UserProfile>({
        initialValues: userProfile,
        validate: userProfileValidation(),
    })
    const params = new URLSearchParams(window.location.search)
    const [saveEnabled, setSaveEnabled] = useState(true)
    const [files, setFiles] = useState<UserProfileFile[]>([])
    const [fileTypes, setFileTypes] = useState<FileType[]>([])

    async function loadData() {
        try {
            const userData: User = await UserWhoAmi()
            setUser(userData)
            const data: UserProfile = await UserProfileLoad()
            setSaveEnabled(!data.is_completed)
            setUserProfile(data)
            form.setValues(data)
            const filesData = await UserProfileFilesLoad()
            setFiles(filesData)
            const fileTypesData = await FileTypes()
            setFileTypes(fileTypesData)
            // check if user is coming from a shared quiz url
            const token = params.get('token')
            if (params.has('token') && data.is_completed) {
                //  call the server api to validate the token
                await QuizRegisterInvitation(token || "")
                // if all goes well, redirect to the user's quiz page
                navigate(`/user/quizs`)
            }

        } catch (err) {
            // ignoring since the first time may fail, we still need to load the data if available,
            console.warn(err)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    async function onSubmit(data: UserProfile) {
        try {
            setSaveEnabled(false)
            data.user_id = user.id || ""
            const userProfile = fromUserProfile(data)
            await UserProfilePost(userProfile)
            await loadData()
        } catch (err) {
            await notifyErrResponse(err)
            setSaveEnabled(true)
        }
    }

    async function onFileSelected(file: File, fileType: FileTypeNames) {
        if (!file) return
        try {
            // TODO: check file size is not beyond limit
            const f = new FileItem()
            f.type = fileType.toString()
            f.content_type = file.type
            setSaveEnabled(false)
            const newFile = await FileItemUpload(f, file)
            const payload = {
                file: newFile,
                type: fileType,
            }
            await UserProfileFileSave(payload)
        } catch (err) {
            await notifyErrResponse(err)
        } finally {
            setSaveEnabled(true)
        }
    }

    return (
        <>
            <ProfileForm onSubmit={onSubmit} form={form} email={user.email}
                         legend={`${userProfile.first_name} ${userProfile.last_name}`}
                         isCompleted={userProfile.is_completed}
                         onFileSelected={onFileSelected}
                         saveEnabled={saveEnabled}
                         fileTypes={fileTypes}
            />
        </>
    )
}
