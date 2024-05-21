import axios from "axios"
import { ButtonEnum } from "./types"
import { FRONT_BASE_URL } from "@/constants"
import router, { useRouter } from "next/router"

interface deleteAnswerBody {
    id_respuesta: number
    id_usuario_que_va_a_borrar: number
}

export default function AnswerPost({
    answer,
    answerDate,
    idAnswer,
    idOwnerAnswer,
    idCurrentUser,
    roleCurrentUser
}: {
    answer: string,
    answerDate: string,
    idAnswer: number,
    idOwnerAnswer: number,
    idCurrentUser: string
    roleCurrentUser: string
}) {
    const router = useRouter();
    const idQuery = router.query.id
    const DeleteAnswer = async () => {
        const answerInfo: deleteAnswerBody = {
            "id_respuesta": idAnswer,
            "id_usuario_que_va_a_borrar": parseInt(idCurrentUser)
        }
        await axios
            .post(`${FRONT_BASE_URL}answer/delete`, answerInfo)
            .then(async () => {
                await router.push('/')
                await router.push(`/posts/${idQuery}`)
            })
            .catch((error: { response: { data: { message: string } } }) => {
                console.log(error);
                if (error) {
                    alert(error.response.data.message)

                }
            })
    }

    return (
        <div className="flex justify-between items-center w-[100%]">
            <p className="ms-5 "><span className="font-semibold text-2xl">-</span><span className="text-gray-600">{` ${answer}`}</span></p>
            <div>
                <span className="text-xs font-medium text-gray-600">
                    {answerDate}
                </span>
                {
                    ((idOwnerAnswer === parseInt(idCurrentUser)) || (roleCurrentUser === 'voluntario') || (roleCurrentUser === 'admin_centro')) ? <>
                        <button
                            key='Delete'
                            className='rounded-lg ms-5 text-sm text-rose-700 font-semibold hover:font-bold duration-200'
                            type={ButtonEnum.BUTTON}
                            onClick={DeleteAnswer}
                        >
                            Eliminar
                        </button>
                    </> : null
                }


            </div>
        </div>
    )
}
