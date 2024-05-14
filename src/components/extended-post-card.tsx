import { PostData, Comment, CommentUnadapted, img, days } from "@/types";
import FullComment from "./full-comment";
import Input from "./inputs/input";
import { useForm } from "react-hook-form";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ButtonEnum } from "./types";
import router, { useRouter } from "next/router";
import axios from "axios";
import { FRONT_BASE_URL } from "@/constants";
import TradeOfferFull from "./trade-offer-full";
import Image from "next/image";
import CenterDescription from "./center-description";
import { useEffect, useState } from "react";
import AllComments from "./all-comments";
import { Loading } from "./loading";

interface FormData {
  question: string;
}

interface questionBody {
  usuario_owner_pregunta: number;
  contenido_pregunta: string;
  fecha_publicacion_pregunta: string;
  idPublicacion: number;
}

function getActualDate() {
  const fechaActual = new Date();
  // Obtener año, mes y día por separado
  const year = fechaActual.getFullYear();
  const month = String(fechaActual.getMonth() + 1).padStart(2, "0"); // Sumamos 1 porque los meses van de 0 a 11
  const day = String(fechaActual.getDate()).padStart(2, "0");
  // Formatear la fecha como "yyyy/MM/DD"
  return `${year}-${month}-${day}`;
}

export default function ExtendedPostCard(props: PostData) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();
  const [lastComments, setLastComments] = useState<[]>();
  const [commentsUpdate, setCommentsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false); // Cambia isLoading a false después de 2 segundos
    }, 200);
  }, []);

  const _handleSubmit = async (formData: FormData) => {
    const pregunta: questionBody = {
      usuario_owner_pregunta: props.user.userId,
      contenido_pregunta: formData.question,
      fecha_publicacion_pregunta: getActualDate(),
      idPublicacion: props.idPost,
    };
    await axios
      .post(`${FRONT_BASE_URL}question/post`, pregunta)
      .then(async () => {
        const { data: comm } = await axios.post<[]>(
          `${FRONT_BASE_URL}comments/get`,
          { id: router.query.id }
        );
        setLastComments(comm);
        setCommentsUpdate(true);
        alert("Pregunta enviada correctamente");
        console.log(comm);
      })
      .catch((error: { response: { data: { message: string } } }) => {
        console.log(error);
        if (error) {
          alert(error.response.data.message);
        }
      });
  };
  const Comments = () => {
    const comment = props.comments!.map((e: CommentUnadapted) => {
      return (
        <FullComment
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
      );
    });
    return comment;
  };

  const Images = () => {
    return props.images.map((e: any) => ({
      original: e.base64_imagen,
      thumbnail: e.base64_imagen,
    }));
  };

  const Centers = () => {
    const center = props.centersChoosed.map((e) => {
      return (
        <CenterDescription
          key={e.id_centro}
          idCenter={e.id_centro}
          name={e.nombre_centro}
          location={e.ubicacion}
          address={e.direccion}
          openingTime={e.horario_apertura}
          closingTime={e.horario_cierre}
          // workDays={['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']}
          workDays={e.dias}
        />
      );
    });
    return center;
  };
  return isLoading ? (
    <div className="flex mt-[50px]">
      <div className="m-auto">
        <Loading />
      </div>
    </div>
  ) : (
    <div className="">
      <div className="w-[70%] h-[68vh] flex justify-around m-auto mt-10 font-sans">
        <div className="w-[350px] flex items-center">
          <ImageGallery
            items={Images()}
            showPlayButton={false}
            showFullscreenButton={false}
            showIndex={true}
            showThumbnails={false}//Elimina las miniaturas
          />
        </div>
        {/*DIV DE SEPARACION*/}
        <div className="bg-rose-700 w-[0.5px] h-[100%] mx-[30px]"></div>
        <div className="text-black flex flex-col justify-between w-[35%]">
          <div>
            <h1 className="font-bold">{props.title}</h1>
            <div className="ms-5 mt-1">
              <div className="h-20">
                <p className="font-bold">Descripcion</p>
                <p className="ms-3.5 mt-1.5">{props.description}</p>
              </div>
              <div className="w-[100%]">
                <div className="flex justify-between ">
                  <div className="font-bold ">
                    <p>Estado: </p>
                    <p className="my-5">Categoría: </p>
                    <p className="my-5">Ubicacion: </p>
                    <p className="my-5">Fecha: </p>
                  </div>
                  <div>
                    <p>{props.nameStateProduct}</p>
                    <p className="my-5">{props.nameProductCategorie}</p>
                    <p className="my-5">{props.locationTrade}</p>
                    <p className="my-5 text-sm">{props.postDate}</p>
                  </div>
                </div>

                <div className="flex mt-5">
                  <div className="flex items-center mb-[20px] w-full">
                    <p className="font-bold">Creador: </p>
                    <div className="flex items-center ms-[20px]">
                      <Image
                        alt={`ownerPostProfilePic`}
                        className={"w-[38px] rounded-full"}
                        width={0}
                        height={0}
                        src={props.profilePicOwner}
                      />
                      <p className="ms-[5px]">
                        {props.nameUser} {props.surnameUser}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white">
            {props.user.role === "usuario_basico" ||
            props.user.role === "non-registered" ? (
              <>
                {props.user.role === "usuario_basico" ? (
                  <>
                    {props.user.userId != props.idOwnerUser ? (
                      <>
                        {/* ACTIVE SESSION SECTION */}
                        {/*<button
                          key="Trade"
                          className="rounded-lg py-2.5 px-14 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 w-[100%]"
                          type={ButtonEnum.BUTTON}
                          onClick={() => {
                            console.log(
                              "USUARIO BASICO: BOTON INTERCAMBIAR FUNCIONA"
                            );
                          }}
                        >
                          Intercambiar
                        </button>
                         <button
                          key="Save"
                          className="rounded-lg ms-12 py-2.5 px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200 "
                          type={ButtonEnum.BUTTON}
                          onClick={() => {
                            console.log(
                              "USUARIO BASICO: BOTON GUARDAR FUNCIONA"
                            );
                          }}
                        >
                          A
                        </button> */}
                      </>
                    ) : (
                      <>
                        {/*<button
                          key="Trade"
                          className="rounded-lg py-2.5 px-14 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 w-[100%]"
                          type={ButtonEnum.BUTTON}
                          onClick={() => {
                            alert("No podes intercambiarte a ti mismo");
                          }}
                        >
                          Intercambiar
                        </button>
                         <button
                          key="Save"
                          className="rounded-lg ms-12 py-2.5 px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200"
                          type={ButtonEnum.BUTTON}
                          onClick={() => {
                            alert("No podes guardar tus propias publicaciones");
                          }}
                        >
                          A
                        </button> */}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {/* NO ACTIVE SESSION SECTION */}
                    {/*<button
                      key="Trade"
                      className="rounded-lg py-2.5 px-14 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 w-[100%]"
                      type={ButtonEnum.BUTTON}
                      onClick={() => {
                        router.push("/sign/in");
                      }}
                    >
                      Intercambiar
                    </button>
                     <button
                      key="Save"
                      className="rounded-lg ms-12 py-2.5 px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200"
                      type={ButtonEnum.BUTTON}
                      onClick={() => {
                        router.push("/sign/in");
                      }}
                    >
                      A
                    </button> */}
                  </>
                )}
              </>
            ) : (
              <>
                {/* ADMIN SECTION */}
                {/*<button
                  key="Trade"
                  className="rounded-lg py-2.5 px-14 font-semibold bg-gray-500 hover:bg-gray-600 hover:cursor-not-allowed w-[100%]"
                >
                  Intercambiar
                </button>
                 <button
                  key="Save"
                  className="rounded-lg ms-12 py-2.5 px-4 font-semibold bg-gray-500 hover:bg-gray-600 hover:cursor-not-allowed"
                >
                  A
                </button> */}
              </>
            )}
          </div>
        </div>
        {/*DIV DE SEPARACION*/}
        <div className="bg-rose-700 w-[0.5px] h-[100%] mx-[30px]"></div>
        <div className="text-black">
          <p className="font-bold text-lg">
            Centros elegidos para el intercambio:
          </p>
          <div className="ms-3.5 mt-1.5">{Centers()}</div>
        </div>
      </div>
      <div className="w-[60%] m-auto text-black mt-8">
        <article>
          {props.user.role === "usuario_basico" &&
          props.user.userId != props.idOwnerUser ? (
            <form noValidate onSubmit={handleSubmit(_handleSubmit)}>
              <div className="flex items-center">
                <div className="w-[60%]">
                  <Input
                    id="question"
                    register={register}
                    type="text"
                    key="question"
                    registerOptions={{ required: "Escriba una pregunta" }}
                    error={errors.question}
                    placeholder="Escriba aquí su pregunta"
                    label={"Preguntale al vendedor"}
                  />
                </div>
                <button
                  key="ask"
                  className="rounded-lg w-32 h-10 text-white ms-12 py-2.5 px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200"
                >
                  Preguntar
                </button>
              </div>
            </form>
          ) : null}
        </article>
        <div>
          {props.comments!.length > 0 || commentsUpdate ? (
            <div>
              <p className="font-bold text-xl mb-[10px]">Ultimas preguntas:</p>
              {commentsUpdate ? (
                <>
                  <AllComments comments={lastComments} user={props.user} />
                </>
              ) : (
                Comments()
              )}
            </div>
          ) : (
            <div className="flex">
              <p className="text-l font-bold text-gray-500 mt-[10px] m-auto">
                NO HAY PREGUNTAS ACTUALMENTE
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
