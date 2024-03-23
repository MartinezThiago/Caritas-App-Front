import { PostData } from '@/types'
import postImagePreview from 'public/post-image-preview.jpg'


export default function ExtendedPostCard(props: PostData) {  
  return (
    <div className='w-100vw h-50vh flex justify-center w-[100vw] mt-[40px]'>
      <div className='w-[400px] h-[400px] bg-gray-400	'>
      <div className='w-[400px] h-[400px] bg-gray-400 m-auto mb-[20px]'></div>
        <div className='flex justify-between '>
          <div className='w-[100px] h-[100px] bg-gray-400'></div>
          <div className='w-[100px] h-[100px] bg-gray-400'></div>
          <div className='w-[100px] h-[100px] bg-gray-400 '></div>
        </div>
        
      </div>
      <div className='ms-[60px] text-black bg-gray-400 w-[22vw]'>
        <h1 className='font-bold'>{props.titulo}</h1>
        <p className='font-bold'>Descripcion</p>
        <p className='ms-[10px]'>{props.descripcion}</p>
        <p><span className='font-bold'>Estado: </span>{props.nombre_estado_producto}</p>
        <p><span className='font-bold'>Categoría: </span>{props.nombre_categoria_producto}</p>
        <p><span className='font-bold'>Ubicacion: </span>{props.ubicacion_trade}</p>
        <p className='font-bold '>Centros elegidos para el intercambio:</p>
        <div className='items-center justify-center w-full'>
          <p><span className='font-bold text-rose-700'>Centro nro°{props.centros_elegidos}:</span> 50 y 120 n°25</p>
          <p><span className='font-bold text-rose-700'>Centro nro°{props.centros_elegidos}:</span> 1 y 57 n°23</p>
        </div>
        <p className='font-bold'>{props.nombre_usuario} {props.apellido_usuario}</p>
        <div className='mt-[40px] text-white flex justify-center '>
          <button
              key='Trade'
              className='rounded-lg py-[10px] px-14 outline bg-rose-700 font-bold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200'
            >
              Intercambiar
            </button>
            <button
              key='Save'
              className='rounded-lg ms-[50px] py-[10px] px-4 outline bg-rose-700 font-bold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
            >
              A
            </button>
        </div>
        
      </div>
    </div>
  )
}