// Components :
import UserQuizCard from "./UserQuizCard";

// Mantine :
import { Grid } from "@mantine/core";

// Models :
import { UserQuiz } from "../models/user_quiz";


export default function UserQuizCards({ rows }: { rows: UserQuiz[] }) {
    return (
        <>
            <h1>Tus Encuestas</h1>
            <Grid>
                {rows.map(r =>
                    <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }} key={r.id}>
                        <UserQuizCard uq={r} />
                    </Grid.Col>
                )}
            </Grid>
        </>
    )
}
