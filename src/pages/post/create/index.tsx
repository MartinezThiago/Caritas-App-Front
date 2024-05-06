import type { NextApiRequest, NextApiResponse } from 'next'
import { productStatus, type GetSSPropsResult, type User } from '@/types'
import zlib from 'zlib';
import axios from 'axios'
import { centers as c, locations as l } from '@/utils/examples/locations'

import { ButtonEnum } from '@/components/types'
import { Categories, Input, Select, TextArea } from '@/components'
import { FRONT_BASE_URL } from '@/constants'
import { getUser } from '@/utils'
import { requirePermission } from '@/utils'
import { RootLayout } from '@/layouts'
import { FieldError, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
  categories: string[] // categorias
  photos: FileList | string[] // imagenes
  center: string // centros_elegidos
  status: string // estado_producto
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
  const _handleSubmit = async (formData: FormData) => {
    setLoaging(true)
    //console.log(formData);
    // Función para convertir un archivo a base64
    const makeB64 = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          resolve(result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    };

    // Función para procesar los archivos y convertirlos a base64
    const processFiles = async () => {
      const files = formData.photos as FileList;
      const photosPromises: Promise<string>[] = [];
      for (let i = 0; i < files.length; i++) {
        photosPromises.push(makeB64(files[i]));
      }
      const photos = await Promise.all(photosPromises);
      formData.photos = photos;

    };

    // Llamar a la función para procesar los archivos
    processFiles().then(async () => {
      console.log('previo a hacer la consulta');
      console.log(formData);
      await axios.post(`http://192.168.0.241:3000/api/post/create`, formData).then(() => router.push('/')).catch((error: any) => {try {alert(error.response.data.message)} catch (error) { alert('Ah ocurrido un error inesperado, intente nuevamente.')}setLoaging(false)})
    }).catch((error) => {
      console.error('Error al procesar las fotos:', error);
    });
  }

  return (
    <RootLayout user={user}>
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
            <div key='create-post-form-container-1' className='flex gap-4'>
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
                id='categories'
                label='Categorías'
                error={errors.categories as FieldError}
                register={register}
                registerOptions={{ required: 'Campo requerido' }}
                setValue={(value: string[]) => setValue('categories', value)}
                clearError={() => clearErrors('categories')}
              />
            </div>
            <div
              key='create-post-form-container-2'
              className=' w-full mb-4 flex gap-4'
            >
              <div key='location-select-container' className='basis-1/2'>
                <Select
                  id='location'
                  label='Ubicación'
                  register={register}
                  handleChange={handleLocationChange}
                  options={l}
                />
              </div>
              <div key='center-select-container' className='basis-1/2'>
                <Select
                  id='center'
                  label='Centro'
                  register={register}
                  error={errors.center}
                  registerOptions={{
                    required:
                      watch('location') && !watch('center')
                        ? 'Campo requerido'
                        : true
                  }}
                  options={centers}
                  handleChange={handleCenterChange}
                />
              </div>
            </div>
            <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-4'>
              <div
                key='status-select-container'
                className='w-full sm:basis-1/2'
              >
                <Select
                  id='status'
                  label='Estado'
                  register={register}
                  handleChange={handleLocationChange}
                  options={productStatus.map(status => ({
                    value: status,
                    label: status
                  }))}
                />
              </div>
              <div className='sm:basis-1/2 text-center'>
                <button
                  key='signup-form-submit-button'
                  type={ButtonEnum.SUBMIT}
                  disabled={loading}
                  className='text-white rounded-lg py-[12px] px-16  bg-rose-700 font-semibold hover:bg-rose-800 duration-100'
                >
                  Crear Publicación
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </RootLayout>
  )
}
