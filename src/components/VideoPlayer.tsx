import ReactPlayer from "react-player";
import { Button, Group } from "@mantine/core";

type Params = {
    userQuiz: any,
    nextStep: any
}
export default function VideoPlayer({ userQuiz, nextStep }: Params) {
    return (
        <div className="form-wrapper video-player-continer">
            <ReactPlayer
                controls
                width="100%"
                height="calc(100vh - 420px)"
                url={userQuiz.quiz.video_url}
            />
            <Group mt="xl">
                <Button variant="outline" size="md" onClick={nextStep}>Próxima</Button>
            </Group>
        </div>
    )
}