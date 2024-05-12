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

const formSchema = z
  .object({
    newPassword: z.string().min(6, 'Mínimo 6 caracteres'),
    newPasswordConfirmation: z.string().min(6, 'Mínimo 6 caracteres')
  })
  .refine(data => data.newPassword === data.newPasswordConfirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['newPasswordConfirmation']
  })

const Send: NextPage<any> = props => {
  console.log(props)
  const [loading, setLoaging] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: '',
      newPasswordConfirmation: ''
    }
  })

  async function onSubmit (values: z.infer<typeof formSchema>) {
    setLoaging(true)
    console.log(values)
    await axios
      .post(`${FRONT_BASE_URL}forgot-password`, values)
      .then(() => {
        alert('Contraseña recuperada.')
        router.push('sign/in')
      })
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
    <RootLayout user={props.user}>
      <main className='size-full flex justify-center items-center'>
        <section className='w-full max-w-sm'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=''>
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                      <Input {...field} className='!placeholder-zinc-400' />
                    </FormControl>
                    <div className='w-full h-5 text-left'>
                      <FormMessage className='text-red-500 text-xs italic' />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='newPasswordConfirmation'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme la nueva contraseña</FormLabel>
                    <FormControl>
                      <Input {...field} className='!placeholder-zinc-400' />
                    </FormControl>
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
                  className='appearance-none py-2 px-4 bg-rose-700 font-bold text-white hover:bg-rose-500 active:bg-rose-700'
                >
                  {loading ? (
                    <Loader2 className='h-4 w-4 animate-spin' />
                  ) : (
                    'Cambiar contraseña'
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

export default Send
