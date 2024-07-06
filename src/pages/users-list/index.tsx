import { Input as InputBday } from '@/components'
import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { FRONT_BASE_URL, defaultPhoto } from '@/constants'
import RootLayout from '@/layouts/root-layout'
import { cn } from '@/lib/utils'
import { GetSSPropsResult, User } from '@/types'
import { getUser } from '@/utils'
import { requireNothing } from '@/utils/permissions'
import axios from 'axios'
import { subYears } from 'date-fns'
import { FileCheck, FileMinus, FilePenLine, FilePlus, X } from 'lucide-react'
import { NextApiRequest, NextApiResponse } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  DetailedHTMLProps,
  Fragment,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  useForm
} from 'react-hook-form'
import Select from 'react-select'
import { CenterInfo } from '../center-list'

export async function getServerSideProps ({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res))
}

export interface UserInfo {
  foto: string
  nombre: string
  apellido: string
  dni: string
  mail: string
  fechaNacimiento: string
  registradoDesde: string
  center: string
  rol: string
}

const file2b64 = (file: File, setBase64: (file: string) => void): string => {
  let b64 = ''
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    b64 = reader.result as string
    console.log('al menos llega y esto es file', file, 'y esto es b64', b64)
    setBase64(b64)
  }
  reader.onerror = () => alert('Error al cargar la imagen')
  return b64
}

const Input = ({
  id,
  register,
  registerOptions,
  watch,
  setValue,
  alter,
  classNames,
  props
}: {
  id: keyof UserInfo
  register: UseFormRegister<UserInfo>
  registerOptions: RegisterOptions
  watch?: (id: keyof UserInfo) => string
  setValue?: (id: keyof UserInfo, value: string) => void
  alter?: number
  classNames?: {
    td?: string
    input?: string
  }
  props?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}): React.ReactNode => {
  useEffect(() => {
    setValue && setValue(id, props?.placeholder || '')
  }, [alter])

  return (
    <td className={cn('relative px-1 border border-gray-300', classNames?.td)}>
      <div>
        <span className='absolute right-3 text-red-500 text-sm'>*</span>
        <input
          {...register(id, registerOptions)}
          className={cn(
            'w-full min-h-10 px-2 border-b border-gray-300',
            classNames?.input
          )}
          {...props}
        />
      </div>
    </td>
  )
}

const InputFile = ({
  id,
  register,
  registerOptions,
  watch,
  setValue,
  alter,
  classNames,
  props
}: {
  id: keyof UserInfo
  register: UseFormRegister<UserInfo>
  registerOptions: RegisterOptions
  watch?: (id: keyof UserInfo) => string
  setValue?: (id: keyof UserInfo, value: string) => void
  alter?: number
  classNames?: {
    td?: string
    input?: string
  }
  props?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}): React.ReactNode => {
  const [base64, setBase64] = useState<string>('')
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof props?.placeholder === 'string' && props?.placeholder !== '') {
      setBase64(props?.placeholder as string)
      setValue && setValue(id, props?.placeholder as string)
    }
  }, [props?.placeholder])

  useEffect(() => {
    if (
      watch &&
      watch('foto') &&
      watch('foto').length > 0 &&
      typeof watch('foto') !== 'string'
    ) {
      console.log('ESTO ENTONCES ES TRUE', watch('foto'))
      file2b64((watch('foto') as unknown as FileList)[0], setBase64)
    }
  }, [watch && watch('foto')])

  return (
    <td className={cn('relative p-1 border border-gray-300', classNames?.td)}>
      <div>
        <span className='absolute right-3 text-red-500 text-sm'>*</span>
        {base64 ? (
          <div className='size-full flex justify-center items-center'>
            <Image
              src={base64}
              alt=''
              width={0}
              height={0}
              className='size-11 rounded-full object-cover'
            />
          </div>
        ) : (
          'Foto'
        )}
        <input
          type='file'
          accept='image/*'
          {...register(id, registerOptions)}
          className={cn('w-full', classNames?.input)}
          {...props}
        />
      </div>
    </td>
  )
}

