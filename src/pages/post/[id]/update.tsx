import type {
  NextApiRequest,
  NextApiResponse
} from 'next'
import type {
  GetSSPropsResult,
  User
} from '@/types'

import axios from 'axios'
import {
  centers as c,
  locations as l
} from '@/utils/examples/locations'

import { ButtonEnum } from '@/components/types'
import {
  Categories,
  Input,
  Select,
  TextArea
} from '@/components'
import { FRONT_BASE_URL } from '@/constants'
import { getUser } from '@/utils'
import { requirePermission } from '@/utils'
import { RootLayout } from '@/layouts'
import { FieldError, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'


/**
 * Gets the user from the request and response objects in the server side and pass it
 * to the page component.
 */
export async function getServerSideProps({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<GetSSPropsResult> {
  return requirePermission(
    getUser(req, res),
    'usuario_basico',
    '/'
  )
}

/**
 * The form data for the post creation.
 */
interface FormData {
  name: string
  location: string
  description: string
  categories: string[]
  photos: string
  center: string
}

/**
 * The create post page.
 */
export default function CreatePost({ user }: { user: User }) {
  const router = useRouter()
  const { id } = router.query

  const [loading, setLoaging] = useState(false)
  const [centers, setCenters] = useState<any>([])
  const [placeholders, setPlaceholders] = useState<FormData>({
    name: '',
    location: '',
    description: '',
    categories: [],
    photos: '',
    center: ''
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors
  } = useForm<FormData>()

  useEffect(() => {
    setLoaging(true)
    axios.
      get(`${FRONT_BASE_URL}post/${id}`)
      .then((res: any) => {
        setPlaceholders(res.data)
        setLoaging(false)
      })
      .catch(() => {
        alert(
          'Ha ocurrido un error inesperado, por favor intente nuevamente más tarde.'
        )
        router.push('/')
      })
  }, [id, router])

  const handleLocationChange = (e: any) => {
    console.log(errors)
    setValue('location', e.target.value)
    setCenters(c[e.target.value])
  }

  const handleCenterChange = (e: any) => {
    setValue('center', e.target.value)
    clearErrors('center')
  }

  /**
   * Calls the endpoint by sending it the form data
   * @arg {FormData} formData
   */
  const _handleSubmit = (formData: FormData) => {
    setLoaging(true)
    axios
      .post(`${FRONT_BASE_URL}post/${id}/update`, formData)
      .then(() => router.push('/'))
      .catch((error: any) => {
        try {
          alert(error.response.data.message)
        } catch (error) {
          alert('Ha ocurrido un error inesperado, intente nuevamente.')
        }
        setLoaging(false)
      })
  }

  return <RootLayout user={user}>
    <main>
      <section
        key='signin-section'
        className='h-full flex flex-col justify-center items-center'
      >
        <form
          key='create-post-form'
          noValidate
          onSubmit={handleSubmit(_handleSubmit)}
          className='mb-4 p-2 flex flex-col items-center justify-center'
        >
          <div
            key='create-post-form-container-1'
            className='flex gap-4'
          >
            <div
              key='name-input-container'
              className='basis-1/2'
            >
              <Input
                id='name'
                label='Nombre'
                error={errors.name}
                register={register}
                registerOptions={{ required: 'Campo requerido' }}
                type='text'
                autoFocus={true}
                placeholder={placeholders.name}
              />
            </div>
            <div
              key='photos-input-container'
              className='basis-1/2'
            >
              <Input
                id='photos'
                label='Fotos'
                type='file'
                autoFocus={true}
                error={errors.photos}
                register={register}
                registerOptions={{ required: 'Campo requerido' }}
                placeholder={placeholders.photos}
              />
            </div>
          </div>
          <div
            key='description-container'
            className='w-full'
          >
            <TextArea
              id='description'
              label='Descripción'
              error={errors.description}
              register={register}
              registerOptions={{ required: 'Campo requerido' }}
              placeholder={placeholders.description}
            />
          </div>
          <div
            key='categories-container'
            className='w-full'
          >
            <Categories
              id='categories'
              label='Categorías'
              error={errors.categories as FieldError}
              register={register}
              registerOptions={{ required: 'Campo requerido' }}
              setValue={(value: string[]) => setValue('categories', value)}
              clearError={() => clearErrors('categories')}
              placeholders={placeholders.categories}
            />
          </div>
          <div
            key='create-post-form-container-2'
            className=' w-full mb-4 flex gap-4'
          >
            <div
              key='location-select-container'
              className='basis-1/2'
            >
              <Select
                id='location'
                label='Ubicación'
                register={register}
                handleChange={handleLocationChange}
                options={l}
                placeholder={placeholders.location}
              />
            </div>
            <div
              key='center-select-container'
              className='basis-1/2'
            >
              <Select
                id='center'
                label='Centro'
                register={register}
                error={errors.center}
                registerOptions={{
                  required: (
                    watch('location') &&
                    !watch('center')
                  ) ? 'Campo requerido' : false
                }}
                options={centers}
                handleChange={handleCenterChange}
                placeholder={placeholders.center}
              />
            </div>
          </div>
          <button
            key='signup-form-submit-button'
            type={ButtonEnum.SUBMIT}
            disabled={loading}
            className='py-2 px-4 bg-rose-700 font-bold text-white hover:bg-rose-500 active:bg-rose-700'
          >
            Crear Publicación
          </button>
        </form>
      </section>
    </main>
  </RootLayout>
}
