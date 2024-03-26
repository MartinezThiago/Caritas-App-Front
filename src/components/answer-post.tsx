export default function AnswerPost({
    answer,
    answerDate,
    idAnswer
}: {
    answer: string,
    answerDate: string,
    idAnswer:number
}) {
    return (
        <p className="ms-[20px]">
            <span className="font-semibold text-2xl">
                -
            </span>
            <span className="text-zinc-600">
                {` ${answer}`}
            </span> | <span className="text-xs font-medium text-gray-600">
                {answerDate}
            </span>
        </p>
    )
}
