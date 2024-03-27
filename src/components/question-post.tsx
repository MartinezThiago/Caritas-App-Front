import axios from "axios"
import { ButtonEnum } from "./types"
import { useRouter } from "next/router"
import { FRONT_BASE_URL } from "@/constants"

interface deleteQuestionBody {
    id_pregunta: number
    id_usuario_que_va_a_borrar: number
}

export default function QuestionPost({
    question,
    questionUserInfo,
    questionDate,
    idOwnerQuestion,
    idCurrentUser,
    roleCurrentUser,
    idQuestion
}: {
    question: string
    questionUserInfo: string
    questionDate: string
    idOwnerQuestion: number
    idCurrentUser: string
    roleCurrentUser: string
    idQuestion: number
}) {
    const router = useRouter();

    const DeleteQuestion = async () => {
        const questionInfo:deleteQuestionBody = {
            "id_pregunta": idQuestion,
            "id_usuario_que_va_a_borrar": parseInt(idCurrentUser)
        }

        await axios
          .post(`${FRONT_BASE_URL}question/delete`, questionInfo)
          .then(() => router.push(`/posts/${router.query.id}`))
          .catch((error: { response: { data: { message: string } } }) => {
            console.log(error);
            if (error) {
              alert(error.response.data.message)

            }
          })
    }



    return (
        <>
            <div className="flex justify-between mb-[-7px] font-medium  text-gray-600 border-b-[1px] border-gray-600">
                <p className="text-sm">{questionUserInfo}</p>
                <div className="flex items-center">
                    <p className="text-xs">{questionDate}</p>
                    {
                        ((idOwnerQuestion === parseInt(idCurrentUser)) || (roleCurrentUser === 'voluntario') || (roleCurrentUser === 'admin_centro')) ?
                            <>
                                <button
                                    key='Delete'
                                    className='rounded-lg ms-[20px] text-sm text-rose-700 font-semibold hover:font-bold duration-200'
                                    type={ButtonEnum.BUTTON}
                                    onClick={DeleteQuestion}
                                >
                                    Eliminar
                                </button>
                            </> : null
                    }

                </div>
            </div>
            <p><span className="font-semibold text-2xl">+</span> {question}</p>
        </>
    )
}



