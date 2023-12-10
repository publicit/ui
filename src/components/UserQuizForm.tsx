import {Button, Checkbox, CheckIcon, Progress, Radio, Text} from "@mantine/core";
import {UserQuiz} from "../models/user_quiz";
import {QuestionType} from "../models/question";
import {UserAnswer} from "../models/user_answer";
import {UserQuestion} from "../models/user_question";

type params = {
    onSubmit: any
    userQuiz: UserQuiz
    userQuestion: UserQuestion
    userAnswers: UserAnswer[]
    setSelectedAnswer: any
    selectMultiAnswer: any
    isSubmitEnabled(): boolean
}

export default function EditForm({
                                     setSelectedAnswer,
                                     selectMultiAnswer,
                                     onSubmit,
                                     userAnswers,
                                     userQuestion,
                                     userQuiz,
                                     isSubmitEnabled,
                                 }: params) {
    return (
        <>
            <Text style={{
                fontSize: "2.5em",
            }}>
                {userQuiz.quiz.name}
            </Text>
            <br/>
            <Progress value={userQuiz.percent_completed * 100}/>
            <br/>
            <Text style={{
                fontSize: "1.75em",
            }}>
                {userQuestion.question.body}
            </Text>
            <br/>
            <hr/>
            <br/>
            {userQuestion.question.type === QuestionType[QuestionType.single]
                ?
                <Radio.Group>
                    {userAnswers.map((a: UserAnswer) => (
                        <>
                            <Radio key={a.answer.id}
                                   value={a.answer.id}
                                   variant="outline"
                                   icon={CheckIcon}
                                   label={a.answer.body}
                                   onClick={e => setSelectedAnswer(e.currentTarget.value)}
                            />
                            <br/>
                        </>
                    ))}
                </Radio.Group>
                :
                <>
                    {userAnswers.map((a: UserAnswer) => (
                        <>
                            <Checkbox key={a.answer.id}
                                      variant="outline"
                                      value={a.answer.id}
                                      label={a.answer.body}
                                      onClick={e => selectMultiAnswer(e)}
                            />
                            <br/>
                        </>
                    ))}
                </>
            }
            <br/>
            <Button type="button" variant="outline"
                    onClick={() => onSubmit()}
                    disabled={!isSubmitEnabled()}
            >
                Siguiente
            </Button>
        </>
    )
}