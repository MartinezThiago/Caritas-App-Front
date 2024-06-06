import { FRONT_BASE_URL } from '@/constants'
import { CommentUnadapted, PostData } from '@/types'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import AllComments from './all-comments'
import CenterDescription from './center-description'
import FullComment from './full-comment'
import Input from './inputs/input'
import { Loading } from './loading'
import { ButtonEnum } from './types'
import Link from 'next/link'
import save from 'public/guardar.png'
import saved from 'public/guardado.png'

interface FormData {
  question: string
}

interface questionBody {
  usuario_owner_pregunta: number
  contenido_pregunta: string
  fecha_publicacion_pregunta: string
  idPublicacion: number
}

function getActualDate() {
  const fechaActual = new Date()
  // Obtener año, mes y día por separado
  const year = fechaActual.getFullYear()
  const month = String(fechaActual.getMonth() + 1).padStart(2, '0') // Sumamos 1 porque los meses van de 0 a 11
  const day = String(fechaActual.getDate()).padStart(2, '0')
  // Formatear la fecha como "yyyy/MM/DD"
  return `${year}-${month}-${day}`
}

export default function ExtendedPostCard(props: PostData) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField
  } = useForm<FormData>()
  console.log(props);

  const router = useRouter()
  const [lastComments, setLastComments] = useState<[]>()
  const [commentsUpdate, setCommentsUpdate] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [postsFavsUser, setPostFavsUser] = useState<number[]>([])
  const [savedPost, setSavedPost] = useState(true)
  const [isHovered, setIsHovered] = useState(false);
  const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false) // Cambia isLoading a false después de 2 segundos
    }, 200)
  }, [])

  useEffect(() => {

    if (props.user.role == 'usuario_basico') {
      const getIdsPostFavs = async () => {
        await axios
          .get<any[]>(`${FRONT_BASE_URL}/user/favs/getIdFavs`)
          .then((res: any) => {
            console.log(res.data);
            setPostFavsUser(res.data)
            setSavedPost(!res.data.includes(props.idPost))

          })
          .catch((err: any) => {
            setPostFavsUser([])
          })
      }
      getIdsPostFavs();
    }
  }, []);


  const _handleSubmit = async (formData: FormData) => {
    const pregunta: questionBody = {
      usuario_owner_pregunta: props.user.userId,
      contenido_pregunta: formData.question,
      fecha_publicacion_pregunta: getActualDate(),
      idPublicacion: props.idPost
    }
    await axios
      .post(`${FRONT_BASE_URL}question/post`, pregunta)
      .then(async () => {
        const { data: comm } = await axios.post<[]>(
          `${FRONT_BASE_URL}comments/get`,
          { id: router.query.id }
        )
        setLastComments(comm)
        setCommentsUpdate(true)
        alert('Pregunta enviada correctamente')
        resetField('question')
      })
      .catch((error: { response: { data: { message: string } } }) => {
        console.log(error)
        if (error) {
          alert(error.response.data.message)
        }
      })
  }
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
      )
    })
    return comment
  }

  const Images = () => {
    return props.images.map((e: any) => ({
      original: e.base64_imagen,
      thumbnail: e.base64_imagen
    }))
  }

  const _handleSubmitSave = async (action: boolean) => {
    const formData = {
      action: action,
      id_publicacion: props.idPost
    }
    console.log(formData)
    await axios
      .post(`${FRONT_BASE_URL}user/favs/postFav`, formData)
      .then(async () => {
        router.push(`/`)
        router.push(`/posts/${props.idPost}`)
      })
      .catch((error: { response: { data: { message: string } } }) => {
        console.log(error)
      })
  }
  const _handleSubmitUnSave = async (action: boolean) => {
    const formData = {
      action: action,
      id_publicacion: props.idPost
    }
    console.log(formData)
    await axios
      .post(`${FRONT_BASE_URL}user/favs/postFav`, formData)
      .then(async () => {
        router.push(`/`)
        router.push(`/posts/${props.idPost}`)
      })
  }

  const _handleDeletePost = async () => {
    if (props.postState == 2) {
      alert('Cancela la oferta pendiente de este producto antes de eliminar la publicacion')
      return
    }
    if (props.postState == 4) {
      alert('Cancela el intercambio pendiente de este producto antes de eliminar la publicacion')
      return
    }
    const formData = {
      id_publicacion: props.idPost
    }
    console.log(formData)
    await axios
      .post(`${FRONT_BASE_URL}post/delete`, formData)
      .then(async () => {
        await router.push(`/`)
        alert('Publicacion eliminada correctamente')
      })
      .catch((error: { response: { data: { message: string } } }) => {
        console.log(error)
      })
  }



  const Centers = () => {
    const center = props.centersChoosed.map((e, index) => {
      return (
        <CenterDescription
          key={e.id_centro}
          idCenter={e.id_centro}
          name={e.nombre_centro}
          location={e.ubicacion}
          address={e.direccion}
          openingTime={props.centersChoosedInfoTrade[index].desde}
          closingTime={props.centersChoosedInfoTrade[index].hasta}
          onPost={true}
          daysPostTrade={props.centersChoosedInfoTrade[index].diasDeIntercambio}
        />
      )
    })
    return center
  }
  return isLoading ? (
    <div className='flex mt-[50px]'>
      <div className='m-auto'>
        <Loading />
      </div>
    </div>
  ) : (
    <div className=''>
      <div className='w-[70%] h-[68vh] flex justify-around m-auto mt-10 font-sans'>
        <div className='w-[350px] flex items-center'>
          <ImageGallery
            items={Images()}
            showPlayButton={false}
            showFullscreenButton={false}
            showIndex={true}
            showThumbnails={false} //Elimina las miniaturas
          />
        </div>
        {/*DIV DE SEPARACION*/}
        <div className='bg-rose-700 w-[0.5px] h-[100%] mx-[30px]'></div>
        <div className='text-black flex flex-col justify-between w-[35%]'>
          <div>
            <h1 className='font-bold'>{props.title}</h1>

            <div className='ms-5 mt-1 flex flex-col justify-between h-[100%]'>
              <div className='h-20'>
                <p className='font-bold'>Descripcion</p>
                <p className='ms-3.5 mt-1.5'>{props.description}</p>
              </div>
              <div className='w-[100%]'>
                <div className='flex justify-between '>
                  <div className='font-bold '>
                    <p>Estado: </p>
                    <p className='my-5'>Categoría: </p>
                    <p className='my-5'>Ubicacion: </p>
                    <p className='my-5'>Fecha: </p>
                  </div>
                  <div>
                    <p>{props.nameStateProduct}</p>
                    <p className='my-5'>{props.nameProductCategorie}</p>
                    <p className='my-5'>{props.locationTrade}</p>
                    <p className='my-5 text-sm'>{props.postDate}</p>
                  </div>
                </div>

                <div className='flex mt-5'>
                  <div className='flex items-center mb-[20px] w-full'>
                    <p className='font-bold'>Creador: </p>
                    <div className='flex items-center ms-[20px]'>
                      <Image
                        alt={`ownerPostProfilePic`}
                        className={'w-[38px] rounded-full'}
                        width={0}
                        height={0}
                        src={props.profilePicOwner}
                      />
                      <p className='ms-[5px]'>
                        {props.nameUser} {props.surnameUser}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mt-[50px] w-[100%]'>
                  {props.user.userId == props.idOwnerUser ? deleteBtnStatus == false ?
                    <div className='w-[100%] flex justify-center'>
                      <button
                        key='delete-post'
                        className='text-white font-semibold w-[90%] border-[3px] border-rose-700 bg-rose-700 hover:bg-white  hover:text-rose-700 duration-200'
                        onClick={() => {
                          setDeleteBtnStatus(true)
                        }}
                      >
                        <p className="  mx-[10px] my-[10px] ">Eliminar publicacion</p>
                      </button>
                    </div> :
                    <div className='flex w-[100%]'>
                      <button
                        key='delete-post'
                        className='text-white mx-[30px] font-semibold w-[50%] border-[3px] border-rose-700 bg-rose-700 hover:bg-white  hover:text-rose-700  duration-200'
                        onClick={() => {
                          _handleDeletePost()
                        }}
                      >
                        <p className="px-[10px] py-[10px]">Confirmar</p>
                      </button>
                      <button
                        key='delete-post'
                        className='hover:text-white font-semibold w-[50%] border-[3px] border-rose-700 hover:bg-rose-700 bg-white  text-rose-700 duration-200'

                        onClick={() => {
                          setDeleteBtnStatus(false)
                        }}
                      >
                        <p className="  px-[10px] py-[10px] ">Cancelar</p>
                      </button>
                    </div> : <></>}
                  {/* {props.user.userId == props.idOwnerUser ? <button
                    key='delete-post'
                    className='text-white font-semibold w-[80%] outline outline-transparent bg-rose-700 hover:bg-white  hover:text-rose-700 hover:outline-rose-700 hover:-outline-offset-1 duration-200'

                    onClick={() => {
                      _handleDeletePost()
                    }}
                  >
                    <p className="  mx-[10px] my-[10px] ">Eliminar publicacion</p>
                  </button> : <></>} */}
                </div>
              </div>
            </div>
          </div>
          <div className='text-white'>
            {props.user.role === 'usuario_basico' ||
              props.user.role === 'non-registered' ? (
              <>
                {props.user.role === 'usuario_basico' ? (
                  <>
                    {props.user.userId != props.idOwnerUser ? (
                      <div className='flex'>
                        {/* ACTIVE SESSION SECTION */}
                        <button
                          key='Trade'
                          className='rounded-lg w-[100%] outline outline-transparent bg-rose-700 font-semibold hover:bg-white  hover:text-rose-700 hover:outline-rose-700 hover:-outline-offset-1 duration-200 rounded-s-[10px]'
                          type={ButtonEnum.BUTTON}
                          onClick={() => {
                            console.log(
                              'USUARIO BASICO: BOTON INTERCAMBIAR FUNCIONA'
                            )
                          }}
                        >
                          <Link
                            href={`/posts/${router.query.id}/trade`}
                            className='size-full py-2.5 px-14'
                          >
                            Ofertar objeto
                          </Link>
                        </button>
                        {/* ESTA AFIRMACION SE TIENE QUE HACER SI LA PUBLICACION ESTA EN EL ARRAY DE GUARDADOS DEL USUARIO */}
                        {savedPost ? (
                          <button
                            key='Save'
                            className='rounded-lg ms-2 py-2.5 px-2.5 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200 rounded-e-[10px]'
                            type={ButtonEnum.BUTTON}
                            onClick={() => {
                              _handleSubmitSave(true)
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            <Image alt='' src={isHovered ? saved : save} width={30} />
                          </button>
                        ) : (
                          <button
                            key='Saved'
                            className='rounded-lg ms-2 py-2.5 px-2.5 outline -outline-offset-2 outline-[3px] outline-rose-700 bg-white text-rose-700 font-semibold hover:bg-rose-700 hover:text-white hover:outline-white hover:-outline-offset-0 duration-200 rounded-e-[10px]'
                            type={ButtonEnum.BUTTON}
                            onClick={() => {
                              _handleSubmitUnSave(false)
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          >
                            <Image alt='' src={isHovered ? save : saved} width={30} />
                          </button>
                        )}
                      </div>
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
                  <div className='flex'>
                    {/* NO ACTIVE SESSION SECTION */}
                    <button
                      key='Trade'
                      className='rounded-lg w-[100%] outline outline-transparent bg-rose-700 font-semibold hover:bg-white  hover:text-rose-700 hover:outline-rose-700 hover:-outline-offset-1 duration-200 rounded-s-[10px]'
                      type={ButtonEnum.BUTTON}
                      onClick={() => {
                        router.push('/sign/in')
                      }}
                    >
                      Ofertar objeto
                    </button>
                    <button
                      key='Save'
                      className='rounded-lg ms-2 py-2.5 px-2.5 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200 rounded-e-[10px]'
                      type={ButtonEnum.BUTTON}
                      onClick={() => {
                        router.push('/sign/in')
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <Image alt='' src={isHovered ? saved : save} width={30} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className='flex'>
                {/* ADMIN SECTION */}
                <button
                  key='Trade'
                  className='rounded-lg w-[100%]  bg-gray-500 font-semibold hover:bg-gray-600 hover:cursor-not-allowed duration-200 rounded-s-[10px]'
                  type={ButtonEnum.BUTTON}
                >
                  Ofertar objeto
                </button>
                <button
                  key='Save'
                  className='rounded-lg ms-2 py-2.5 px-2.5  bg-gray-500 font-semibold hover:bg-gray-600 hover:cursor-not-allowed duration-200 rounded-e-[10px]'
                  type={ButtonEnum.BUTTON}
                >
                  <Image alt='' src={save} width={30} />
                </button>
              </div>
            )}
          </div>
        </div>
        {/*DIV DE SEPARACION*/}
        <div className='bg-rose-700 w-[0.5px] h-[100%] mx-[30px]'></div>
        <div className='text-black'>
          <p className='font-bold text-lg'>
            Centros elegidos para el intercambio:
          </p>
          <div className='ms-3.5 mt-1.5'>{Centers()}</div>
        </div>
      </div>
      <div className='w-[60%] m-auto text-black mt-8'>
        <article>
          {props.user.role === 'usuario_basico' &&
            props.user.userId != props.idOwnerUser ? (
            <form noValidate onSubmit={handleSubmit(_handleSubmit)}>
              <div className='flex items-center'>
                <div className='w-[60%]'>
                  <Input
                    id='question'
                    register={register}
                    type='text'
                    key='question'
                    registerOptions={{ required: 'Escriba una pregunta' }}
                    error={errors.question}
                    placeholder='Escriba aquí su pregunta'
                    label={'Preguntale al vendedor'}
                  />
                </div>
                <button
                  key='ask'
                  className='rounded-lg w-32 h-10 text-white ms-12 py-2.5 px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
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
              <p className='font-bold text-xl mb-[10px]'>Ultimas preguntas:</p>
              {commentsUpdate ? (
                <>
                  <AllComments comments={lastComments} user={props.user} />
                </>
              ) : (
                Comments()
              )}
            </div>
          ) : (
            <div className='flex'>
              <p className='text-l font-bold text-gray-500 mt-[10px] m-auto'>
                NO HAY PREGUNTAS ACTUALMENTE
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
