import { PostData } from '@/types'
import FullComment from './full-comment'
import Input from './input'
import {useForm} from 'react-hook-form'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import postImagePreview from 'public/post-image-preview.jpg'

interface FormData{
  question: string
}
const src='public/post-image-preview.jpg'
  
export default function ExtendedPostCard(props: PostData) {  
  const {
    register,
    handleSubmit,
    formState: {errors}
  } =useForm<FormData>()

  
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

  console.log(postImagePreview.src);
  


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
        <div className='ms-[60px] text-black w-[29vw] flex flex-col justify-between'>
          <div className=''>
            <h1 className='font-bold'>{props.titulo}</h1>
            <div className='ms-[20px] mt-[4px]'>
              <p className='font-bold'>Descripcion</p>
              <p className='ms-[15px] mt-[5px]'>{props.descripcion}</p>
              <div className='flex justify-between w-[60%]'>
                <div className='font-bold mt-[15px]'>
                  <p className='my-[13px]'>Estado: </p>
                  <p className='my-[13px]'>Categoría: </p>
                  <p className='my-[13px]'>Ubicacion: </p>
                </div>
                <div className='mt-[15px]'>
                  <p className='my-[13px]'>{props.nombre_estado_producto}</p>
                  <p className='my-[13px]'>{props.nombre_categoria_producto}</p>
                  <p className='my-[13px]'>{props.ubicacion_trade}</p>
                </div>
              </div>
              <p className='font-bold'>Centros elegidos para el intercambio:</p>
              <div className='ms-[15px] mt-[5px]'>
                <p className='my-[5px]'><span className='font-bold text-rose-700'>Centro nro°{props.centros_elegidos}:</span> 50 y 120 n°25</p>
                <p className='my-[5px]'><span className='font-bold text-rose-700'>Centro nro°{props.centros_elegidos}:</span> 1 y 57 n°23</p>
              </div>
              <p className='font-bold mt-[13px]'>{props.nombre_usuario} {props.apellido_usuario} <span className='font-bold text-sm text-gray-600'>{props.fecha_publicacion}</span></p>
            </div>
          </div>
          <div className='mt-[40px] mb-[40px] text-white flex justify-center'>
            <button
                key='Trade'
                className='rounded-lg py-[10px] px-14 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200'
              >
                Intercambiar
              </button>
              <button
                key='Save'
                className='rounded-lg ms-[50px] py-[10px] px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
              >
                A
              </button>
          </div>
          
        </div>
      </div>
      {/*ZONA DE PREGUNTAS*/}
      <div className='w-[62%] m-auto text-black mt-[30px]'>
        <article>
          <form 
            noValidate
            onSubmit={handleSubmit(({question}:FormData)=>{
              {
                /*Post con axios para enviar la pregunta 
                Sacar funcion aca y pasarla a una variable adentro del componente
                */
              }
              console.log(question);
              
            })}  
          >
            <p className='font-bold text-sm'>Preguntale al vendedor</p>
            <div className='flex'>
              <Input 
                id='question'
                register={register}
                type='text'
                key='question'
                //label='Preguntale al vendedor'
                registerOptions={{required: 'Escriba una pregunta'}}
                error={errors.question}
                placeholder='Escriba aquí su pregunta'
                className={{
                  'input':'rounded-md'
                }}
              />
              <button
                  key='Save'
                  className='rounded-lg w-[350px] h-[40px] text-white ms-[50px] py-[10px] px-4 outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
                >
                  Preguntar
              </button>
            </div>
          </form>
          
        </article>
        <p className='font-bold text-2xl '>Ultimas preguntas:</p>
        <FullComment
          question={'Hola nececito cubrir una pared interior de una pileta cubierta de 8 metros lineales .que me aconseja y q cuesta?'}
          questionDate={'05/06/2023'}
          questionUserInfo={'Thiago Martinez'}
          answer={'Hola! Cómo estás? precisamos largo por ancho para cotizarte correctamente, ten en cuenta que no es apto para estar dentro del agua. Cualquier consulta que tengas avisanos. Saludos y gracias por contactarte! El equipo de Green Deco.'}
          answerDate={'01/01/2024'}
        />
        <FullComment
          question={'Se me va de presupuesto 50x50 en ese modelo, pero justamente con media sombra al que actualmente te consulté es el que tengo, podría servir ya que el pleno sol es por detrás. Es posible?'}
          questionDate={'05/06/2023'}
          questionUserInfo={'Thiago Martinez'}
          //answer={'Hola! Cómo estás? comprendemos, no te recomendamos el modelo de 40x60cm ya que no cuenta con proteccion UV y se puede deteriorar rapidamente Cualquier consulta que tengas avísanos. Saludos y gracias por contactarte! El equipo de Green Deco'}
          answerDate={'01/01/2024'}
        />
      </div>
    </div>
  )
}