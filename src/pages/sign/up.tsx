import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'
import Link from 'next/link'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ButtonEnum } from '@/components/types'
import { FRONT_BASE_URL } from '@/constants'
import { GetSSPropsResult, User } from '@/types'
import { getUser, requirePermission } from '@/utils'
import { Input, MultiSelect, Select } from '@/components'
import { RootLayout } from '@/layouts'
import { subYears } from 'date-fns'
import { FieldError, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import processFiles from '@/utils/img-files-to-b64'
import { Item } from '@/utils/examples/locations'

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
  return requirePermission(getUser(req, res))
}

interface CenterData {
  nombre_centro: string
  direccion: string
  ubicacion: File
  dias: string[]
  id_centro: number
}
/**
 * The form data for the signup page.
 */
interface FormData extends Omit<User, 'role'> {
  password: string
  passwordConfirmation: string
  photo: FileList | string[]
  centers: string[]
  location: string
}

/**
 * The signup page.
 */
export default function Signup({ user }: { user: User }) {
  // const centrosMuyAux: any[] = []
  const [centers, setCenters] = useState<Item[]>([])
  const [locationsCentersUltimo, setLocationsCentersUltimo] = useState<Item[]>([])
  const [auxCentersOnLocations, setAuxCentersOnLocations] = useState<Item[]>([])
  useEffect(() => {
    const centrosMuyAux: Item[] = []
    const locationsMuyAux: Item[] = []
    const getCenters = async () => {
      await axios
        .get(`${FRONT_BASE_URL}centers/get`)
        .then((res: any) => {
          res.data.map((e: CenterData) => {
            centrosMuyAux.push({
              value: `${e.id_centro}`,
              label: `${e.ubicacion} - ${e.direccion} - ${e.nombre_centro}`
            })
            locationsMuyAux.push({
              value: `${e.ubicacion}`,
              label: `${e.ubicacion}`
            })
          })
        })
      //Elimina duplicados de las localidades
      const eliminarDuplicados = async (arr: Item[]) => {
        return arr.filter((item, index) => {
          return arr.findIndex((i) => i.value === item.value) === index;
        });
      };
      setLocationsCentersUltimo(await eliminarDuplicados(locationsMuyAux))
    }
    getCenters()
    setCenters(centrosMuyAux)
  }, [])
  const [loading, setLoaging] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<FormData>()
  /**
   * Calls the endpoint by sending it the form data
   * @arg {FormData} formData
   */
  const _handleSubmit = (formData: FormData) => {
    setLoaging(true)
    console.log(formData);
    processFiles(formData.photo as FileList).then(async (result: string[]) => {
      formData.photo = result
      await axios
        .post(`${FRONT_BASE_URL}sign/up`, formData)
        .then(() => router.push('/sign/in'))
        .catch((error: any) => {
          try {
            alert('El correo electronico ya esta registrado en el sistema')
          } catch (error) {
            alert('El correo electronico ya esta registrado en el sistema')
          }
          setLoaging(false)
        })
    })
  }
  const handleLocationChange = (e: any) => {
    //Carga en auxCentersOnLocations, los centros de la localidad elegida en el primer centro
    setAuxCentersOnLocations(() => {
      return centers.filter((i) => i.label.toLowerCase().includes(e.target.value.toLowerCase()))
    })

    setValue('location', e.target.value)
    //clearErrors('location')
  }
  return (
    <RootLayout user={user}>
      <main className='flex-1 py-[.1rem] overflow-auto'>
        <section
          key='signin-section'
          className='size-full overflow-auto flex flex-col justify-start sm:justify-center items-center gap-4'
        >
          <form
            key='signin-form'
            noValidate
            onSubmit={handleSubmit(_handleSubmit)}
            className='p-2 flex flex-col items-center justify-center'
          >
            <div
              key='input-grid-container'
              className='grid grid-cols-1 sm:grid-cols-2 gap-2'
            >
              <div key='col-1' className=''>
                <Input
                  key='name'
                  id='name'
                  label='Nombres'
                  type='text'
                  register={register}
                  registerOptions={{ required: 'Campo requerido' }}
                  error={errors.name}
                />
                <Input
                  key='surname'
                  id='surname'
                  label='Apellidos'
                  type='text'
                  register={register}
                  registerOptions={{ required: 'Campo requerido' }}
                  error={errors.surname}
                />
                <Input
                  key='birthdate'
                  id='birthdate'
                  label='Fecha de nacimiento'
                  type='date'
                  register={register}
                  registerOptions={{
                    required: 'Campo requerido',
                    validate: value => {
                      return (
                        new Date(value) <= subYears(new Date(), 18) ||
                        'Requerido ser mayor de edad.'
                      )
                    }
                  }}
                  error={errors.birthdate}
                />
                <Input
                  key='email'
                  id='email'
                  label='Correo Electrónico'
                  type='email'
                  register={register}
                  registerOptions={{
                    required: 'Campo requerido',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Email inválido'
                    }
                  }}
                  error={errors.email}
                />
              </div>
              <div key='col-2' className=''>
                <Input
                  key='dni'
                  id='dni'
                  label='DNI'
                  type='number'
                  register={register}
                  registerOptions={{
                    required: 'Campo requerido',
                    pattern: {
                      value: /^.{7,8}$/,
                      message: 'DNI inválido.'
                    }
                  }}
                  error={errors.dni}
                />
                <Input
                  key='password'
                  id='password'
                  label='Contraseña'
                  type='password'
                  register={register}
                  registerOptions={{
                    required: 'Campo requerido',
                    pattern: {
                      value: /^.{6,}$/,
                      message: 'Mínimo 6 caracteres.'
                    }
                  }}
                  error={errors.password}
                />
                <Input
                  key='passwordConfirmation'
                  id='passwordConfirmation'
                  label='Confirmación de contraseña'
                  type='password'
                  register={register}
                  registerOptions={{
                    required: 'Campo requerido',
                    validate: value =>
                      value === watch('password') ||
                      'Las contraseñas no coinciden'
                  }}
                  error={errors.passwordConfirmation}
                />
                <Input
                  id='photo'
                  label='Foto de perfil'
                  type='file'
                  autoFocus={true}
                  error={errors.photo as FieldError}
                  register={register}
                  registerOptions={{
                    validate: (value: FileList) => {
                      if ((value === undefined) || (value === null)) {
                        return true
                      }
                      if (value.length === 0) {
                        return true
                      }
                      return value[0].size <= 3000000 || 'La foto no puede superar los 3MB.'
                    }
                  }}
                  className='hover:cursor-pointer'
                  props={{
                    multiple: false,
                    accept: 'image/*'
                  }}
                />
              </div>
            </div>
            <div
              key='create-post-form-container-3'
              className='w-full flex flex-col justify-center items-start'
            >
              <Select
                id='location'
                label='Localidad'
                register={register}
                error={errors.location}
                registerOptions={{
                  required: watch('location') || 'Campo requerido'
                }}
                options={locationsCentersUltimo}
                handleChange={handleLocationChange}
              />
            </div>
            <div
              className='w-full flex flex-col flex-nowrap whitespace-nowrap justify-center items-start'
              hidden={!watch('location')}
            >
              <MultiSelect
                key='center-selector'
                id='centers'
                label={
                  <>
                    Centro/s
                    <span className='opacity-35'> (mínimo 1, máximo 3)</span>
                  </>
                }
                register={register}
                error={errors.centers as FieldError}
                registerOptions={{
                  required: 'Campo requerido',
                  validate: (value: string[]) =>
                    value.length <= 3 || 'Debe seleccionar entre 1 a 3 centros'
                }}
                className='w-full'
                props={{
                  options: auxCentersOnLocations,
                  isMulti: true,
                  setValue: setValue
                }}
              />
            </div>
            <Button
              key='signup-form-submit-button'
              type={ButtonEnum.SUBMIT}
              disabled={loading}
              className='appearance-none py-2 px-6 font-semibold outline-transparent outline bg-rose-700 hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 text-white active:text-white active:bg-rose-700'
            >
              {loading ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                'Registrarse'
              )}
            </Button>
          </form>
          <div key='links-container' className='text-center pb-4'>
            <p key='p-from-link-to-signup' className='text-center'>
              Ya se ha registrado?{' '}
              <Link
                key='link-from-signup-to-signin'
                href='/sign/in'
                className='underline'
              >
                Inicie Sesión
              </Link>
            </p>
          </div>
        </section>
      </main>
    </RootLayout>
  )
}
