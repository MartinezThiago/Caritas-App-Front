import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { RootLayout } from '@/layouts'
import { GetSSPropsResult, User } from '@/types'
import { getUser, requirePermission } from '@/utils'
import { NextApiRequest, NextApiResponse, NextPage } from 'next'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/router'
import { ButtonEnum } from '@/components/types'
import { FRONT_BASE_URL } from '@/constants'

import { useState } from 'react'
import axios from 'axios'

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

const PasswordRecovery: NextPage<{ user: User }> = ({ user }) => {
  const [loading, setLoaging] = useState(false)
  const router = useRouter()

  const formSchema = z.object({
    email: z.string().email('Email inválido')
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  async function onSubmit (values: z.infer<typeof formSchema>) {
    setLoaging(true)
    console.log(values)
    await axios
      .post(`${FRONT_BASE_URL}forgot-password`, values)
      .then(() => {
        alert(
          'Si el correo especificado pertenece al sistema, se le enviaron las instrucciones para recuperar su contraseña.'
        )
        router.push('sign/in')
      })
      .catch((error: any) => {
        try {
          alert(
            'Si el correo especificado pertenece al sistema, se le enviaron las instrucciones para recuperar su contraseña.'
          )
          router.push('sign/in')
        } catch (error) {
          alert(
            'Si el correo especificado pertenece al sistema, se le enviaron las instrucciones para recuperar su contraseña.'
          )
          router.push('sign/in')
        }
        setLoaging(false)
      })
  }

  return (
    <RootLayout user={user}>
      <main className='size-full flex justify-center items-center'>
        <section className='w-full max-w-sm'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=''>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='john.doe@email.com'
                        className='!placeholder-zinc-400'
                      />
                    </FormControl>
                    <FormDescription>
                      Recuperación de contraseña
                    </FormDescription>
                    <div className='w-full h-5 text-left'>
                      <FormMessage className='text-red-500 text-xs italic' />
                    </div>
                  </FormItem>
                )}
              />
              <div className='w-full text-center'>
                <Button
                  type={ButtonEnum.SUBMIT}
                  disabled={loading}
                  className='appearance-none py-2 px-8 font-semibold outline-transparent outline bg-rose-700 hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 text-white active:text-white active:bg-rose-700'
                >
                  {loading ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    'Enviar'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </section>
      </main>
    </RootLayout>
  )
}

export default PasswordRecovery
