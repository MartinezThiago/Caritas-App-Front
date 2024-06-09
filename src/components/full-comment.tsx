import { useForm } from "react-hook-form";
import AnswerPost from "./answer-post";
import QuestionPost from "./question-post";
import Input from "./inputs/input";
import { useRouter } from "next/router";
import axios from "axios";
import { FRONT_BASE_URL } from "@/constants";
import { useState } from "react";

function getActualDate() {
    const fechaActual = new Date();
    // Obtener año, mes y día por separado
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Sumamos 1 porque los meses van de 0 a 11
    const day = String(fechaActual.getDate()).padStart(2, '0');
    // Formatear la fecha como "yyyy/MM/DD"
    return `${year}-${month}-${day}`;
}

function getFormatActualDate() {
    const fechaActual = new Date();
    // Obtener año, mes y día por separado
    const year = fechaActual.getFullYear();
    const month = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Sumamos 1 porque los meses van de 0 a 11
    const day = String(fechaActual.getDate()).padStart(2, '0');
    // Formatear la fecha como "yyyy/MM/DD"
    return `${day}/${month}/${year}`;

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
    question,
    questionDate,
    questionUserInfo,
    answer,
    answerDate,
    idAnswer,
    idOwnerQuestion,
    idOwnerAnswer,
    idQuestion,
    idOwnerPost,
    idCurrentUser,
    idPost,
    roleCurrentUser

}: {
    question: string
    questionDate: string
    questionUserInfo: string
    answer?: string
    answerDate?: string
    idAnswer?: number
    idOwnerQuestion: number
    idOwnerAnswer?: number
    idQuestion: number
    idOwnerPost: number
    idCurrentUser: string
    idPost: number
    roleCurrentUser: string
}) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormData>()
    const currentUser = parseInt(idCurrentUser)
    const router = useRouter();
    const [auxAnswer, setAuxAnswer] = useState<answerBody>();
    const [flagNewAnswer, setFlagNewAnswer] = useState(false);
    const idQuery = router.query.id
    const _handleSubmit = async (formData: FormData) => {
        const respuesta: answerBody = {
            "usuario_owner_respuesta": currentUser,
            "contenido_respuesta": formData.answer,
            "fecha_publicacion_respuesta": getActualDate(),
            "id_pregunta": idQuestion
        }
        setAuxAnswer(respuesta)
        await axios
            .post(`${FRONT_BASE_URL}answer/post`, respuesta)
            .then(async () => {
                setFlagNewAnswer(true)
                await router.push('/')
                await router.push(`/posts/${idQuery}`)
            })
            .catch((error: { response: { data: { message: string } } }) => {

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
                idOwnerQuestion={idOwnerQuestion}
                idQuestion={idQuestion}
                idCurrentUser={idCurrentUser}
                roleCurrentUser={roleCurrentUser}
                hasAnswer={(answer && answerDate && idAnswer && idOwnerAnswer) ? true : false}
            />
            {(answer && answerDate && idAnswer && idOwnerAnswer) ? <AnswerPost
                answer={answer}
                answerDate={answerDate}
                idAnswer={idAnswer}
                idOwnerAnswer={idOwnerAnswer}
                idCurrentUser={idCurrentUser}
                roleCurrentUser={roleCurrentUser}
            /> : (idOwnerPost === currentUser) ? <form
                noValidate
                onSubmit={handleSubmit(_handleSubmit)}
                className="ms-5 h-7"
            >
                <div className='flex '>
                    <div className='w-[60%] '>
                        <Input
                            id={`answer`}
                            register={register}
                            type='text'
                            key={`answer`}
                            error={errors.answer}
                            registerOptions={{ required: 'Responder' }}
                            placeholder='Escriba aquí su respuesta'
                            label=""
                        />
                    </div>
                    <button
                        key={`ask${idQuestion}`}
                        className='rounded-lg w-32 h-10 text-white ms-2.5 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                    >
                        Responder
                    </button>
                </div>
            </form> : null

            }

        </div>
    )
}
