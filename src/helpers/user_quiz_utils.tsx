import {UserQuizStatus} from "../models/user_quiz";
import {MoodBoy, MoodHappy, MoodSick} from "tabler-icons-react";

export function resolveUserQuizStatusIcon(status: string): any {
    switch (status) {
        case UserQuizStatus[UserQuizStatus.success]:
            return <MoodHappy style={{color: "green"}} />
        case UserQuizStatus[UserQuizStatus.failed]:
            return <MoodSick style={{color: "red"}} />
        case UserQuizStatus[UserQuizStatus.pending]:
            return <MoodBoy style={{color: "blue"}} />
        case UserQuizStatus[UserQuizStatus.started]:
            return <MoodBoy style={{color: "orange"}} />
        default:
            return null
    }
}

export function resolveUserQuizStatus(status: string): string {
    switch (status) {
        case UserQuizStatus[UserQuizStatus.success]:
            return "Completado"
        case UserQuizStatus[UserQuizStatus.failed]:
            return "Incorrecto"
        case UserQuizStatus[UserQuizStatus.pending]:
            return "Pendiente"
        case UserQuizStatus[UserQuizStatus.started]:
            return "En Proceso"
        default:
            return ""
    }
}