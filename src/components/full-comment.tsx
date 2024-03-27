import { useForm } from "react-hook-form";
import AnswerPost from "./answer-post";
import QuestionPost from "./question-post";
import Input from "./input";
import { useRouter } from "next/router";
import axios from "axios";
import { FRONT_BASE_URL } from "@/constants";

function getActualDate() {
    const fechaActual = new Date();
    // Obtener año, mes y día por separado
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Sumamos 1 porque los meses van de 0 a 11
    const day = String(fechaActual.getDate()).padStart(2, '0');
    // Formatear la fecha como "yyyy/MM/DD"
    return `${year}-${month}-${day}`;

}
interface answerBody {
    usuario_owner_respuesta: number
    contenido_respuesta: string
    fecha_publicacion_respuesta: string
    id_pregunta: number
}
interface FormData {
    answer: string
}
export default function FullComment({
    answer,
    answerDate,
    question,
    questionDate,
    questionUserInfo,
    idOwnerPost,
    idCurrentUser,
    id_pregunta,
    idAnswer
}: {
    answer?: string,
    answerDate?: string
    idAnswer?: number
    question: string
    questionDate: string
    questionUserInfo: string
    idOwnerPost: number
    idCurrentUser: string
    idPost: number
    id_pregunta: number
}) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>()
    const currentUser = parseInt(idCurrentUser)
    const router = useRouter();
    const _handleSubmit = async (formData: FormData) => {
        const respuesta: answerBody = {
            "usuario_owner_respuesta": currentUser,
            "contenido_respuesta": formData.answer,
            "fecha_publicacion_respuesta": getActualDate(),
            "id_pregunta": id_pregunta
        }
        await axios
            .post(`${FRONT_BASE_URL}answer/post`, respuesta)
            .then(() => router.push(`/posts/${router.query.id}`))
            .catch((error: { response: { data: { message: string } } }) => {
                console.log(error);
                if (error) {
                    alert(error.response.data.message)

                }
            })
    }
    return (
        <div className="ms-7 mb-5 ">
            <QuestionPost
                question={question}
                questionDate={questionDate}
                questionUserInfo={questionUserInfo}
            />
            {(answer && answerDate) ? <AnswerPost
                answer={answer}
                answerDate={answerDate}
                idAnswer={idAnswer ? idAnswer : -1}
            /> : (idOwnerPost === currentUser) ? <form
                noValidate
                onSubmit={handleSubmit(_handleSubmit)}
                className="ms-[20px] h-[30px]"
            >
                <div className='flex'>
                    <div className='w-[60%]'>
                        <Input
                            id={`answer`}
                            register={register}
                            type='text'
                            key={`answer`}
                            error={errors.answer}
                            registerOptions={{ required: 'Responder' }}
                            placeholder='Escriba aquí su respuesta'
                            className={{
                                'input': 'rounded-md border-blue-900 border-2 w-[100%] h-[30px]'
                            }}
                        />
                    </div>
                    <button
                        key={`ask${id_pregunta}`}
                        className='rounded-lg w-[100px] h-[30px] text-white ms-[10px]  outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
                    >
                        Responder
                    </button>
                </div>
            </form> : null

            }

        </div>
    )
}
