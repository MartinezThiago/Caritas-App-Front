import { PostData, Comment, questionBody } from '@/types'
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
      "idPublicacion": props.id
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
    const comment = props.comentarios!.map((e: Comment) => {
      return (
        <FullComment
          key={e.id_pregunta}
          question={e.pregunta}
          questionDate={e.fechaPregunta}
          questionUserInfo={`${e.nombre_pregunta} ${e.apellido_pregunta}`}
          answer={e.respuesta}
          answerDate={e.fechaRespuesta}
          idOwnerPost={props.id_usuario}
          idCurrentUser={`${props.user.userId}`}
          idPost={props.id}
          id_pregunta={e.id_pregunta}
        />
      )
    })
    return comment;
  }

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
  return (
    <div>
      <div className='w-100vw h-50vh flex justify-center w-[100vw] mt-[40px] font-sans'>
        <div className='w-[700px]'>
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            showIndex={true}
          />
        </div>
        <div className='ms-[60px] text-black w-[29vw] flex flex-col justify-between h-[405px]'>
          <div className=''>
            <div className='flex justify-between w-[80%]'>
              <h1 className='font-bold'>{props.titulo}</h1>
              <span className='font-bold text-sm text-gray-600'>{props.fecha_publicacion}</span>
            </div>
            <div className='ms-[20px] mt-[4px]'>
              <div className='h-[80px]'>
                <p className='font-bold'>Descripcion</p>
                <p className='ms-[15px] mt-[5px]'>{props.descripcion}</p>
              </div>
              <div className='w-[60%]'>
                <div className='flex justify-between '>
                  <div className='font-bold '>
                    <p className=''>Estado: </p>
                    <p className='my-[20px]'>Categoría: </p>
                    <p className='my-[20px]'>Ubicacion: </p>
                  </div>
                  <div className=''>
                    <p className=''>{props.nombre_estado_producto}</p>
                    <p className='my-[20px]'>{props.nombre_categoria_producto}</p>
                    <p className='my-[20px]'>{props.ubicacion_trade}</p>
                  </div>
                </div>
                <p className='font-bold'>Centros elegidos para el intercambio:</p>
                <div className='ms-[15px] mt-[5px]'>
                  <p className='my-[5px] text-sm'><span className='font-bold text-rose-700 text-base'>Centro nro°{`${props.centros_elegidos}:`}</span> 50 y 120 n°25</p>
                  <p className='my-[5px] text-sm'><span className='font-bold text-rose-700 text-base'>Centro nro°{`${props.centros_elegidos}:`}</span> 1 y 57 n°23</p>
                </div>
                <div className='flex justify-between w-[86%] mt-[20px]'>
                  <p className='font-bold'>Creador: </p>
                  <p className=''>{props.nombre_usuario} {props.apellido_usuario}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='text-white ms-[20px]'>
            {
              (props.user.Rol === 'usuario_basico' || (props.user.Rol === 'non-registered')) ?
                <>
                  {
                    props.user.Rol === 'usuario_basico' ?
                      <>
                        {
                          (props.user.userId != props.id_usuario) ?
                            <>
                              <button
                                key='Trade'
                                className='rounded-lg py-[10px] px-14 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200'
                                type={ButtonEnum.BUTTON}
                                onClick={(() => {
                                  console.log('USUARIO BASICO: BOTON INTERCAMBIAR FUNCIONA')
                                })}
                              >
                                Intercambiar
                              </button>
                              <button
                                key='Save'
                                className='rounded-lg ms-[50px] py-[10px] px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
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
                                className='rounded-lg py-[10px] px-14 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200'
                                type={ButtonEnum.BUTTON}
                                onClick={(() => {
                                  alert('No podes intercambiarte a ti mismo')
                                })}
                              >
                                Intercambiar
                              </button>
                              <button
                                key='Save'
                                className='rounded-lg ms-[50px] py-[10px] px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
                                type={ButtonEnum.BUTTON}
                                onClick={(() => {
                                  alert('No podes guardar tus propias publicaciones')
                                })}
                              >
                                A
                              </button>

                            </>

                        }
                      </> : <><button
                        key='Trade'
                        className='rounded-lg py-[10px] px-14 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200'
                        type={ButtonEnum.BUTTON}
                        onClick={(() => {
                          router.push('/sign/in')
                        })}
                      >
                        Intercambiar
                      </button>
                        <button
                          key='Save'
                          className='rounded-lg ms-[50px] py-[10px] px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
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
                  <button
                    key='Trade'
                    className='rounded-lg py-[10px] px-14 font-semibold bg-gray-500 hover:bg-gray-600 hover:cursor-not-allowed'
                  >
                    Intercambiar
                  </button>
                  <button
                    key='Save'
                    className='rounded-lg ms-[50px] py-[10px] px-4 font-semibold bg-gray-500 hover:bg-gray-600 hover:cursor-not-allowed'
                  >
                    A
                  </button>
                </>
            }
          </div>

        </div>
      </div>
      <div className='w-[62%] m-auto text-black mt-[30px]'>
        <article>
          {
            (props.user.Rol === 'usuario_basico') && (props.user.userId != props.id_usuario) ?
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
                        'input': 'rounded-md border-blue-900 border-2 w-[100%]'
                      }}
                    />
                  </div>
                  <button
                    key='ask'
                    className='rounded-lg w-[130px] h-[40px] text-white ms-[50px] py-[10px] px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
                  >
                    Preguntar
                  </button>
                </div>
              </form> : null
          }

        </article>
        <p className='font-bold text-xl mt-[15px] '>Ultimas preguntas:</p>
        {Comments()}
      </div>
    </div>
  )
}