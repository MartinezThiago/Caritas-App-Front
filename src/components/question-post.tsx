export default function QuestionPost(props: any) {
    return (
        <p><span className="font-bold text-2xl">+</span> {props.question} | <span className="text-sm">{props.question_user_info}</span> | <span className="text-xs font-medium text-gray-600">{props.question_date}</span></p>
    )
}



