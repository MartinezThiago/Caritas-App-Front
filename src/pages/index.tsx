import { CardProduct, Input } from '@/components'
import { Loading } from '@/components/loading'
import { FRONT_BASE_URL } from '@/constants'
import { User } from '@/types'
import { getUser } from '@/utils'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import auxPic from 'public/post-image-preview.jpg'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import RootLayout from '../layouts/root-layout'

export async function getServerSideProps({
  req,
  res,
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
      user: getUser(req, res),
    },
  }
}

interface FormData {
  question: string
}

export default function Home({ user }: { user: User }) {
  const router = useRouter()
  const [cardsData, setCardsData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [postsFavsUser, setPostFavsUser] = useState<number[]>([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  useEffect(() => {
    const getProducts = async () => {
      await axios
        .get<any[]>(`${FRONT_BASE_URL}posts/get`)
        .then((res: any) => {
          setCardsData(
            res.data.filter(
              (post: { usuario_owner: number }) =>
                post.usuario_owner != user.userId,
            ),
          )
          //setCardsData([])
        })
        .catch((err: any) => {
          setCardsData([])
        })
    }
    getProducts()
  }, [])
  useEffect(() => {
    if (user.role == 'usuario_basico') {
      const getIdsPostFavs = async () => {
        await axios
          .get<any[]>(`${FRONT_BASE_URL}/user/favs/getIdFavs`)
          .then((res: any) => {
            console.log(res.data)
            setPostFavsUser(res.data)
          })
          .catch((err: any) => {
            setPostFavsUser([])
          })
      }
      getIdsPostFavs()
    }
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
            image={
              e.imagenes[0].base64_imagen ? e.imagenes[0].base64_imagen : auxPic
            }
            ownerPost={postsFavsUser.includes(e.id)}
          />
        )
      })
      return cards
    }
  }
  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false) // Cambia isLoading a false después de 2 segundos
    }, 200)
  }, [])
  return (
    <RootLayout user={user}>
      <main className='flex'>
        <div className='w-[30vw]'>
          {user.role == 'usuario_basico' ? (
            <div className='flex'>
              <button
                key='Post'
                className='m-auto mt-[15%] text-white rounded-lg py-[10px] px-14 outline-transparent	outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                onClick={() => router.push('/post/create/')}
              >
                Crear publicacion
              </button>
            </div>
          ) : user.role == 'non-registered' ? (
            <div className='flex'>
              <button
                key='Post'
                className='m-auto mt-[15%] text-white rounded-lg py-[10px] px-14 outline-transparent	outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                onClick={() => router.push('/sign/in/')}
              >
                Crear publicacion
              </button>
            </div>
          ) : (
            <div className='flex'>
              <button
                key='Post'
                className='m-auto mt-[15%] text-white rounded-lg py-[10px] px-14 outline-transparent	outline font-semibold hover:outline-[3px] bg-gray-500 hover:bg-gray-600 hover:cursor-not-allowed '
              >
                Crear publicacion
              </button>
            </div>
          )}
          <form
            noValidate
            onSubmit={handleSubmit(({ question }: FormData) => {
              {
              }
              console.log(question)
            })}
          >
            <div className='w-[100%] mt-[30px] flex justify-center items-center'>
              <div className='max-w-[75%] max-h-[2.5rem]'>
                <Input
                  id='question'
                  register={register}
                  type='search'
                  key='question'
                  registerOptions={{ required: 'Escriba una busqueda' }}
                  error={errors.question}
                  placeholder='Buscar...'
                  label=''
                />
              </div>
            </div>
          </form>
        </div>
        <div className='bg-blue-900 w-[1px] h-[100%]'></div>
        {isLoading ? (
          <div className='w-[70vw]'>
            <div className='flex mt-[50px]'>
              <div className='m-auto'>
                <Loading />
              </div>
            </div>
          </div>
        ) : cardsData.length > 0 ? (
          <div className='flex flex-col'>
            <div className='flex flex-wrap justify-center items-center mt-[4.4%] w-[70vw]'>
              {CardsProducts()}
            </div>
            {user.role == 'admin_centro' ? (
              <button
                key='hiddenPosts'
                className='m-auto mt-[3%] text-white rounded-lg py-[10px] px-14 outline-transparent	outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                onClick={() => {
                  setCardsData([])
                }}
              >
                Vaciar publicaciones
              </button>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className='flex w-[70vw]'>
            <p className='text-xl font-bold text-blue-900 mt-[50px] m-auto'>
              NO HAY PUBLICACIONES ACTUALMENTE
            </p>
          </div>
        )}
      </main>
    </RootLayout>
  )
}
