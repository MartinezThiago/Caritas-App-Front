import { CardProduct, MultiSelect } from '@/components'
import { FRONT_BASE_URL } from '@/constants'
import { User } from '@/types'
import { getUser } from '@/utils'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import auxPic from 'public/post-image-preview.jpg'
import { useEffect, useState } from 'react'
import RootLayout from '../layouts/root-layout'

interface Option {
  value: string
  label: string
}

export async function getServerSideProps ({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<{
  props: {
    user: User
    data: any[]
    centers: Array<Option>
  }
}> {
  const user = getUser(req, res)
  let data: any[] = []
  let locations: Array<Option> = []
  let centers: Array<Option> = []
  const token = getCookie('access', { req, res })

  // Productos
  await axios
    .get(`${FRONT_BASE_URL}posts/get`)
    .then(
      (result: any) =>
        (data = result.data.filter(
          (post: { usuario_owner: number }) => post.usuario_owner != user.userId
        ))
    )
    .catch(() => (data = []))

  // Localidades y centros
  const uniqueCenters = Array.from(
    new Set(
      data
        .map(card =>
          card.centros.map(
            (center: any) =>
              `${center.id_centro}|${center.nombre_centro}|${center.direccion}|${center.ubicacion}`
          )
        )
        .flat(Infinity)
    )
  )
  centers = uniqueCenters.map(center => {
    const splitted = center.split('|')
    return {
      value: `${splitted[0]}`,
      label: `${splitted[1]} | ${splitted[2]} | ${splitted[3]}`
    }
  })

  return { props: { user, data, centers } }
}

export default function Home ({
  user,
  data,
  centers
}: {
  user: User
  data: any[]
  centers: Array<Option>
}) {
  const router = useRouter()
  const [postsFavsUserAux, setPostFavsUserAux] = useState<number[]>([])
  const [filterSearchTag, setFilterSearchTag] = useState<string>('')
  const [filterCategoryTags, setFilterCategoryTags] = useState<string[]>([])
  const [filterConditionTags, setFilterConditionTags] = useState<string[]>([])
  const [filterCenterTag, setFilterCenterTag] = useState<string[]>([])
  const [hiddeCards, setHiddeCards] = useState<boolean>(false)

  const cardsData = data.filter(card => {
    const filterPerCategory = filterCategoryTags.length > 0
    const filterPerCondition = filterConditionTags.length > 0
    const filterPerCenter = filterCenterTag.length > 0
    const filterPerSearch =
      String(card.titulo)
        .toLocaleLowerCase()
        .includes(filterSearchTag.toLocaleLowerCase()) ||
      String(card.descripcion)
        .toLocaleLowerCase()
        .includes(filterSearchTag.toLocaleLowerCase()) ||
      String(card.nombre_categoria_producto)
        .toLocaleLowerCase()
        .includes(filterSearchTag.toLocaleLowerCase())

    // SI NINGUNO
    if (!filterPerCategory && !filterPerCondition && !filterPerCenter) {
      return filterPerSearch
      // SI SOLO CATEGORIA
    } else if (filterPerCategory && !filterPerCondition && !filterPerCenter) {
      return (
        filterCategoryTags.some(
          filterTag => card.categoria_producto == filterTag
        ) && filterPerSearch
      )
      // SI SOLO ESTADO
    } else if (!filterPerCategory && filterPerCondition && !filterPerCenter) {
      console.log('ESTADO', card.estado_producto, filterConditionTags)
      return (
        filterConditionTags.some(
          filterTag => card.estado_producto == filterTag
        ) && filterPerSearch
      )
      // SI SOLO CENTRO
    } else if (!filterPerCategory && !filterPerCondition && filterPerCenter) {
      return (
        filterCenterTag.some(filterTag =>
          card.centros.some((center: any) => center.id_centro == filterTag)
        ) && filterPerSearch
      )
      // SI CATEGORIA Y ESTADO
    } else if (filterPerCategory && filterPerCondition && !filterPerCenter) {
      return (
        filterCategoryTags.some(
          filterTag => card.categoria_producto == filterTag
        ) &&
        filterConditionTags.some(
          filterTag => card.estado_producto == filterTag
        ) &&
        filterPerSearch
      )
      // SI CATEGORIA Y CENTRO
    } else if (filterPerCategory && !filterPerCondition && filterPerCenter) {
      return (
        filterCategoryTags.some(
          filterTag => card.categoria_producto == filterTag
        ) &&
        filterCenterTag.some(filterTag =>
          card.centros.some((center: any) => center.id_centro == filterTag)
        ) &&
        filterPerSearch
      )
      // SI ESTADO Y CENTRO
    } else if (!filterPerCategory && filterPerCondition && filterPerCenter) {
      return (
        filterConditionTags.some(
          filterTag => card.estado_producto == filterTag
        ) &&
        filterCenterTag.some(filterTag =>
          card.centros.some((center: any) => center.id_centro == filterTag)
        ) &&
        filterPerSearch
      )
      // SI LOS 3
    } else if (filterPerCategory && filterPerCondition && filterPerCenter) {
      return (
        filterCategoryTags.some(
          filterTag => card.categoria_producto == filterTag
        ) &&
        filterConditionTags.some(
          filterTag => card.estado_producto == filterTag
        ) &&
        filterCenterTag.some(filterTag =>
          card.centros.some((center: any) => center.id_centro == filterTag)
        ) &&
        filterPerSearch
      )
    }
  })

  useEffect(() => {
    console.log('CARTA EJEMPLO', data[0])
    if (user.role == 'usuario_basico') {
      const getIdsPostFavs = async () => {
        await axios
          .get<any[]>(`${FRONT_BASE_URL}/user/favs/getIdFavs`)
          .then((res: any) => setPostFavsUserAux(res.data))
          .catch((err: any) => setPostFavsUserAux([]))
      }
      getIdsPostFavs()
    }
  }, [])

  const handleCategoryFilterChange = (e: any) => {
    if (e.target.checked) {
      setFilterCategoryTags([...filterCategoryTags, e.target.value])
    } else {
      setFilterCategoryTags(
        filterCategoryTags.filter(filterTag => filterTag !== e.target.value)
      )
    }
  }

  const handleStateFilterChange = (e: any) => {
    if (e.target.checked) {
      setFilterConditionTags([...filterConditionTags, e.target.value])
    } else {
      setFilterConditionTags(
        filterConditionTags.filter(filterTag => filterTag !== e.target.value)
      )
    }
  }

  const handleResetFilters = () => {
    setFilterSearchTag('')
    setFilterCategoryTags([])
    setFilterConditionTags([])
  }

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
          <div className='w-[100%] flex justify-center items-center'>
            <div className='max-w-[75%] flex flex-col gap-4'>
              <div className='w-full text-center'>
                <button
                  className='m-auto mt-[15%] text-white rounded-lg py-[10px] px-4 outline-transparent	outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                  onClick={handleResetFilters}
                >
                  Eliminar Filtros
                </button>
              </div>
              <input
                type='search'
                id='search'
                placeholder='Buscar...'
                value={filterSearchTag}
                onChange={(e: any) => setFilterSearchTag(e.target.value ?? '')}
                className='border px-4 py-2'
              />
              <fieldset className='flex flex-col border'>
                <legend>Buscar por categoría</legend>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    id='ropa'
                    value={4}
                    checked={filterCategoryTags.includes('4')}
                    onClick={handleCategoryFilterChange}
                  />
                  <label htmlFor='ropa'>Ropa</label>
                </div>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    id='utiles-escolares'
                    value={1}
                    checked={filterCategoryTags.includes('1')}
                    onClick={handleCategoryFilterChange}
                  />
                  <label htmlFor='utiles-escolares'>Útiles Escolares</label>
                </div>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    id='alimentos'
                    value={2}
                    checked={filterCategoryTags.includes('2')}
                    onClick={handleCategoryFilterChange}
                  />
                  <label htmlFor='alimentos'>Alimentos</label>
                </div>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    id='limpieza'
                    value={3}
                    checked={filterCategoryTags.includes('3')}
                    onClick={handleCategoryFilterChange}
                  />
                  <label htmlFor='limpieza'>Limpieza</label>
                </div>
              </fieldset>
              <fieldset className='flex flex-col border'>
                <legend>Buscar por estado</legend>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    name='condition'
                    id='nuevo'
                    value={1}
                    checked={filterConditionTags.includes('1')}
                    onClick={handleStateFilterChange}
                  />
                  <label htmlFor='nuevo'>Nuevo</label>
                </div>
                <div className='flex gap-2'>
                  <input
                    type='checkbox'
                    name='condition'
                    id='usado'
                    value={2}
                    checked={filterConditionTags.includes('2')}
                    onClick={handleStateFilterChange}
                  />
                  <label htmlFor='usado'>Usado</label>
                </div>
              </fieldset>
              <fieldset className='flex flex-col border'>
                <legend>Buscar por localidad y centro</legend>
                <div className='w-full max-w-[14.125rem] -mb-[1.35rem]'>
                  <MultiSelect
                    id='location-center'
                    label=''
                    props={{
                      isMulti: true,
                      options: centers,
                      setValue: (_: any, value: any) =>
                        setFilterCenterTag(value)
                    }}
                  />
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div className='bg-blue-900 w-[1px] h-[100%]'></div>
        {cardsData.length > 0 && !hiddeCards ? (
          <div className='flex flex-col'>
            <div className='flex flex-wrap justify-center items-center mt-[4.4%] w-[70vw]'>
              {cardsData.map((e: any) => (
                <CardProduct
                  key={e.id}
                  id={e.id}
                  title={e.titulo}
                  desciption={e.descripcion}
                  nameProductCategorie={e.nombre_categoria_producto}
                  nameProductState={e.nombre_estado_producto}
                  locationTrade={e.ubicacion_trade}
                  image={
                    e.imagenes[0].base64_imagen
                      ? e.imagenes[0].base64_imagen
                      : auxPic
                  }
                  ownerPost={postsFavsUserAux.includes(e.id)}
                />
              ))}
            </div>
            {user.role == 'admin_centro' ? (
              <button
                key='hiddenPosts'
                className='m-auto mt-[3%] text-white rounded-lg py-[10px] px-14 outline-transparent	outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                onClick={() => {
                  setHiddeCards(true)
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
