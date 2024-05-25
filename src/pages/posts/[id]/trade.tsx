import { CardProduct, MultiSelect } from '@/components'
import { FRONT_BASE_URL } from '@/constants'
import { RootLayout } from '@/layouts'
import { GetSSPropsResult, PostDataAdapter, User } from '@/types'
import { getUser, requirePermission, makeTimeRange } from '@/utils'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import auxPic from 'public/post-image-preview.jpg'
import { useEffect, useState } from 'react'

export async function getServerSideProps ({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<GetSSPropsResult> {
  return requirePermission(getUser(req, res), 'usuario_basico')
}

interface Option {
  value: string
  label: string
}

const Field = ({
  text,
  options,
  handleClick
}: {
  text: string
  options: Array<{ value: string; label: string }>
  handleClick: (value: string) => void
}): React.ReactNode => {
  return (
    <div className='w-full max-w-96 flex flex-col'>
      <h1 className='w-full text-center text-xl'>{text}</h1>
      <div className='w-full max-w-96 p-4'>
        <MultiSelect
          props={{
            options,
            setValue: (_: string, value: string) => {
              handleClick(value)
            }
          }}
        />
      </div>
    </div>
  )
}

export default function Trade ({ user }: { user: User }) {
  const router = useRouter()
  const [postData, setPostData] = useState<PostDataAdapter | undefined>()
  const [posts, setPosts] = useState<[] | undefined>()
  const [postsSelected, setPostsSelected] = useState<string[]>([])
  const [centers, setCenters] = useState<Option[]>([])
  const [center, setCenter] = useState<string>('')
  const [days, setDays] = useState<Record<string, Option[]>>({})
  const [day, setDay] = useState<string>('')
  const [hours, setHours] = useState<Record<string, Option[]>>({})
  const [hour, setHour] = useState<string>('')

  useEffect(() => {
    const getPosts = async () => {
      await axios
        .get(`${FRONT_BASE_URL}user/getposts`)
        .then((res: any) => {
          setPosts(res.data)
        })
        .catch((res: any) => {
          setPosts([])
        })
    }
    const getPostData = async () => {
      await axios
        .post<PostDataAdapter>(`${FRONT_BASE_URL}post/get`, {
          id: router.query.id
        })
        .then((res: any) => {
          setPostData(res.data)
          const centerOptions: Option[] = []
          const dayOptions: Record<string, Option[]> = {}
          const hourOptions: Record<string, Option[]> = {}
          res.data.centros.forEach((center: any) => {
            centerOptions.push({
              value: center.id_centro,
              label: `${center.ubicacion} | ${center.direccion} | ${center.nombre_centro}`
            })
            dayOptions[center.id_centro] = center.dias.map((day: any) => ({
              value: day.idDia,
              label: day.descripcion
            }))
            hourOptions[center.id_centro] = makeTimeRange(
              center.horario_apertura,
              center.horario_cierre
            ).map((time: string) => ({
              value: time,
              label: time
            }))
          })
          setCenters(centerOptions)
          setDays(dayOptions)
          setHours(hourOptions)
        })
        .catch((err: any) => {})
    }
    getPosts()
    getPostData()
  }, [])

  const handlePostClick = (id: string) => {
    if (postsSelected.includes(id)) {
      setPostsSelected(prev => prev.filter(prevId => prevId !== id))
    } else {
      setPostsSelected(prev => [...prev, id])
    }
    if (postsSelected.length === 0) {
      setCenter('')
      setDay('')
      setHour('')
    }
  }

  const handleCenterClick = (center: string) => {
    setCenter(center)
  }

  const handleDayClick = (day: string) => {
    setDay(day)
  }

  const handleHourClick = (hour: string) => {
    setHour(hour)
  }

  const handleSubmit = async () => {
    const form = {
      offer: postsSelected,
      center,
      day,
      hour
    }
    console.log(form)
    // ELIMINAR EL RETURN PARA EJECUTAR LA SOLICITUD
    return
    await axios
      .post(`${FRONT_BASE_URL}trade/create`, form)
      .then((res: any) => {
        alert('Oferta creada con éxito')
        router.push('/posts')
      })
      .catch((res: any) => {
        alert('Error al crear la oferta')
        console.error(res)
      })
  }

  return (
    <RootLayout user={user}>
      <main className='w-screen'>
        <div className='w-full flex flex-col'>
          {posts ? (
            <>
              <h1 className='w-full text-center'>
                1) Seleccione los productos a ofertar/intercambiar
              </h1>
              <div className='w-full p-4 flex justify-center items-center overflow-x-auto'>
                {posts.map((post: any, index: number) => (
                  <>
                    <CardProduct
                      key={post.id}
                      id={post.id}
                      title={post.titulo}
                      desciption={post.descripcion}
                      nameProductCategorie={post.nombre_categoria_producto}
                      nameProductState={post.nombre_estado_producto}
                      locationTrade={post.ubicacion_trade}
                      image={
                        post.imagenes[0].base64_imagen
                          ? post.imagenes[0].base64_imagen
                          : auxPic
                      }
                      ownerPost={
                        post.usuario_owner === parseInt(user.userId.toString())
                      }
                      handleClick={handlePostClick}
                      enableLink={false}
                    />
                    {postsSelected.includes(post.id.toString()) && (
                      <div className='w-0 h-0 p-0 m-0 relative'>
                        <p className='pb-2 px-2 absolute bottom-24 right-6 text-6xl bg-blue-700 rounded-full text-white'>
                          ✰
                        </p>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </>
          ) : (
            <h1>No posee productos de igual tipo para intercambiar</h1>
          )}
          {postsSelected.length > 0 && (
            <>
              <div className='w-full flex justify-center items-center'>
                <Field
                  text='2) Seleccione el centro'
                  options={centers}
                  handleClick={handleCenterClick}
                />
                {postsSelected.length > 0 && center ? (
                  <Field
                    text='3) Seleccione el día'
                    options={days[center]!}
                    handleClick={handleDayClick}
                  />
                ) : null}
                {postsSelected.length > 0 && center && day ? (
                  <Field
                    text='4) Seleccione el horario'
                    options={hours[center]!}
                    handleClick={handleHourClick}
                  />
                ) : null}
              </div>
              {postsSelected.length > 0 && center && day && hour ? (
                <div className='w-full flex justify-center items-center pb-4'>
                  <button
                    onClick={handleSubmit}
                    className='w-56 text-white rounded-lg py-[10px] outline-transparent outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                  >
                    Ofertar
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </main>
    </RootLayout>
  )
}
