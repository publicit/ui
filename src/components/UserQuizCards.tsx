import {Grid} from "@mantine/core";
import {UserQuiz} from "../models/user_quiz";
import UserQuizCard from "./UserQuizCard";

export default function UserQuizCards({rows}: { rows: UserQuiz[] }) {
    return (
        <div>
            <h2>Tus Encuestas</h2>
            <Grid
            >
                {rows.map(r =>
                    <Grid.Col span={4} key={r.id}>
                        <UserQuizCard uq={r}/>
                    </Grid.Col>
                )}
            </Grid>
        </div>
    )
}
