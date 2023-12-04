import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "@mantine/form";
import {QuestionPost, QuizLoad} from "../helpers/api"
import {notifyErrResponse} from "../components/Errors";
import {Quiz} from "../models/quiz";
import {Question, questionValidation} from "../models/question";
import QuestionEditForm from "../components/QuestionEditForm";

export default function QuestionNew() {
    const [searchParams] = useSearchParams()
    const quizId = useParams().quiz_id || ""
    const navigate = useNavigate();
    const [question] = useState<Question>(new Question())
    const [quiz,setQuiz]=useState<Quiz>(new Quiz())
    const form = useForm<Question>({
        initialValues: question,
        validate: questionValidation(),
    })

    useEffect(() => {
        async function loadData(id: string) {
            try {
                const data = await QuizLoad(id)
                setQuiz(data)
            } catch (err) {
                await notifyErrResponse(err)
            }
        }

        loadData(quizId)

    }, []);

    async function onSubmit(data: Question) {
        try {
            data.quiz = quiz
            const res = await QuestionPost(data)
            const returnURL = `/questions/${res.id}`
            navigate(returnURL);
        } catch (err) {
            await notifyErrResponse(err)
        }
    }


    return (
        <div>
            <QuestionEditForm onSubmit={onSubmit} form={form} legend={quiz.name} quizId={quizId}
                              question={question}/>
        </div>
    )
}
