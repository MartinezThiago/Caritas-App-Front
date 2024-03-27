export default function QuestionPost({
    question,
    questionUserInfo,
    questionDate
}: {
    question: string
    questionUserInfo: string
    questionDate: string
}) {
    return (
        <>
            <div className="flex justify-between mb-[-7px] font-medium  text-gray-600 border-b-[1px] border-gray-600">
                <p className="text-sm">{questionUserInfo}</p>
                <p><span className="text-xs ">{questionDate}</span></p>
            </div>
            <p><span className="font-semibold text-2xl">+</span> {question}</p>
        </>
    )
}



