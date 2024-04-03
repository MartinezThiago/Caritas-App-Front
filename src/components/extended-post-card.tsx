import { PostData, Comment, CommentUnadapted, img } from '@/types'
import FullComment from './full-comment'
import Input from './input'
import { useForm } from 'react-hook-form'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import postImagePreview from 'public/post-image-preview.jpg'
import { ButtonEnum } from './types'
import { useRouter } from 'next/router'
import axios from 'axios'
import { FRONT_BASE_URL } from '@/constants'

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
  const fechaActual = new Date();
  // Obtener año, mes y día por separado
  const year = fechaActual.getFullYear();
  const month = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Sumamos 1 porque los meses van de 0 a 11
  const day = String(fechaActual.getDate()).padStart(2, '0');
  // Formatear la fecha como "yyyy/MM/DD"
  return `${year}-${month}-${day}`;

}

export default function ExtendedPostCard(props: PostData) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const router = useRouter();

  const _handleSubmit = async (formData: FormData) => {
    const pregunta: questionBody =
    {
      "usuario_owner_pregunta": props.user.userId,
      "contenido_pregunta": formData.question,
      "fecha_publicacion_pregunta": getActualDate(),
      "idPublicacion": props.idPost
    }
    await axios
      .post(`${FRONT_BASE_URL}question/post`, pregunta)
      .then(() => router.push(`/posts/${router.query.id}`))
      .catch((error: { response: { data: { message: string } } }) => {
        console.log(error);
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
    return comment;
  }

  if (props.images.length > 0) {
    const images = props.images.map((e: any) => ({
      original: e.base64_imagen,
      thumbnail: e.base64_imagen,
    }))
  } else {
    const images = [
      {
        original: postImagePreview.src,
        thumbnail: postImagePreview.src,
      },
      {
        original: postImagePreview.src,
        thumbnail: postImagePreview.src,
      },
      {
        original: postImagePreview.src,
        thumbnail: postImagePreview.src,
      },
    ];
  }
  {/*CAMBIO MOMENTANEO HASTA PODER CARGAR PUBLICACIONES, CONTEMPLA QUE SI EL POST NO TIENE IMAGENES PONE UNAS POR DEFECTO*/ }
  const Images = () => {
    if (props.images.length > 0) {
      return props.images.map((e: any) => ({
        original: e.base64_imagen,
        thumbnail: e.base64_imagen,
      }))
    } else {
      return [
        {
          original: postImagePreview.src,
          thumbnail: postImagePreview.src,
        },
        {
          original: postImagePreview.src,
          thumbnail: postImagePreview.src,
        },
        {
          original: postImagePreview.src,
          thumbnail: postImagePreview.src,
        },
      ];
    }
  }

  return (
    <div>
      <div className='w-screen h-50vh flex justify-center mt-10 font-sans'>
        <div className='w-[500px]'>
          <ImageGallery
            items={Images()}
            showPlayButton={false}
            showFullscreenButton={false}
            showIndex={true}
          />
        </div>
        <div className='ms-16 text-black w-[29vw] flex flex-col justify-between h-[405px]'>
          <div>
            <div className='flex justify-between w-[80%]'>
              <h1 className='font-bold'>{props.title}</h1>
              <span className='font-bold text-sm text-gray-600'>{props.postDate}</span>
            </div>
            <div className='ms-5 mt-1'>
              <div className='h-20'>
                <p className='font-bold'>Descripcion</p>
                <p className='ms-3.5 mt-1.5'>{props.description}</p>
              </div>
              <div className='w-[60%]'>
                <div className='flex justify-between '>
                  <div className='font-bold '>
                    <p>Estado: </p>
                    <p className='my-5'>Categoría: </p>
                    <p className='my-5'>Ubicacion: </p>
                  </div>
                  <div>
                    <p>{props.nameStateProduct}</p>
                    <p className='my-5'>{props.nameProductCategorie}</p>
                    <p className='my-5'>{props.locationTrade}</p>
                  </div>
                </div>
                <p className='font-bold'>Centros elegidos para el intercambio:</p>
                <div className='ms-3.5 mt-1.5'>
                  <p className='my-1.5 text-sm'><span className='font-bold text-rose-700 text-base'>Centro nro°{`${props.centersChoosed}:`}</span> 50 y 120 n°25</p>
                  <p className='my-1.5 text-sm'><span className='font-bold text-rose-700 text-base'>Centro nro°{`${props.centersChoosed}:`}</span> 1 y 57 n°23</p>
                </div>
                <div className='flex justify-between w-[86%] mt-5'>
                  <p className='font-bold'>Creador: </p>
                  <p className=''>{props.nameUser} {props.surnameUser}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='text-white ms-5'>
            {
              (props.user.role === 'usuario_basico' || (props.user.role === 'non-registered')) ?
                <>
                  {
                    props.user.role === 'usuario_basico' ?
                      <>
                        {
                          (props.user.userId != props.idOwnerUser) ?
                            <>
                            {/* ACTIVE SESSION SECTION */}
                              <button
                                key='Trade'
                                className='rounded-lg py-2.5 px-14 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200'
                                type={ButtonEnum.BUTTON}
                                onClick={(() => {
                                  console.log('USUARIO BASICO: BOTON INTERCAMBIAR FUNCIONA')
                                })}
                              >
                                Intercambiar
                              </button>
                              <button
                                key='Save'
                                className='rounded-lg ms-12 py-2.5 px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
                                type={ButtonEnum.BUTTON}
                                onClick={(() => {
                                  console.log('USUARIO BASICO: BOTON GUARDAR FUNCIONA')
                                })}
                              >
                                A
                              </button>
                            </> :
                            <>
                              <button
                                key='Trade'
                                className='rounded-lg py-2.5 px-14 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200'
                                type={ButtonEnum.BUTTON}
                                onClick={(() => {
                                  alert('No podes intercambiarte a ti mismo')
                                })}
                              >
                                Intercambiar
                              </button>
                              <button
                                key='Save'
                                className='rounded-lg ms-12 py-2.5 px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
                                type={ButtonEnum.BUTTON}
                                onClick={(() => {
                                  alert('No podes guardar tus propias publicaciones')
                                })}
                              >
                                A
                              </button>

                            </>

                        }
                      </> : <>
                        {/* NO ACTIVE SESSION SECTION */}
                        <button
                          key='Trade'
                          className='rounded-lg py-2.5 px-14 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200'
                          type={ButtonEnum.BUTTON}
                          onClick={(() => {
                            router.push('/sign/in')
                          })}
                        >
                          Intercambiar
                        </button>
                        <button
                          key='Save'
                          className='rounded-lg ms-12 py-2.5 px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
                          type={ButtonEnum.BUTTON}
                          onClick={(() => {
                            router.push('/sign/in')
                          })}
                        >
                          A
                        </button></>
                  }
                </> :
                <>
                  {/* ADMIN SECTION */}
                  <button
                    key='Trade'
                    className='rounded-lg py-2.5 px-14 font-semibold bg-gray-500 hover:bg-gray-600 hover:cursor-not-allowed'
                  >
                    Intercambiar
                  </button>
                  <button
                    key='Save'
                    className='rounded-lg ms-12 py-2.5 px-4 font-semibold bg-gray-500 hover:bg-gray-600 hover:cursor-not-allowed'
                  >
                    A
                  </button>
                </>
            }
          </div>

        </div>
      </div>
      <div className='w-[60%] m-auto text-black mt-8'>
        <article>
          {
            (props.user.role === 'usuario_basico') && (props.user.userId != props.idOwnerUser) ?
              <form
                noValidate
                onSubmit={handleSubmit(_handleSubmit)}
              >
                <p className='font-bold text-sm'>Preguntale al vendedor</p>
                <div className='flex'>
                  <div className='w-[60%]'>
                    <Input
                      id='question'
                      register={register}
                      type='text'
                      key='question'
                      registerOptions={{ required: 'Escriba una pregunta' }}
                      error={errors.question}
                      placeholder='Escriba aquí su pregunta'
                      className={{
                        'input': 'rounded-md border-blue-900 border-2 w-full'
                      }}
                    />
                  </div>
                  <button
                    key='ask'
                    className='rounded-lg w-32 h-10 text-white ms-12 py-2.5 px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
                  >
                    Preguntar
                  </button>
                </div>
              </form> : null
          }

        </article>
        <p className='font-bold text-xl'>Ultimas preguntas:</p>
        {Comments()}
      </div>
    </div>
  )
}