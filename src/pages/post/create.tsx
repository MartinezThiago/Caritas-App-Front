import type { NextApiRequest, NextApiResponse } from 'next'
import { productStatus, type GetSSPropsResult, type User } from '@/types'
import axios from 'axios'
import { centers as c } from '@/utils/examples/locations'

import { ButtonEnum } from '@/components/types'
import { Categories, Input, MultiSelect, Select, TextArea } from '@/components'
import { FRONT_BASE_URL } from '@/constants'
import { getUser } from '@/utils'
import { requirePermission } from '@/utils'
import { RootLayout } from '@/layouts'
import { FieldError, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import processFiles from '@/utils/img-files-to-b64'

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
  return requirePermission(getUser(req, res), 'usuario_basico', '/')
}

/**
 * The form data for the post creation.
 */
interface FormData {
  name: string // titulo
  location: string
  description: string // descripcion
  category: string // categorias
  photos: FileList | string[] // imagenes
  center: string // centros_elegidos
  status: string // estado_producto
  days: string[] // dias
  from: string // desde las hs. x
  to: string // hasta las hs. x
}

/**
 * The create post page.
 */
export default function CreatePost({ user }: { user: User }) {
  const router = useRouter()
  const [loading, setLoaging] = useState(false)
  const [centers, setCenters] = useState<any>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors
  } = useForm<FormData>()

  const handleCenterChange = (e: any) => {
    setValue('center', e.target.value)
    clearErrors('center')
  }

  const handleFromChange = (e: any) => {
    console.log('from', e.target.value)
    setValue('from', e.target.value)
    clearErrors('from')
  }

  const handleToChange = (e: any) => {
    console.log('to', e.target.value)
    setValue('to', e.target.value)
    clearErrors('to')
  }

  const handleStatusChange = (e: any) => {
    setValue('status', e.target.value)
    clearErrors('status')
  }

  /**
   * Calls the endpoint by sending it the form data
   * @arg {FormData} formData
   */
  const _handleSubmit = async (formData: FormData) => {
    setLoaging(true)

    console.log('DATA IMPRESA', formData)

    // const processPhotos = async () => {
    //   return formData.photos.map(() => {})
    // }
    processFiles(formData.photos as FileList).then(async (result: string[]) => {
      formData.photos=result
      await axios
        .post(`${FRONT_BASE_URL}post/create`, formData)
        .then(() => router.push('/'))
        .catch((error: any) => {
          try {
            alert(error.response.data.message)
          } catch (error) {
            alert('Ah ocurrido un error inesperado, intente nuevamente.')
          }
          setLoaging(false)
        })
    })
      .catch(() => {
        alert('Ah ocurrido un error inesperado, intente nuevamente.')
        setLoaging(false)
      })
  }

return (
  <RootLayout user={user}>
    <main className='flex-1 overflow-x-hidden overflow-y-auto'>
      <section
        key='signin-section'
        className='h-full flex flex-col justify-start items-center'
      >
        <form
          key='create-post-form'
          noValidate
          onSubmit={handleSubmit(_handleSubmit)}
          className='sm:w-[30rem] p-2 flex flex-col items-center justify-center'
        >
          <div
            key='create-post-form-container-1'
            className='w-full flex gap-4'
          >
            <div key='name-input-container' className='basis-1/2'>
              <Input
                id='name'
                label='Nombre'
                error={errors.name}
                register={register}
                registerOptions={{ required: 'Campo requerido' }}
                type='text'
                autoFocus={true}
              />
            </div>
            <div key='photos-input-container' className='basis-1/2'>
              <Input
                id='photos'
                label='Fotos'
                type='file'
                autoFocus={true}
                error={errors.photos as FieldError}
                register={register}
                registerOptions={{
                  required: 'Campo requerido',
                  validate: (value: FileList) => {
                    if (value.length > 0) {
                      let size = 0
                      for (let i = 0; i < value.length; i++)
                        size += value[i].size
                      if (size > 5000000) {
                        alert(
                          'El tamaño total de las fotos no puede superar los 5MB'
                        )
                        return false
                      }
                    } else {
                      alert(
                        'Por favor cargue al menos una foto para la publicación'
                      )
                      return false
                    }
                    return true
                  }
                }}
                props={{
                  multiple: true,
                  accept: 'image/*'
                }}
              />
            </div>
          </div>
          <div key='description-container' className='w-full'>
            <TextArea
              id='description'
              label='Descripción'
              error={errors.description}
              register={register}
              registerOptions={{ required: 'Campo requerido' }}
            />
          </div>
          <div key='categories-container' className='w-full'>
            <Categories
              id='category'
              label='Categorías'
              error={errors.category}
              register={register}
              registerOptions={{ required: 'Campo requerido' }}
              setValue={(value: string) => { console.log(value); setValue('category', value) }}
              clearError={() => clearErrors('category')}
            />
          </div>
          <div
            key='create-post-form-container-3'
            className='w-full flex flex-col justify-center items-start'
          >
            <Select
              id='center'
              label='Centro'
              register={register}
              error={errors.center}
              registerOptions={{
                required: watch('center') || 'Campo requerido'
              }}
              options={c}
              handleChange={handleCenterChange}
            />
          </div>
          <div
            key='create-post-form-container-2'
            className='w-full flex-col justify-center items-start'
          >
            <MultiSelect
              id='days'
              label='Días'
              register={register}
              registerOptions={{ required: 'Campo requerido' }}
              error={errors.days as FieldError}
              props={{
                isMulti: true,
                options: [
                  { value: 'lunes', label: 'Lunes' },
                  { value: 'miercoles', label: 'Miércoles' },
                  { value: 'martes', label: 'Martes' },
                  { value: 'jueves', label: 'Jueves' },
                  { value: 'viernes', label: 'Viernes' },
                  { value: 'sabado', label: 'Sábado' },
                  { value: 'domingo', label: 'Domingo' }
                ],
                setValue: setValue
              }}
            />
          </div>
          <div className='w-full flex justify-center items-center gap-4'>
            <div className='flex flex-col basis-1/2 max-w-[50%]'>
              <Select
                id='from'
                label='Desde las'
                register={register}
                error={errors.from}
                registerOptions={{
                  required: watch('from') || 'Campo requerido'
                }}
                options={[...Array(24).keys()].map(hour => ({
                  value: hour.toString(),
                  label: `${hour}:00`
                }))}
                handleChange={handleFromChange}
              />
            </div>
            <div className='basis-1/2 max-w-[50%]'>
              <Select
                id='to'
                label='Hasta las'
                register={register}
                error={errors.to}
                registerOptions={{
                  required: watch('to') || 'Campo requerido'
                }}
                options={[...Array(24).keys()].map(hour => ({
                  value: hour.toString(),
                  label: `${hour}:00`
                }))}
                handleChange={handleToChange}
              />
            </div>
          </div>
          <div className='w-full flex flex-col justify-center items-start'>
            <Select
              id='status'
              label='Estado'
              register={register}
              handleChange={handleStatusChange}
              options={productStatus.map(status => ({
                value: status,
                label: status
              }))}
            />
          </div>
          <Button
            key='signup-form-submit-button'
            type={ButtonEnum.SUBMIT}
            disabled={loading}
            className='appearance-none w-full max-w-48 text-white rounded-lg bg-rose-700 font-semibold hover:bg-rose-800 duration-100'
          >
            {loading ? (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              'Crear Publicación'
            )}
          </Button>
        </form>
      </section>
    </main>
  </RootLayout>
)
}
