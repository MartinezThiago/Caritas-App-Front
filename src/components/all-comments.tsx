import FullComment from "./full-comment";

export default function AllComments(props: any) {

    
    const comment = props.comments.comentarios.map((e: any) => {
        return (<FullComment
            key={e.id_pregunta}
            question={e.pregunta}
            questionDate={e.fechaPregunta}
            questionUserInfo={`${e.nombre_pregunta} ${e.apellido_pregunta}`}
            answer={e.respuesta}
            answerDate={e.fechaRespuesta}
            idAnswer={e.id_respuesta}
            idOwnerQuestion={e.user_id_pregunta}
            idOwnerAnswer={e.user_id_respuesta}
            idQuestion={e.id_pregunta}
            idPost={props.idPost}
            idOwnerPost={props.idOwnerUser}
            idCurrentUser={`${props.user.userId}`}
            roleCurrentUser={`${props.user.role}`}
        />
        )
    })
    return (
        <>{comment}
        </>
    )
}
