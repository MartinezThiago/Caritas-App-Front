export default function AnswerPost({
    answer,
    answerDate
}: {
    answer: string,
    answerDate: string
}) {
    return (
        <p className="ms-[20px]">
            <span className="font-bold text-2xl">
                -
            </span> 
            <span className="text-zinc-600">
                {answer}
            </span> | <span className="text-xs font-medium text-gray-600">
                {answerDate}
            </span>
        </p>
    )
}
