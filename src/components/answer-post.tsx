export default function AnswerPost(props: any) {
    return (
        <p className="ms-[20px]"><span className="font-bold text-2xl">-</span> {props.answer} | <span className="text-xs font-medium text-gray-600">{props.answer_date}</span></p>
    )
}
