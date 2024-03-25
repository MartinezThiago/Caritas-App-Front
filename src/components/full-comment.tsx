import AnswerPost from "./answer-post";
import QuestionPost from "./question-post";

export default function FullComment({
    answer,
    answerDate,
    question,
    questionDate,
    questionUserInfo
}: {
    answer?: string,
    answerDate?: string
    question: string
    questionDate: string
    questionUserInfo: string
}) {
    return (
        <div className="ms-7 mb-5 ">
            <QuestionPost
                question={question}
                questionDate={questionDate}
                questionUserInfo={questionUserInfo}
            />
            {(answer && answerDate) && <AnswerPost
                answer={answer}
                answerDate={answerDate}
            />}
        </div>
    )
}
