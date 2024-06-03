import { CardProduct, MultiSelect } from '@/components'
import { FRONT_BASE_URL, daysByDay } from '@/constants'
import { RootLayout } from '@/layouts'
import { GetSSPropsResult, PostDataAdapter, User } from '@/types'
import { getUser, makeTimeRange, requirePermission } from '@/utils'
import axios from 'axios'
import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import auxPic from 'public/post-image-preview.jpg'
import { useEffect, useState } from 'react'

export async function getServerSideProps({
  req,
  res,
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

const validateDay = (day: string, days: string[]): boolean => {
  const dayOfWeek = dayjs(day).day()
  const isDayOfWeekAvailable = days.includes(daysByDay[dayOfWeek])
  if (isDayOfWeekAvailable) {
    return true
  } else {
    return false
  }
}

const Field = ({
  text,
  options,
  handleClick,
  datepicker = false,
  datePickerValue,
  datepickerText = '',
}: {
  text: string
  options?: Array<{ value: string; label: string }>
  handleClick: (value: string) => void
  datepicker?: boolean
  datePickerValue?: string
  datepickerText?: string
}): React.ReactNode => {
  return (
    <div className='w-full max-w-96 flex flex-col'>
      <h1 className='w-full text-center text-xl'>{text}</h1>
      <div className='w-full max-w-96 p-4'>
        {datepicker ? (
          <>
            <input
              type='date'
              className='w-full h-[2.5rem] mt-4 py-2 px-3 appearance-none border shadow text-zinc-700 focus:outline-none focus:shadow-lg border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50'
              onChange={(e: any) => handleClick(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              value={datePickerValue}
            />
            <p className='mt-2 mb-4'>{datepickerText}</p>
          </>
        ) : (
          <MultiSelect
            props={{
              options,
              setValue: (_: string, value: string) => {
                handleClick(value)
              },
            }}
          />
        )}
      </div>
    </div>
  )
}

export default function Trade({ user }: { user: User }) {
  const router = useRouter()
  const [postData, setPostData] = useState<PostDataAdapter | undefined>()
  const [posts, setPosts] = useState<[] | undefined>()
  const [postSelected, setPostSelected] = useState<string | undefined>()
  const [centers, setCenters] = useState<Option[]>([])
  const [center, setCenter] = useState<string | undefined>(undefined)
  const [days, setDays] = useState<string[]>([])
  const [day, setDay] = useState<string>('')
  const [hours, setHours] = useState<Record<string, Option[]>>({})
  const [hour, setHour] = useState<string | undefined>(undefined)

  useEffect(() => {
    const getData = async () => {
      await axios
        .post<PostDataAdapter>(`${FRONT_BASE_URL}post/get`, {
          id: router.query.id,
        })
        .then((postRes: any) => {
          console.log(postRes.data)
          setPostData(postRes.data)
          const centerOptions: Option[] = []
          let dayOptions: string[] = []
          const hourOptions: Record<string, Option[]> = {}
          postRes.data.centros_Publicacion.forEach((center: any) => {
            centerOptions.push({
              value: center.id_cp,
              label: `${postRes.data.ubicacion_trade} - ${
                center.nombre_centro
              } - ${
                postRes.data.centros.filter(
                  (center: any) =>
                    center.nombre_centro === center.nombre_centro,
                )[0].direccion
              }`,
            })
            dayOptions = center.diasDeIntercambio
            hourOptions[center.id_cp] = makeTimeRange(
              center.desde,
              center.hasta,
            ).map((time: string) => ({
              value: time,
              label: time,
            }))
          })
          setCenters(centerOptions)
          setDays(dayOptions)
          setHours(hourOptions)

          const getPosts = async () => {
            await axios
              .get(`${FRONT_BASE_URL}user/getposts`)
              .then((postsRes: any) => {
                try {
                  const filteredPosts = postsRes.data.filter(
                    (post: any) =>
                      post.categoria_producto ===
                      postRes.data.categoria_producto,
                  )
                  setPosts(filteredPosts.length > 0 ? filteredPosts : undefined)
                } catch {
                  setPosts(undefined)
                }
              })
              .catch(() => {
                setPosts(undefined)
              })
          }
          getPosts()
        })
        .catch((err: any) => {})
    }
    getData()
  }, [])

  const handlePostClick = (id: string) => {
    let newPostSelected = undefined
    if (postSelected !== id) {
      newPostSelected = id
    }
    setPostSelected(newPostSelected)
    if (!newPostSelected) {
      setCenter('')
      setDay('')
      setHour('')
    }
  }

  const handleCenterClick = (center: string) => {
    setCenter(center)
  }

  const handleDayClick = (value: string) => {
    let newDay = ''
    if (validateDay(value, days)) {
      newDay = value
    } else {
      alert('El día seleccionado no se encuentra disponible')
    }
    setDay(newDay)
  }

  const handleHourClick = (hour: string) => {
    setHour(hour)
  }

  const handleSubmit = async () => {
    const form = {
      post: router.query.id,
      'post-user-id': postData!.id_usuario,
      offer: postSelected,
      'bidding-user-id': user.userId,
      center,
      day,
      hour,
    }
    console.log(form)
    await axios
      .post(`${FRONT_BASE_URL}posts/trade/create`, form)
      .then((res: any) => {
        alert('Oferta creada con éxito')
        router.push('/')
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
                1) Seleccione el producto a ofertar/intercambiar
              </h1>
              <div className='w-full p-4 flex justify-center items-center overflow-x-auto'>
                {posts.map((post: any) => {
                  if (
                    postSelected !== post.id.toString() &&
                    postSelected !== undefined
                  ) {
                    return null
                  }
                  return (
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
                          post.usuario_owner ===
                          parseInt(user.userId.toString())
                        }
                        handleClick={handlePostClick}
                        enableLink={false}
                      />
                      {postSelected === post.id.toString() && (
                        <div className='w-0 h-0 p-0 m-0 relative'>
                          <p className='pb-2 px-2 absolute bottom-24 right-6 text-6xl bg-blue-700 rounded-full text-white'>
                            ✰
                          </p>
                        </div>
                      )}
                    </>
                  )
                })}
              </div>
            </>
          ) : (
            <h1>No posee productos de igual tipo para intercambiar</h1>
          )}
          {postSelected && (
            <>
              <div className='w-full flex justify-center items-center'>
                <Field
                  text='2) Seleccione el centro'
                  options={centers}
                  handleClick={handleCenterClick}
                />
                {postSelected && center ? (
                  <Field
                    text='3) Seleccione el día'
                    handleClick={handleDayClick}
                    datepicker
                    datePickerValue={day}
                    datepickerText={`Solo se encuentra los días ${days.join(
                      ', ',
                    )}`}
                  />
                ) : null}
                {postSelected && center && day ? (
                  <Field
                    text='4) Seleccione el horario'
                    options={hours[center]!}
                    handleClick={handleHourClick}
                  />
                ) : null}
              </div>
              {postSelected && center && day && hour ? (
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
