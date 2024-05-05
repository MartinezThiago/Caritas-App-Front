import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import RootLayout from '../layouts/root-layout'
import { CardProduct, Input } from '@/components'
import { User } from '@/types'
import { getUser } from '@/utils'
import { useEffect, useState } from 'react'
import { FRONT_BASE_URL } from '@/constants'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import auxPic from 'public/post-image-preview.jpg'

export async function getServerSideProps({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<{
  props: {
    user: User
  }
}> {
  return {
    props: {
      user: getUser(req, res)
    }
  }
}

interface FormData {
  question: string
}

export default function Home({ user }: { user: User }) {
  const router = useRouter()
  const [cardsData, setCardsData] = useState<any[]>()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  useEffect(() => {
    const getProducts = async () => {
      const { data: cardsData } = await axios.get<any[]>(`${FRONT_BASE_URL}posts/get`)
      setCardsData(cardsData)
    }
    getProducts()
  }, [])

  const CardsProducts = () => {
    if (cardsData) {
      const cards = cardsData!.map((e: any) => {
        return (
          <CardProduct
            key={e.id}
            id={e.id}
            title={e.titulo}
            desciption={e.descripcion}
            nameProductCategorie={e.nombre_categoria_producto}
            nameProductState={e.nombre_estado_producto}
            locationTrade={e.ubicacion_trade}
            image={e.imagenes[0].base64_imagen?e.imagenes[0].base64_imagen:auxPic}
          />
        )
      })
      return cards
    }
  }


  return (
    <RootLayout user={user}>
      <main className='flex'>
        <div className='w-[30vw] border-r-4 border-r-blue-900'>
          {(user.role == 'usuario_basico') ? <>
            <button
              key='Post'
              className='ms-[25%] mt-[15%] text-white rounded-lg py-[10px] px-14 outline-transparent	outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200'
              onClick={() =>router.push('/post/create/')}
            >
              Crear publicacion
            </button>
          </> : (user.role == 'non-registered') ?
            <>
              <button
                key='Post'
                className='ms-[25%] mt-[15%] text-white rounded-lg py-[10px] px-14 outline-transparent	outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200'
                onClick={() => router.push('/sign/in/')}
              >
                Crear publicacion
              </button>
            </> : <button
              key='Post'
              className='ms-[25%] mt-[15%] text-white rounded-lg py-[10px] px-14 outline-transparent	outline font-semibold hover:outline-[3px] bg-gray-500 hover:bg-gray-600 hover:cursor-not-allowed '
            >
              Crear publicacion
            </button>

          }
          <form
            noValidate
            onSubmit={handleSubmit(({ question }: FormData) => {
              {
              }
              console.log(question)
            })}
          >
            <div className='flex mt-[30px] justify-center w-[100%]'>
              <div className='w-[50%]'>
                <Input
                  id='question'
                  register={register}
                  type='search'
                  key='question'
                  registerOptions={{ required: 'Escriba una busqueda' }}
                  error={errors.question}
                  placeholder='Buscar...'
                  label=''
                // className={{
                //   'input': 'rounded-full border-blue-900 border-2'
                // }}
                />
              </div>
              <button
                key='Save'
                className='rounded-full w-[40px] h-[40px] text-white ms-[10px] outline outline-transparent bg-rose-700 font-semibold hover:bg-white hover:outline-[3px]  hover:text-rose-700 hover:outline-rose-700 duration-200'
              >
                B
              </button>
            </div>
          </form>
        </div>
        <div className='flex flex-wrap justify-center items-center mt-[4.4%] w-[70vw]'>
          {CardsProducts()}
        </div>
      </main>
    </RootLayout>
  )
}
