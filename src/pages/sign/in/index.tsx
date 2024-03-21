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
import { requireNoPermission } from '@/utils'
import { RootLayout } from '@/layouts'
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
  return requireNoPermission(getUser(req, res))
}

/**
 * The form data for the signin page.
 */
interface FormData {
  email: string
  password: string
}

/**
 * The link HTML elements to the signup and forgot password pages.
 */
const links = {
  signup: <Link
    key='link-from-signin-to-signup'
    href='/sign/up'
    className='underline'
  >
    Regístrese
  </Link>,
  forgotPassword: <Link
    key='link-forgot-password'
    href='/forgot-password'
    className='underline'
  >
    Recupérela
  </Link>
}

/**
 * The signin page.
 */
export default function Signin({ user }: { user: User }) {
  const [loading, setLoaging] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  /**
   * Calls the endpoint by sending it the form data
   * @arg {FormData} formData
   */
  const _handleSubmit = async (formData: FormData) => {
    setLoaging(true)
    await axios
      .post(`${FRONT_BASE_URL}sign/in`, formData)
      .then(() => redirect('/'))
      .catch((error: { response: { data: { message: string } } }) => {
        alert(error.response.data.message)
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
          className='w-[20rem] mb-4 p-2 flex flex-col justify-center items-center'
        >
          <Input
            key='email'
            id='email'
            label='Correo Electrónico'
            type='email'
            register={register}
            registerOptions={{ required: 'Campo requerido' }}
            error={errors.email}
          />
          <Input
            key='password'
            id='password'
            label='Contraseña'
            type='password'
            register={register}
            registerOptions={{ required: 'Campo requerido' }}
            error={errors.password}
          />
          <button
            key='signin-form-submit-button'
            type={ButtonEnum.SUBMIT}
            disabled={loading}
            className='py-2 px-4 bg-rose-700 font-bold text-white hover:bg-rose-500 active:bg-rose-700'
          >
            Iniciar Sesión
          </button>
        </form>
        <div
          key='links-container'
          className='text-center'
        >
          <p
            key='p-from-link-to-signup'
            className='mb-4 text-center'
          >
            Aún no se ha registrado? {links.signup}
          </p>
          <p
            key='p-forgot-password'
            className='text-center'
          >
            Ha olvidad su contraseña? {links.forgotPassword}
          </p>
        </div>
      </section>
    </main>
  </RootLayout>
}
