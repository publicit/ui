import { Link } from 'react-router-dom'; // Mantine :
import { LuDownload, LuWrench } from 'react-icons/lu';
import { Button, Grid, Group, NumberInput, TextInput } from '@mantine/core'; // Models :
import { Quiz } from '../models/quiz';

type params = {
  onSubmit: any;
  onDelete?: any | undefined;
  form: any;
  legend: string;
  quiz: Quiz;
  showDelete?: boolean;
  onPublish?: any | undefined;
  importCampaign?: any | undefined;
  canEdit: boolean;
  onTestWebhookClick?: any | undefined;
};

export function QuizEditForm({
  onSubmit,
  form,
  quiz,
  onDelete,
  showDelete = false,
  onPublish,
  importCampaign,
  canEdit,
  onTestWebhookClick,
}: params) {
  return (
    <form onSubmit={form.onSubmit(async (data: any) => onSubmit(data))}>
      <Grid gutter={10}>
        {quiz.thumbnail_url && (
          <Grid.Col span={12}>
            <Link to={quiz.video_url} target="_blank">
              <img
                src={quiz.thumbnail_url}
                alt="thumbnail"
                className="form-image"
              />
            </Link>
          </Grid.Col>
        )}
        <Grid.Col span={12}>
          <TextInput
            label="Nombre"
            size="md"
            placeholder="Nombre"
            {...form.getInputProps('name')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Video URL"
            size="md"
            placeholder="URL Video"
            {...form.getInputProps('video_url')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Estatus"
            size="md"
            disabled={true}
            {...form.getInputProps('status')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label="Numero de Preguntas"
            size="md"
            placeholder="Numero de Preguntas"
            {...form.getInputProps('number_of_questions')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label="Recompensa por Encuesta"
            size="md"
            prefix={'$'}
            decimalScale={2}
            allowNegative={false}
            thousandSeparator={true}
            allowedDecimalSeparators={'.'}
            {...form.getInputProps('reward_amount')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label="Recompensa por Referido"
            size="md"
            prefix={'$'}
            decimalScale={2}
            allowNegative={false}
            thousandSeparator={true}
            allowedDecimalSeparators={'.'}
            {...form.getInputProps('referral_amount')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <NumberInput
            label="Numero Maximo de Usuarios"
            size="md"
            allowNegative={false}
            thousandSeparator={true}
            {...form.getInputProps('max_user_count')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Webhook URL"
            size="md"
            type="text"
            placeholder="Webhook URL"
            {...form.getInputProps('webhook_url')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Webhook Token"
            size="md"
            type="text"
            placeholder="Cualquier texto que identifique el webhook como autentico"
            {...form.getInputProps('webhook_token')}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Webhook Token Header Name"
            size="md"
            type="text"
            placeholder="x-webhook-token"
            {...form.getInputProps('webhook_token_header_name')}
          />
        </Grid.Col>
        <Grid.Col span={12}>
          <Group mt="md">
            {canEdit && (
              <Button type="submit" size="md" variant="outline">
                Guardar
              </Button>
            )}
            {quiz.id && canEdit && (
              <Group>
                <Link to={`/questions/new/${quiz.id}`}>
                  <Button type="button" size="md" variant="outline">
                    Agregar Pregunta
                  </Button>
                </Link>
                <Button
                  type="button"
                  size="md"
                  variant="outline"
                  onClick={() => onPublish()}
                >
                  Publicar Encuesta
                </Button>
                {showDelete && (
                  <Button
                    type="button"
                    size="md"
                    variant="outline"
                    onClick={onDelete}
                  >
                    Eliminar Encuesta
                  </Button>
                )}
                <Button
                  size="md"
                  variant="outline"
                  className="btn-with-icon"
                  onClick={importCampaign}
                >
                  <LuDownload className="icon" />
                  Exportar Encuesta
                </Button>
                <Button
                  size="md"
                  variant="outline"
                  className="btn-with-icon"
                  onClick={() => onTestWebhookClick(form.values)}
                >
                  <LuWrench className="icon" />
                  Probar Webhook
                </Button>
              </Group>
            )}
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
}
