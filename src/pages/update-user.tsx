import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'
import Link from 'next/link'

import { ButtonEnum } from '@/components/types'
import { FRONT_BASE_URL } from '@/constants'
import { GetSSPropsResult, User } from '@/types'
import { getUser, requirePermission, centers, Center } from '@/utils'
import { Input, MultiSelect } from '@/components'
import { RootLayout } from '@/layouts'
import { subYears } from 'date-fns'
import { FieldError, useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/router'

const options = [
  { value: 'fox', label: '🦊 Fox' },
  { value: 'Butterfly', label: '🦋 Butterfly' },
  { value: 'Honeybee', label: '🐝 Honeybee' }
]

/**
 * Gets the user from the request and response objects in the server side and pass it
 * to the page component.
 */
export async function getServerSideProps ({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<GetSSPropsResult> {
  return requirePermission(getUser(req, res))
}

/**
 * The form data for the signup page.
 */
interface FormData extends Omit<User, 'role'> {
  password: string
  passwordConfirmation: string
  photo: File
  centers: string[]
}

/**
 * The signup page.
 */
export default function Signup ({ user }: { user: User }) {
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
  const _handleSubmit = async (formData: FormData) => {
    setLoaging(true)
    await axios
      .post(`${FRONT_BASE_URL}sign/up`, formData)
      .then(() => router.push('/'))
      .catch((error: any) => {
        try {
          alert(error.response.data.message)
        } catch (error) {
          alert('Ah ocurrido un error inesperado, intente nuevamente.')
        }
        setLoaging(false)
      })
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
                    required: 'Campo requerido',
                    validate: (value: FileList) =>
                      value[0].size <= 3000000 ||
                      'La foto no puede superar los 3MB.'
                  }}
                  className='hover:cursor-pointer'
                  props={{
                    multiple: false,
                    accept: 'image/*'
                  }}
                />
              </div>
            </div>
            <div className='w-full flex flex-col flex-nowrap whitespace-nowrap justify-center items-start'>
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
                  options: centers,
                  isMulti: true,
                  setValue: setValue
                }}
              />
            </div>
            <button
              key='signup-form-submit-button'
              type={ButtonEnum.SUBMIT}
              disabled={loading}
              className='py-2 px-4 bg-rose-700 font-bold text-white hover:bg-rose-500 active:bg-rose-700'
            >
              Guardar
            </button>
          </form>
        </section>
      </main>
    </RootLayout>
  )
}
