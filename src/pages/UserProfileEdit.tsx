import React, { useEffect, useState } from 'react';
import { Check } from 'tabler-icons-react';
import { useNavigate } from 'react-router-dom';

// Mantine :
import { useForm } from '@mantine/form';

// Components :
import PreLoader from '../components/PreLoader';
import { popupInfo } from '../components/Notifier';
import ProfileForm from '../components/ProfileForm';
import { notifyErrResponse } from '../components/Errors';

// Helpers :
import {
  FileTypes,
  UserWhoAmi,
  FileItemUpload,
  UserProfileLoad,
  UserProfilePost,
  UserProfileFileSave,
  UserProfileFilesLoad,
  QuizRegisterInvitation,
} from '../helpers/api';
import { checkFileSize } from '../helpers/file_size';

// Models :
import {
  UserProfile,
  FileTypeNames,
  fromUserProfile,
  UserProfileFile,
  userProfileValidation,
} from '../models/user_profile';
import { User } from '../models/user';
import { FileItem, FileType } from '../models/file_item';

export default function Edit() {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  const [user, setUser] = useState<User>(new User());
  const [userProfile, setUserProfile] = useState<UserProfile>(
    new UserProfile()
  );
  const [saveEnabled, setSaveEnabled] = useState(true);
  const [files, setFiles] = useState<UserProfileFile[]>([]);
  const [fileTypes, setFileTypes] = useState<FileType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const form = useForm<UserProfile>({
    initialValues: userProfile,
    validate: userProfileValidation(),
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadFiles() {
    const filesData = await UserProfileFilesLoad();
    setFiles(filesData);
  }

  async function loadData() {
    try {
      const userData: User = await UserWhoAmi();
      setUser(userData);
      const data: UserProfile = await UserProfileLoad();
      enableControls(data);
      setUserProfile(data);
      form.setValues(data);
      await loadFiles();
      const fileTypesData = await FileTypes();
      setFileTypes(fileTypesData);
      // check if user is coming from a shared quiz url
      const token = params.get('token');
      if (params.has('token') && data.is_completed) {
        //  call the server api to validate the token
        await QuizRegisterInvitation(token || '');
        // if all goes well, redirect to the user's quiz page
        navigate(`/user/quizs`);
      }
    } catch (err) {
      // ignoring since the first time may fail, we still need to load the data if available,
      console.warn(err);
    } finally {
      setIsLoading(false);
    }
  }

  function enableControls(p: UserProfile) {
    setSaveEnabled(!p.is_completed);
  }

  async function onSubmit(data: UserProfile) {
    try {
      await popupInfo({
        title: 'Actualizando Informacion',
        text: 'Por favor espera unos segundos',
      });
      setSaveEnabled(false);
      data.user_id = user.id || '';
      const userProfile = fromUserProfile(data);
      await UserProfilePost(userProfile);
      await loadData();
    } catch (err) {
      await notifyErrResponse(err);
    } finally {
      enableControls(userProfile);
    }
  }

  async function onFileSelected(file: File, fileType: FileTypeNames) {
    try {
      // check all required fields have been saved
      if (!userProfile.phone_number)
        throw new Error('Falta capturar el telefono');
      checkFileSize(file);
      const f = new FileItem();
      f.type = fileType.toString();
      f.content_type = file.type;
      f.reference_id = userProfile.id;
      setSaveEnabled(false);
      const newFile = await FileItemUpload(f, file);
      const payload = {
        file: newFile,
        type: fileType,
      };
      await UserProfileFileSave(payload);
      await loadData();
    } catch (err) {
      await notifyErrResponse(err);
    } finally {
      enableControls(userProfile);
      await loadFiles();
    }
  }

  return isLoading ? (
    <PreLoader />
  ) : (
    <React.Fragment>
      <h1>
        {`${userProfile.first_name} ${userProfile.last_name}`}
        {userProfile.is_completed && <Check size={32} color="green" />}
      </h1>
      <ProfileForm
        form={form}
        onSubmit={onSubmit}
        email={user.email}
        isCompleted={userProfile.is_completed}
        saveEnabled={saveEnabled}
        onFileSelected={onFileSelected}
        files={files}
        fileTypes={fileTypes}
      />
    </React.Fragment>
  );
}
