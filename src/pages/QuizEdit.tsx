import React, { useEffect, useState } from "react";
import { LuDownload } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

// Mantine :
import { Button, Flex, Grid } from "@mantine/core";
import { useForm } from "@mantine/form";

// Helpers :
import {
  QuizPut,
  QuizLoad,
  QuizDelete,
  QuizPublish,
  CampaignLoad,
  QuestionList,
  QuizLocations,
  FileExportQuiz,
  UserQuizShareLink,
} from "../helpers/api";
import { quizTokenShareUrl } from "../helpers/user_quiz_utils";

// Components :
import PreLoader from "../components/PreLoader";
import QuestionTable from "../components/QuestionTable";
import { notifyErrResponse } from "../components/Errors";
import { QuizEditForm } from "../components/QuizEditForm";
import { ShareDialogBody } from "../components/ShareDialog";
import { ShowDialog } from "../components/UserQuizShareDialog";
import { BreadcrumComponent } from "../components/BreadcrumComponent";

// Models :
import { Question } from "../models/question";
import { Campaign } from "../models/campaign";
import { Location } from "../models/location";
import { BreadcrumbItem } from "../models/breadcrumbItem";
import { LocationsTable } from "../components/LocationsTable";
import { Quiz, QuizStatus, quizValidation } from "../models/quiz";

export default function Edit() {
  const id = useParams().id || "";
  const navigate = useNavigate();

  const [sharedUrl, setSharedUrl] = useState("");
  const [quiz, setQuiz] = useState<Quiz>(new Quiz());
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [items, setItems] = useState<BreadcrumbItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [campaign, setCampaign] = useState<Campaign>(new Campaign());
  const form = useForm<Quiz>({
    initialValues: quiz,
    validate: quizValidation(),
  });

  useEffect(() => {
    async function loadData(id: string) {
      try {
        const data = await QuizLoad(id);
        setQuiz(data);
        enableControls(data);
        form.setValues(data);
        const res = await QuestionList(id);
        setQuestions(res);
        const resCampaign = await CampaignLoad(data.campaign.id);
        setCampaign(resCampaign);
        setItems([
          {
            text: resCampaign.name,
            to: `/campaigns/${resCampaign.id}`,
          },
        ]);
        const locs = await QuizLocations(id);
        setLocations(locs);
      } catch (err) {
        await notifyErrResponse(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData(id);
  }, []);

  function enableControls(q: Quiz) {
    setCanEdit(q.status === QuizStatus[QuizStatus.draft]);
  }

  async function onSubmit(data: Quiz) {
    try {
      setCanEdit(false);
      await QuizPut(data);
      const returnUrl = `/campaigns/${campaign.id}`;
      navigate(returnUrl);
    } catch (err) {
      await notifyErrResponse(err);
    } finally {
      enableControls(data);
    }
  }

  async function onDelete() {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (!confirm(`Seguro de eliminar la encuesta: ${quiz.name}?`)) return;
      await QuizDelete(id);
      const returnUrl = `/campaigns/${campaign.id}`;
      navigate(returnUrl);
    } catch (err) {
      await notifyErrResponse(err);
    }
  }

  async function onPublish() {
    try {
      // eslint-disable-next-line no-restricted-globals
      if (
        // eslint-disable-next-line no-restricted-globals
        !confirm(
          `Seguro de publicar la encuesta: ${quiz.name}?\nUna vez publicada ya no se podran editar las preguntas.`
        )
      )
        return;
      await QuizPublish(id);
      const returnUrl = `/campaigns/${campaign.id}`;
      navigate(returnUrl);
    } catch (err: any) {
      await notifyErrResponse(err);
    }
  }

  async function shareQuiz() {
    try {
      const res = await UserQuizShareLink(quiz.id);
      const tokenUrl = quizTokenShareUrl(res);
      console.log("generating a new token:", tokenUrl);
      setSharedUrl(tokenUrl);
    } catch (error) {
      await notifyErrResponse(error);
    }
  }

  async function importCampaign() {
    try {
      const res = await FileExportQuiz(quiz.id);

      // Create a Blob from the YAML string
      const blob = new Blob([res], { type: "text/yaml" });
      // Create a link element
      const link = document.createElement("a");
      // Set the download attribute with a filename
      link.download = `${quiz.name}.yml`;
      link.href = window.URL.createObjectURL(blob);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      await notifyErrResponse(error);
    }
  }

  return isLoading ? (
    <PreLoader />
  ) : (
    <React.Fragment>
      <BreadcrumComponent items={items} />
      <Grid gutter={15}>
        <Grid.Col span={12}>
          <h1>Configuracion de Encuesta</h1>
          <div className="form-wrapper">
            <QuizEditForm
              form={form}
              canEdit={canEdit}
              quiz={quiz}
              showDelete={questions.length === 0}
              legend="Datos de la Encuesta"
              onSubmit={onSubmit}
              onDelete={onDelete}
              onPublish={onPublish}
              importCampaign={importCampaign}
            />
            {quiz.status === QuizStatus[QuizStatus.published] && (
              <Flex gap={"1rem"}>
                <ShowDialog
                  children={ShareDialogBody({
                    sharedUrl,
                    text: "Se ha copiado la direccion de la invitacion",
                  })}
                  onClose={() => setSharedUrl("")}
                  onOpen={shareQuiz}
                />
                <Button
                  size="md"
                  variant="outline"
                  className="export-survey-btn"
                  onClick={importCampaign}
                >
                  <LuDownload className="icon" />
                  Exportar Encuesta
                </Button>
              </Flex>
            )}
          </div>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={12}>
          <h1>Preguntas</h1>
          <QuestionTable
            rows={questions}
            canEdit={quiz.status === QuizStatus[QuizStatus.draft]}
          />
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col>
          <LocationsTable locations={locations} />
        </Grid.Col>
      </Grid>
    </React.Fragment>
  );
}
