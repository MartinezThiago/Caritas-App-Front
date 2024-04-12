import type {
  NextApiRequest,
  NextApiResponse
} from 'next'

import axios from 'axios'
import Link from 'next/link'

import { ButtonEnum } from '@/components/types'
import { FRONT_BASE_URL } from '@/constants'
import {
  GetSSPropsResult,
  User
} from '@/types'
import { getUser } from '@/utils'
import { Input } from '@/components'
import { redirect } from 'next/navigation'
import { requirePermission } from '@/utils'
import { RootLayout } from '@/layouts'
import { subYears } from 'date-fns'
import { useForm } from 'react-hook-form'
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
  return requirePermission(getUser(req, res))
}

/**
 * The form data for the signup page.
 */
interface FormData extends Omit<User, 'role' | 'center'> {
  password: string
  passwordConfirmation: string
}

/**
 * The signup page.
 */
export default function Signup({ user }: { user: User }) {
  const [loading, setLoaging] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<FormData>()

  /**
   * Calls the endpoint by sending it the form data
   * @arg {FormData} formData
   */
  const _handleSubmit = async (formData: FormData) => {
    setLoaging(true)
    await axios
      .post(`${FRONT_BASE_URL}sign/up`, formData)
      .then(() => redirect('/'))
      .catch((error: any) => {
        try {
          alert(error.response.data.message)
        } catch (error) {
          alert('Ah ocurrido un error inesperado, intente nuevamente.')
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
          key='signin-form'
          noValidate
          onSubmit={handleSubmit(_handleSubmit)}
          className='mb-4 p-2 flex flex-col items-center justify-center'
        >
          <div
            key='input-grid-container'
            className='grid grid-cols-2 gap-2'
          >
            <div
              key='col-1'
              className=''
            >
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
                  validate: (value) => {
                    return (
                      new Date(value) <= subYears(new Date(), 18)
                    ) || 'Requerido ser mayor de edad.'
                  }
                }}
                error={errors.birthdate}
              />
            </div>
            <div
              key='col-2'
              className=''
            >
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
                  validate: (value) =>
                    value === watch('password') || 'Las contraseñas no coinciden'
                }}
                error={errors.passwordConfirmation}
              />
            </div>
          </div>
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
                message: 'Email inválido',
              }
            }}
            error={errors.email}
          />
          <button
            key='signup-form-submit-button'
            type={ButtonEnum.SUBMIT}
            disabled={loading}
            className='py-2 px-4 bg-rose-700 font-bold text-white hover:bg-rose-500 active:bg-rose-700'
          >
            Registrarse
          </button>
        </form>
        <div
          key='links-container'
          className='text-center'
        >
          <p
            key='p-from-link-to-signup'
            className='text-center'
          >
            Ya se ha registrado? <Link
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
}
