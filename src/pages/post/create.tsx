import { Button } from '@/components/ui/button'
import { ButtonEnum } from '@/components/types'
import { Categories, Input, MultiSelect, Select, TextArea } from '@/components'
import { FieldError, useForm } from 'react-hook-form'
import { FRONT_BASE_URL } from '@/constants'
import { getUser, makeHoursList } from '@/utils'
import { Item } from '@/utils'
import { Loader2 } from 'lucide-react'
import { requirePermission } from '@/utils'
import { RootLayout } from '@/layouts'
import { type GetSSPropsResult, type User, productStatus } from '@/types'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import processFiles from '@/utils/img-files-to-b64'

import type { NextApiRequest, NextApiResponse } from 'next'

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
  status: string // estado_producto
  centers: string[] // centros_elegidos
  days: Record<string | number, string[]> // dias_elegidos
  from: Record<string | number, string> // desde
  to: Record<string | number, string> // hasta
}

interface CenterData {
  nombre_centro: string
  direccion: string
  ubicacion: File
  dias: string[]
  id_centro: number
  tiene_voluntario:boolean
  borrado:boolean
}

/**
 * The create post page.
 */
export default function CreatePost({ user }: { user: User }) {
  const router = useRouter()
  const [loading, setLoaging] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors
  } = useForm<FormData>()

  const [centers, setCenters] = useState<Item[]>([])

  //ARRAY DE CENTROS DEPENDIENDO LA LOCALIDAD ELEGIDA
  const [locationCenters, setLocationCenters] = useState<Item[]>([])

  //ARRAY DE LOCALIDADES DE LOS CENTROS TRAIDOS
  const [locations, setLocations] = useState<Item[]>([])

  const [raw, setRaw] = useState<
    Array<{
      id_centro: number
      nombre_centro: string
      ubicacion: string
      direccion: string
      horario_apertura: string
      horario_cierre: string
      dias: Array<{
        idDia: number
        descripcion: string
      }>
    }>
  >([])

  useEffect(() => {
    const centrosMuyAux: Item[] = []
    const locationsMuyAux: Item[] = []
    const getCenters = async () => {
      await axios.get(`${FRONT_BASE_URL}centers/get`).then(async (res: any) => {
        setRaw(res.data)
        //console.log(res.data);

        await axios
          .get(`${FRONT_BASE_URL}centers-user/get`)
          .then((res2: any) => {
            res.data.map((e: CenterData) => {
              // si es el centro elegido metele la estrellita

              if ( e.borrado==false && e.tiene_voluntario==true) {
                const isSelected = res2.data.find(
                  (c: any) => c.id_centro === e.id_centro
                )
                centrosMuyAux.push({
                  value: `${e.id_centro}`,
                  label: `${isSelected ? '✰ ' : ''}${e.ubicacion} - ${e.direccion
                    } - ${e.nombre_centro}`
                })
                locationsMuyAux.push({
                  value: `${e.ubicacion}`,
                  label: `${isSelected ? '✰ ' : ''}${e.ubicacion}`
                })
              }
            })
          })
          .catch(() => {

          })
      })

      //Elimina duplicados de las localidades
      const eliminarDuplicados = async (arr: Item[]) => {
        return arr.filter((item, index) => {
          return arr.findIndex(i => i.value === item.value) === index
        })
      }
      setLocations(await eliminarDuplicados(locationsMuyAux))
    }
    getCenters()
    setCenters(centrosMuyAux)
  }, [])

  const handleStatusChange = (e: any) => {
    setValue('status', e.target.value)
    clearErrors('status')
  }

  const setLocationValue = (id: any, value: any) => {
    clearCentersOnLocationChange()
    setLocationCenters(() => {
      return centers.filter(i =>
        i.label.toLowerCase().includes(value.toLowerCase())
      )
    })
    setValue(id, value)
    clearErrors(id)
    setValue('days', {})
    setValue('from', {})
    setValue('to', {})
    setValue('centers', [])
  }

  const handleCenterChange = (id: any, value: any) => {
    let trueValue: any[] = []
    value.forEach((v: any) => {
      raw.forEach((r: any, index: number) => {
        if (r.id_centro === Number(v)) {
          trueValue = [...trueValue, r.id_centro]
        }
      })
    })
    setValue(id, trueValue)
    clearErrors(id)

    if (trueValue.length > 3) {
      alert('Maximo 3 centros')
    }
  }

  const setTimeValue = (id: any, value: any, timeType: any) => {
    let time: Record<string | number, string[] | string> | undefined =
      watch(timeType) || {}
    time![id] = value
    setValue(timeType, time)
    clearErrors(timeType)

  }

  const clearCentersOnLocationChange = () => {
    setValue('centers', [])
  }

  /**
   * Calls the endpoint by sending it the form data
   * @arg {FormData} formData
   */
  const _handleSubmit = async (formData: FormData) => {
    setLoaging(true)

    if (((watch('status') !== 'Nuevo') && (watch('status') !== 'Usado'))) {
      alert('El estado del producto debe ser Nuevo o Usado')
      setLoaging(false)
      return
    }

    // completar todos los desde y hasta
    if (Object.keys(watch('to')).length !== Object.keys(watch('from')).length) {
      alert('Por favor complete todos los rangos horarios por centro')
      setLoaging(false)
      return
    }

    // completar los dias
    if (Object.keys(watch('days')).length !== watch('centers').length) {
      alert('Por favor ingrese días por centro')
      setLoaging(false)
      return
    }

    if (formData.photos.length > 4) {
      alert('No se pueden subir más de 4 fotos por publicación')
      setLoaging(false)
      return
    }



    if (formData.centers.length > 3) {
      alert('No se pueden seleccionar más de 3 centros')
      return
    }

    processFiles(formData.photos as FileList)
      .then(async (result: string[]) => {
        formData.photos = result
        await axios
          .post(`${FRONT_BASE_URL}post/create`, formData)
          .then(() => {
            alert('Publicacion creada exitosamente')
            router.push('/')
          })
          .catch((error: any) => {
            try {
              alert(error.response.data.message)
            } catch (error) {
              alert('Ha ocurrido un error inesperado, intente nuevamente.')
            }
            setLoaging(false)
          })
      })
      .catch(() => {
        alert('Ha ocurrido un error inesperado, intente nuevamente.')
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
                      if (value.length > 0 && value.length < 5) {
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
                        alert('Por favor cargue entre 1 a 4 fotos')
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
                setValue={(value: string) => {
                  setValue('category', value)
                }}
                clearError={() => clearErrors('category')}
              />
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
            <div
              key='create-post-form-container-3'
              className='w-full flex flex-col justify-center items-start'
            >
              <MultiSelect
                id='location'
                label='Localidad'
                register={register}
                error={errors.location}
                registerOptions={{
                  required: watch('location') || 'Campo requerido'
                }}
                props={{
                  isMulti: false,
                  options: locations,
                  setValue: setLocationValue
                }}
              />
            </div>
            <div
              key='create-post-form-container-4'
              className='w-full flex flex-col justify-center items-start'
              hidden={!watch('location')}
            >
              <MultiSelect
                id='centers'
                label='Centros (máximo 3)'
                register={register}
                error={errors.centers as FieldError}
                registerOptions={{
                  required: !!watch('centers') || 'Campo requerido',
                  validate: (value: string[]) => {

                    if (value === null || value === undefined) {
                      return true
                    }
                    return value.length <= 3 || 'Maximo 3 centros'
                  }
                }}
                props={{
                  isMulti: true,
                  options: locationCenters,
                  setValue: handleCenterChange
                }}
              />
            </div>
            {!!watch('centers') &&
              watch('centers').map((center: string, index: number) => {
                const hoursList = makeHoursList(raw, center)
                for (let index = 0; index < raw.length; index++) {
                  if (raw[index].id_centro === parseInt(center)) {
                    center = index.toString()
                  }
                }
                const title = `${raw[Number(center)].ubicacion} - ${raw[Number(center)].direccion
                  }`
                return (
                  <>
                    <p
                      key={`description-${index}`}
                      className='w-full border-b border-primary text-sm font-bold'
                    >
                      {title}
                    </p>
                    <div
                      key='create-post-form-container-2'
                      className='w-full flex-col justify-center items-start'
                    >
                      <MultiSelect
                        id='days'
                        label='Días'
                        register={register}
                        registerOptions={{
                          required:
                            !!watch('centers')[index] || 'Campo requerido'
                        }}
                        error={errors.days as unknown as FieldError}
                        props={{
                          isMulti: true,
                          options: raw[Number(center)].dias.map(dia => ({
                            label: dia.descripcion,
                            value: dia.idDia
                          })),
                          setValue: (id: any, value: any) =>
                            setTimeValue(index, value, 'days')
                        }}
                      />
                    </div>
                    <div className='w-full flex justify-center items-center gap-4'>
                      <div className='flex flex-col basis-1/2 max-w-[50%]'>
                        <MultiSelect
                          id='from'
                          label='Desde las'
                          register={register}
                          error={errors.days as unknown as FieldError}
                          registerOptions={{
                            required:
                              !!watch('centers')[index] || 'Campo requerido',
                            validate: () => {
                              const from = Number(watch('from')[index])
                              const to = Number(watch('to')[index])
                              if (to < from) {
                                return 'La hora de inicio no puede ser mayor a la hora de fin'
                              }
                              return (
                                String(from) !== 'Seleccione un horario' ||
                                'Campo requerido'
                              )
                            }
                          }}
                          props={{
                            isMulti: false,
                            options: hoursList,
                            setValue: (id: any, value: any) =>
                              setTimeValue(index, value, 'from')
                          }}
                        />
                      </div>
                      <div className='basis-1/2 max-w-[50%]'>
                        <MultiSelect
                          id='to'
                          label='Hasta las'
                          register={register}
                          error={errors.to as unknown as FieldError}
                          registerOptions={{
                            required:
                              !!watch('centers')[index] || 'Campo requerido',
                            validate: () => {
                              const from = Number(watch('from')[index])
                              const to = Number(watch('to')[index])
                              if (from > to) {
                                alert(
                                  'La hora de fin no puede ser menor a la hora de inicio'
                                )
                                return false
                              }
                              return (
                                String(to) !== 'Seleccione un horario' ||
                                'Campo requerido'
                              )
                            }
                          }}
                          props={{
                            isMulti: false,
                            options: hoursList,
                            setValue: (id: any, value: any) =>
                              setTimeValue(index, value, 'to')
                          }}
                        />
                      </div>
                    </div>
                  </>
                )
              })}
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