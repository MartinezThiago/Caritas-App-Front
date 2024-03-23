import AnswerPost from "./answer-post";
import QuestionPost from "./question-post";

export default function FullComment(props: any) {
    return (
        <div className="ms-7 mb-5 ">
            <QuestionPost
                question={props.question}
                question_date={props.question_date}
                question_user_info={props.question_user_info}
            />
            <AnswerPost
                answer={props.answer}
                answer_date={props.answer_date}
            />
        </div>
    )
}
