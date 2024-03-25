export default function QuestionPost({
    question,
    questionUserInfo,
    questionDate
}:{
    question: string
    questionUserInfo: string
    questionDate: string
}) {
    return (
        <p><span className="font-bold text-2xl">+</span> {question} | <span className="text-sm">{questionUserInfo}</span> | <span className="text-xs font-medium text-gray-600">{questionDate}</span></p>
    )
}



