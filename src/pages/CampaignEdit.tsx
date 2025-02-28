import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Mantine :
import { Grid } from '@mantine/core';
import { useForm } from '@mantine/form';

// Compoenets :
import QuizTable from '../components/QuizTable';
import PreLoader from '../components/PreLoader';
import { notifyErrResponse } from '../components/Errors';
import CampaignEditForm from '../components/CampaignEditForm';

// Models :
import { Quiz } from '../models/quiz';
import { Campaign, campaignValidation } from '../models/campaign';

// Helpers :
import {
  CampaignDelete,
  CampaignLoad,
  CampaignPut,
  FileImportQuiz,
  FileItemUpload,
  QuizList,
  UserProfileFileSave,
} from '../helpers/api';
import { FileTypeNames } from '../models/user_profile';
import { checkFileSize } from '../helpers/file_size';
import { FileItem } from '../models/file_item';

export default function Edit() {
  const id = useParams().id || '';
  const returnURL = '/campaigns';
  const navigate = useNavigate();

  const [quizs, setQuizs] = useState<Quiz[]>([]);
  const [canEdit, setCanEdit] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [campaign, setCampaign] = useState<Campaign>(new Campaign());
  const form = useForm<Campaign>({
    initialValues: campaign,
    validate: campaignValidation(),
  });

  async function loadData(id: string) {
    try {
      const data = await CampaignLoad(id);
      setCampaign(data);
      form.setValues(data);
      const quizData: Quiz[] = await QuizList(id);
      setQuizs(quizData);
    } catch (err) {
      await notifyErrResponse(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData(id);
  }, []);

  async function onSubmit(data: Campaign) {
    try {
      setCanEdit(false);
      await CampaignPut(data);
      navigate(returnURL);
    } catch (err) {
      await notifyErrResponse(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
      setCanEdit(true);
    }
  }

  async function onDelete() {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (!confirm(`Seguro de eliminar la campaña: ${campaign.name}?`)) return;
      await CampaignDelete(id);
      navigate(returnURL);
    } catch (err) {
      await notifyErrResponse(err);
    }
  }

  async function onFileSelected(file: File) {
    try {
      checkFileSize(file);
      const f = new FileItem();
      f.content_type = file.type;
      f.reference_id = id;
      await FileImportQuiz(f, file, id);
    } catch (err) {
      await notifyErrResponse(err);
    } finally {
      await loadData(id);
    }
  }

  return isLoading ? (
    <PreLoader />
  ) : (
    <React.Fragment>
      <Grid gutter={15}>
        <Grid.Col span={{ md: 12, lg: 12 }}>
          <h1>Formulario de Campaña</h1>
          <div className="form-wrapper">
            <CampaignEditForm
              form={form}
              onSubmit={onSubmit}
              canEdit={canEdit}
              campaign={campaign}
              onDelete={onDelete}
              showDelete={quizs.length === 0}
              onFileSelected={onFileSelected}
            />
          </div>
        </Grid.Col>
        <Grid.Col span={{ md: 12, lg: 12 }}>
          <h1>Encuestas</h1>
          <QuizTable rows={quizs} />
        </Grid.Col>
      </Grid>
    </React.Fragment>
  );
}