type Role = 'voluntario' | 'admin_centro' | 'usuario_basico'
const roleOptions: Array<{ value: Role; label: string }> = [
  { value: 'voluntario', label: 'Voluntario' },
  { value: 'admin_centro', label: 'Administrador' },
  { value: 'usuario_basico', label: 'Básico' }
]

const getCenterDescription = (center?: CenterInfo) => {
  if (!center) return 'Sin asignar'
  return `${center.ubicacion} - ${center.direccion} - ${center.nombre_centro}`
}

export default function UsersSistemList ({ user }: { user: User }) {
  const router = useRouter()
  const [userRaw, setUserRaw] = useState([])
  const [centers, setCenters] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [submiting, setSubmiting] = useState(false)
  const [modifying, setModifying] = useState(-1)
  const [rolChecked, setRolChecked] = useState<Role | 'Todos'>('Todos')
  const rolesOrder = ['administrador', 'voluntario', 'basico']

  const {
    register: postRegister,
    handleSubmit: handlePostSubmit,
    watch: postWatch,
    setValue: setPostValue,
    reset: postReset,
    formState: { errors: postErrors }
  } = useForm<UserInfo>()
  const {
    register: patchRegister,
    handleSubmit: handlePatchSubmit,
    watch: patchWatch,
    setValue: setPatchValue,
    reset: patchReset,
    formState: { errors: patchErrors }
  } = useForm<UserInfo>()

  useEffect(() => {
    const getUserList = async () => {
      await axios
        .get<any[]>(`${FRONT_BASE_URL}/users-list`)
        .then(async (res: any) => {
          setUserRaw(res.data)
        })
        .catch((err: any) => {
          setUserRaw([])
        })
    }
    getUserList()

    const getCenterList = async () => {
      await axios
        .get<any[]>(`${FRONT_BASE_URL}/centers/get`)
        .then(async (res: any) => {
          setCenters(res.data)
        })
        .catch((err: any) => {
          setCenters([])
        })
    }
    getCenterList()
  }, [])

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false) // Cambia isLoading a false después de 2 segundos
    }, 400)
  }, [])
  const handleChange = (event: any) => {
    setRolChecked(event.target.value)
  }

  const onPostSubmit = (formData: UserInfo) => {
    setSubmiting(true)
    // VALIDACIONES ...
    setTimeout(() => {
      alert('Usuario creado correctamente')
      setSubmiting(false)
      patchReset()
    }, 1000)
    return
    axios
      .post(`${FRONT_BASE_URL}users/post`, formData)
      .then(() => {
        alert('Usuario agregado correctamente')
        // ACTUALIZAR LA LISTA DE USUARIOS CON LA LISTA DE USUARIOS DEVUELTA POR EL ENDPOINT DEL BACK PARA QUE SE RENDERICE EL NUEVO USUARIO
        setSubmiting(false)
        postReset()
      })
      .catch(() => {
        alert('Ha ocurrido un error al agregar al usuario')
        setSubmiting(false)
      })
  }

  const onPatchSubmit = (formData: UserInfo) => {
    setSubmiting(true)
    // VALIDACIONES...
    setTimeout(() => {
      alert('Usuario modificado correctamente')
      setSubmiting(false)
      patchReset()
    }, 1000)
    return
    axios
      .patch(`${FRONT_BASE_URL}centers/patch`, formData)
      .then(() => {
        alert('Centro agregado correctamente')
        // ACTUALIZAR LA LISTA DE CENTROS CON LA LISTA DE CENTROS DEVUELTA POR EL ENDPOINT DEL BACK PARA QUE SE RENDERICE EL CENTROVICK MODIFICADO
        setSubmiting(false)
        patchReset()
      })
      .catch(() => {
        alert('Ha ocurrido un error al agregar el centro')
        setSubmiting(false)
      })

    setModifying(-1)
    setSubmiting(false)
    patchReset()
  }

  const onDelete = () => {}

  const handleSetPatchModify = (id: number, days?: string[]) => {
    setModifying(id)
    if (days) {
      // setPatchValue('dias', days)
    }
  }

  const handleMultiSelectChange = (
    event: any,
    setValue: UseFormSetValue<UserInfo>
  ) => {
    if (event.value === undefined) {
      setValue('center', '')
      return
    }
    setValue('center', String(event.value))
  }

  useEffect(() => {
    console.log('POSTERRORS', postErrors)
  }, [postErrors])

  useEffect(() => {
    console.log('PATCHERRORS', patchErrors)
  }, [patchErrors])

  const UserList = (rolUser: string) => {
    if (userRaw) {
      return userRaw!
        .filter(
          (user: UserInfo) => rolChecked === 'Todos' || user.rol === rolChecked
        )
        .map((e: any) => {
          return (
            <tr key={e.mail} className='border border-gra-300'>
              {e.rol === 'voluntario' && e.mail === modifying ? (
                <Fragment>
                  <InputFile
                    id='foto'
                    register={patchRegister}
                    registerOptions={{ required: false }}
                    watch={patchWatch}
                    setValue={setPatchValue}
                    alter={modifying}
                    props={{
                      type: 'file',
                      placeholder: e.foto
                        ? e.foto === defaultPhoto
                          ? undefined
                          : e.foto
                        : undefined
                    }}
                  />
                  <Input
                    id='nombre'
                    register={patchRegister}
                    registerOptions={{ required: false }}
                    watch={patchWatch}
                    setValue={setPatchValue}
                    alter={modifying}
                    props={{ placeholder: e.nombre }}
                  />
                  <Input
                    id='apellido'
                    register={patchRegister}
                    registerOptions={{ required: false }}
                    watch={patchWatch}
                    setValue={setPatchValue}
                    alter={modifying}
                    props={{ placeholder: e.apellido }}
                  />
                  <Input
                    id='dni'
                    register={patchRegister}
                    registerOptions={{ required: false }}
                    watch={patchWatch}
                    setValue={setPatchValue}
                    alter={modifying}
                    props={{ placeholder: e.dni }}
                  />
                  <Input
                    id='mail'
                    register={patchRegister}
                    registerOptions={{ required: false }}
                    watch={patchWatch}
                    setValue={setPatchValue}
                    alter={modifying}
                    props={{ placeholder: e.mail }}
                  />
                  <td className='border border-gray-300'>
                    <div className='size-full p-1 flex justify-center items-center'>
                      <InputBday
                        id='fechaNacimiento'
                        type='date'
                        register={patchRegister}
                        registerOptions={{
                          required: 'Campo requerido',
                          validate: value => {
                            return (
                              new Date(value) <= subYears(new Date(), 18) ||
                              'Requerido ser mayor de edad.'
                            )
                          }
                        }}
                        error={patchErrors.fechaNacimiento}
                      />
                    </div>
                  </td>
                  <td className='border border-gray-300' />
                  <td className='p-2 border-e border-gray-300'>
                    <div className='relative size-full'>
                      <span className='absolute z-50 top-3 right-6 text-red-500 text-sm'>
                        *
                      </span>
                      <Select
                        options={(centers as CenterInfo[]).map(center => ({
                          value: center.id_centro,
                          label: `${center.ubicacion} - ${center.direccion} - ${center.nombre_centro}`
                        }))}
                        placeholder='...'
                        onChange={(e: any) => {
                          handleMultiSelectChange(e, setPatchValue)
                        }}
                        className='w-full'
                        isDisabled={modifying > -1 || submiting}
                      />
                    </div>
                  </td>
                  <td className='p-2 border-e border-gray-300'></td>
                </Fragment>
              ) : (
                <Fragment>
                  <td className='border border-gray-300'>
                    <div
                      className={cn(
                        'size-full p-1 bg-gray-300 flex justify-center',
                        {
                          'bg-rose-700': e.rol === 'admin_centro',
                          'bg-blue-900': e.rol === 'voluntario'
                        }
                      )}
                    >
                      <Image
                        src={
                          String(e.foto).includes('data:image/png;base64,') ||
                          String(e.foto).includes('https://')
                            ? e.foto
                            : defaultPhoto
                        }
                        alt='Foto'
                        width={0}
                        height={0}
                        className='min-w-11 min-h-11 object-cover rounded-full'
                      />
                    </div>
                  </td>
                  <td className='p-2 border-x border-gray-300'>
                    {e.nombre}
                    <span className='font-semibold text-black'>
                      {user.email === e.mail ? '(Tú)' : ''}
                    </span>
                  </td>
                  <td className='p-2 border-x border-gray-300'>{e.apellido}</td>
                  <td className='p-2 border-x border-gray-300'>{e.dni}</td>
                  <td className='p-2 border-x border-gray-300'>{e.mail}</td>
                  <td className='p-2 border-x border-gray-300'>
                    {e.fecha_nacimiento}
                  </td>
                  <td className='p-2 border-x border-gray-300'>
                    {e.fecha_registro}
                  </td>
                  <td className='p-2 border-x border-gray-300'>
                    {e.centro === -1
                      ? 'Sin asignar'
                      : getCenterDescription(
                          (centers as CenterInfo[]).find(
                            center => center.id_centro === e.centro
                          )
                        )}
                  </td>
                  <td className='p-2 border-x border-gray-300'>
                    {e.rol === 'usuario_basico'
                      ? 'Básico'
                      : e.rol === 'admin_centro'
                      ? 'Administrador'
                      : 'Voluntario'}
                  </td>
                </Fragment>
              )}
              <td className='p-2 text-center border-e border-gray-300'>
                {e.rol === 'voluntario' ? (
                  modifying === e.mail ? (
                    <div className='size-full flex justify-center items-center gap-2'>
                      <Button
                        type='submit'
                        disabled={submiting}
                        className='w-max text-white rounded-lg py-[10px] outline-transparent	outline bg-green-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-green-700 hover:outline-green-700 active:text-white active:bg-green-700 duration-200'
                      >
                        <FileCheck />
                      </Button>
                      <Button
                        type='button'
                        onClick={() => {
                          handleSetPatchModify(-1)
                        }}
                        disabled={submiting}
                        className='w-max text-white rounded-lg py-[10px] outline-transparent	outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                      >
                        <X />
                      </Button>
                    </div>
                  ) : (
                    <div className='size-full flex justify-center items-center gap-2'>
                      <Button
                        type='button'
                        disabled={submiting || modifying > -1}
                        onClick={onDelete}
                        className='w-max text-white rounded-lg py-[10px] outline-transparent	outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                      >
                        <FileMinus />
                      </Button>
                      <Button
                        type='button'
                        disabled={submiting || modifying > -1}
                        onClick={() => {
                          handleSetPatchModify(e.mail)
                        }}
                        className='w-max text-white rounded-lg py-[10px] outline-transparent	outline bg-orange-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-orange-700 hover:outline-orange-700 active:text-white active:bg-orange-700 duration-200'
                      >
                        <FilePenLine />
                      </Button>
                    </div>
                  )
                ) : null}
              </td>
            </tr>
          )
        })

      return 'No se encontraron usuarios con el rol de voluntario'
    }
  }

  return (
    <RootLayout user={user}>
      {isLoading ? (
        <div className='flex justify-center'>
          <div className=''>
            <Loading />
          </div>
        </div>
      ) : userRaw.length === 0 ? (
        <p className='text-2xl font-bold text-gray-500  m-auto'>
          No hay usuarios en el sistema
        </p>
      ) : (
        <div className='w-full p-4 flex flex-col justify-center items-center gap-4'>
          <div className='w-full flex m-auto'>
            <div className='w-full flex justify-between'>
              <select
                id='role-select'
                value={rolChecked}
                onChange={handleChange}
                className='border border-gray-300 hover:cursor-pointer w-[200px] h-[40px] font-semibold text-black'
              >
                <option value='Todos'>Todos</option>
                <option value='usuario_basico'>Básico</option>
                <option value='voluntario'>Voluntario</option>
                <option value='admin_centro'>Administrador</option>
              </select>
            </div>
          </div>
          <div className='w-full flex justify-center items-center'>
            <table className='w-full'>
              <thead>
                <tr className='text-gray-600'>
                  <th className='border border-s-[1px] border-gray-300'>
                    Foto
                  </th>
                  <th className='border border-gray-300'>Nombre</th>
                  <th className='border border-gray-300'>Apellido</th>
                  <th className='border border-gray-300'>DNI</th>
                  <th className='border border-gray-300'>E-mail</th>
                  <th className='border border-gray-300'>Nacimiento</th>
                  <th className='border border-gray-300'>Creación</th>
                  <th className='min-w-24 border border-gray-300'>Centro</th>
                  <th className='border border-gray-300'>Rol</th>
                  <th className='border border-e-[1px] border-gray-300'>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className='text-center text-black'>
                <tr className='border border-gray-300 h-[50px]'>
                  <InputFile
                    id='foto'
                    register={postRegister}
                    registerOptions={{ required: true }}
                    watch={postWatch}
                    setValue={setPostValue}
                    props={{ disabled: modifying > -1, type: 'file' }}
                  />
                  <Input
                    id='nombre'
                    register={postRegister}
                    registerOptions={{ required: true }}
                    props={{ disabled: modifying > -1 }}
                  />
                  <Input
                    id='apellido'
                    register={postRegister}
                    registerOptions={{ required: true }}
                    props={{ disabled: modifying > -1 }}
                  />
                  <Input
                    id='dni'
                    register={postRegister}
                    registerOptions={{ required: true }}
                    props={{ disabled: modifying > -1 }}
                  />
                  <Input
                    id='mail'
                    register={postRegister}
                    registerOptions={{ required: true }}
                    props={{ disabled: modifying > -1 }}
                  />
                  <td className='border border-gray-300'>
                    <div className='size-full p-1 flex justify-center items-center'>
                      <InputBday
                        id='fechaNacimiento'
                        type='date'
                        register={postRegister}
                        registerOptions={{
                          required: 'Campo requerido',
                          validate: value => {
                            return (
                              new Date(value) <= subYears(new Date(), 18) ||
                              'Requerido ser mayor de edad.'
                            )
                          }
                        }}
                        error={postErrors.fechaNacimiento}
                      />
                    </div>
                  </td>
                  <td className='border border-gray-300'></td>
                  <td className='p-2 border-e border-gray-300'>
                    <div className='relative size-full'>
                      <span className='absolute z-50 top-3 right-6 text-red-500 text-sm'>
                        *
                      </span>
                      <Select
                        options={(centers as CenterInfo[]).map(center => ({
                          value: center.id_centro,
                          label: `${center.ubicacion} - ${center.direccion} - ${center.nombre_centro}`
                        }))}
                        placeholder='...'
                        onChange={(e: any) => {
                          handleMultiSelectChange(e, setPostValue)
                        }}
                        className='w-full'
                        isDisabled={modifying > -1 || submiting}
                      />
                    </div>
                  </td>
                  <td className='p-2 border-e border-gray-300'></td>
                  <td className='p-2 text-center'>
                    <Button
                      type='submit'
                      disabled={submiting || modifying > -1}
                      onClick={handlePostSubmit(onPostSubmit)}
                      className='w-max text-white rounded-lg py-[10px] outline-transparent	outline bg-green-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-green-700 hover:outline-green-700 active:text-white active:bg-green-700 duration-200'
                    >
                      <FilePlus />
                    </Button>
                  </td>
                </tr>
                {rolChecked == 'voluntario'
                  ? UserList('voluntario')
                  : rolChecked == 'admin_centro'
                  ? UserList('administrador')
                  : rolChecked == 'usuario_basico'
                  ? UserList('basico')
                  : UserList('Todos')}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </RootLayout>
  )
}
