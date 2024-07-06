import { Loading } from '@/components/loading'
import { Button } from '@/components/ui/button'
import { FRONT_BASE_URL, defaultHours, workingDays } from '@/constants'
import { ButtonEnum } from '@/components/types'
import RootLayout from '@/layouts/root-layout'
import { GetSSPropsResult, User } from '@/types'
import { getUser } from '@/utils'
import { requireNothing } from '@/utils/permissions'
import axios from 'axios'
import { FileCheck, FileMinus, FilePenLine, FilePlus, X } from 'lucide-react'
import { NextApiRequest, NextApiResponse } from 'next'
import {
  DetailedHTMLProps,
  Fragment,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  useEffect,
  useState
} from 'react'
import {
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
  useForm
} from 'react-hook-form'
import Select from 'react-select'
import { useRouter } from 'next/router'

export async function getServerSideProps({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res))
}
export interface CenterInfo {
  dias: any[]
  direccion: string
  horario_apertura: string
  horario_cierre: string
  id_centro: string
  nombre_centro: string
  ubicacion: string
}

const HourSelector = ({
  id,
  defaultOption = { label: '...', value: '' },
  register,
  registerOptions,
  watch,
  setValue,
  alter,
  props
}: {
  id: keyof CenterInfo
  defaultOption?: { label: string; value: string }
  register: UseFormRegister<CenterInfo>
  registerOptions: RegisterOptions
  watch: (id: keyof CenterInfo) => string
  setValue?: (id: keyof CenterInfo, value: string) => void
  alter?: number
  props?: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
}): React.ReactNode => {
  const [defaultValue, setDefaultValue] = useState<string>()
  const [defaultLabel, setDefaultLabel] = useState<string>()

  useEffect(() => {
    setValue && setValue(id, defaultOption.value)
    const watchId = watch(id) !== undefined && watch(id) !== ''
    setDefaultValue(watchId ? watch(id) : defaultOption.value)
    setDefaultLabel(watchId ? watch(id) : defaultOption.label)
  }, [alter])

  return (
    <div className='relative h-10 flex flex-col justify-center items-start border border-gray-400'>
      <span className='absolute top-0 right-[5px] text-red-500 text-sm'>*</span>
      <select
        id=''
        {...register(id, registerOptions)}
        data-value={watch(id)}
        className='flex-1 border data-[value=""]:text-gray-400 data-[value=undefined]:text-gray-400'
        {...props}
      >
        <option
          value={defaultValue}
          selected
          disabled
          className='text-gray-400'
        >
          {defaultLabel}
        </option>
        {defaultHours.map(hour => (
          <option key={id + hour} value={hour} className='!text-black'>
            {hour}
          </option>
        ))}
      </select>
    </div>
  )

}

const Input = ({
  id,
  register,
  registerOptions,
  watch,
  setValue,
  alter,
  props
}: {
  id: keyof CenterInfo
  register: UseFormRegister<CenterInfo>
  registerOptions: RegisterOptions
  watch?: (id: keyof CenterInfo) => string
  setValue?: (id: keyof CenterInfo, value: string) => void
  alter?: number
  props?: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
}): React.ReactNode => {
  useEffect(() => {
    setValue && setValue(id, props?.placeholder || '')
  }, [alter])

  return (
    <td className='relative p-2 border-e border-gray-400'>
      <div className='border'>
        <span className='absolute right-3 text-red-500 text-sm'>*</span>
        <input
          type='text'
          {...register(id, registerOptions)}
          className='w-full h-[38px] px-2 border border-gray-400'
          {...props}
        />
      </div>
    </td>
  )
}

export default function UsersSistemList({ user }: { user: User }) {
  const [centersRaw, setCentersRaw] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [submiting, setSubmiting] = useState(false)
  const [modifying, setModifying] = useState(-1)
  const [locationChecked, setLocationChecked] = useState('Todos')
  const [hiddeCards, setHiddeCards] = useState<boolean>(false)
  const router = useRouter()
  const {
    register: postRegister,
    handleSubmit: handlePostSubmit,
    watch: postWatch,
    setValue: setPostValue,
    reset: postReset
  } = useForm<CenterInfo>()
  const {
    register: patchRegister,
    handleSubmit: handlePatchSubmit,
    watch: patchWatch,
    setValue: setPatchValue,
    reset: patchReset
  } = useForm<CenterInfo>()

  useEffect(() => {
    const getCentersList = async () => {
      await axios
        .get<any[]>(`${FRONT_BASE_URL}/centers/get`)
        .then((res: any) => {
          setCentersRaw(res.data)
          console.log(res.data);

        })
        .catch((err: any) => {
          setCentersRaw([])
        })
    }
    getCentersList()
  }, [])

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false) // Cambia isLoading a false después de 2 segundos
      postRegister('dias')
    }, 400)
  }, [])

  const onPostSubmit = (formData: CenterInfo) => {
    // Si no hay días seleccionados
    if (formData.dias === undefined || formData.dias === null) {
      alert('Por favor selecciones el/los días de trabajo')
      return
    }
    if (formData.dias.length === 0) {
      alert('Por favor selecciones el/los días de trabajo')
      return
    }

    // Si el horario de apertura y cierre son iguales
    if (formData.horario_apertura === formData.horario_cierre) {
      alert('El horario desde y hasta no pueden ser iguales')
      return
    }

    // Si el horario de apertura es mayor al de cierre
    if (
      Number(formData.horario_apertura.split(':')[0]) >
      Number(formData.horario_cierre.split(':')[0])
    ) {
      alert('El horario desde no puede ser mayor al horario hasta')
      return
    }

    setSubmiting(true)
    axios
      .post(`${FRONT_BASE_URL}centers/post`, formData)
      .then(async () => {
        //alert('Centro agregado correctamente')
        // ACTUALIZAR LA LISTA DE CENTROS CON LA LISTA DE CENTROS DEVUELTA POR EL ENDPOINT DEL BACK PARA QUE SE RENDERICE EL NUEVO CENTROVICK
        setSubmiting(false)
        postReset()
        await router.push('/')
        await router.push('/center-list')
        alert('Centro agregado correctamente')
      })
      .catch(() => {
        alert('Ha ocurrido un error al agregar el centro')
        setSubmiting(false)
      })
  }

  const onPatchSubmit = (formData: CenterInfo) => {
    console.log(formData)
    setSubmiting(true)
    formData.id_centro = modifying.toString()
    //console.log(modifying);

    // Si no hay días seleccionados
    if (formData.dias === undefined || formData.dias === null) {
      alert('Por favor selecciones el/los días de trabajo')
      return
    }
    if (formData.dias.length === 0) {
      alert('Por favor selecciones el/los días de trabajo')
      return
    }

    // Si el horario de apertura y cierre son iguales
    if (formData.horario_apertura === formData.horario_cierre) {
      alert('El horario desde y hasta no pueden ser iguales')
      return
    }

    // Si el horario de apertura es mayor al de cierre
    if (
      Number(formData.horario_apertura.split(':')[0]) >
      Number(formData.horario_cierre.split(':')[0])
    ) {
      alert('El horario desde no puede ser mayor al horario hasta')
      return
    }

    axios
      .patch(`${FRONT_BASE_URL}centers/patch`, formData)
      .then(async () => {
        //alert('Centro agregado correctamente')
        // ACTUALIZAR LA LISTA DE CENTROS CON LA LISTA DE CENTROS DEVUELTA POR EL ENDPOINT DEL BACK PARA QUE SE RENDERICE EL CENTROVICK MODIFICADO
        setSubmiting(false)
        patchReset()
        await router.push('/')
        await router.push('/center-list')
        alert('Centro modificado correctamente')
      })
      .catch(() => {
        alert('Ha ocurrido un error al modificar el centro')
        setSubmiting(false)
      })

    setModifying(-1)
    setSubmiting(false)
    patchReset()
  }

  // const onDelete = () => {
  //   console.log('aaaaaaa');
  // }

  const handleLocationChange = (event: any) => {
    setLocationChecked(event.target.value)
    console.log(locationChecked);

  }

  const handleMultiSelectChange = (
    days: any,
    setValue: UseFormSetValue<CenterInfo>
  ) => {
    if (days.length === 0 || days === null || days === undefined) {
      setValue('dias', undefined as unknown as any[])
      return
    }
    setValue(
      'dias',
      days.map((e: any) => e.value)
    )
  }

  const handleSetPatchModify = (id: number, days?: string[]) => {
    setModifying(id)
    if (days) {
      setPatchValue('dias', days)
    }
  }

  const locationList = () => {
    if (centersRaw) {
      const rawLocationL = centersRaw!.map((e: any) => e.ubicacion)
      const noDupsLocationL = Array.from(new Set(rawLocationL))
      return noDupsLocationL.map(e => (
        <option key={e} value={e}>
          {e}
        </option>
      ))
    }
  }

  const getBackgroundTr = (e: boolean, styles: string) => {
    return e ? `${styles} bg-gray-200 bg-opacity-70` : styles
  }
  const centerList = () => {
    if (centersRaw) {
      (centersRaw as { borrado: boolean }[]).sort((a, b) => {
        // Comparamos los valores de la propiedad 'isTrue'
        if (a.borrado === b.borrado) {
          return 0;
        } else if (a.borrado) {
          return 1;
        } else {
          return -1;
        }
      });
      const centerL: any = centersRaw!.map((e: any) => {
        //console.log(e);
        if (hiddeCards) {
          return ([])
        } else {
          return (
            <tr key={e.id_centro} className={getBackgroundTr(e.borrado, 'border border-gray-400 h-[50px]')}>
              {e.id_centro === modifying ? (
                <Fragment>
                  <Input
                    id='nombre_centro'
                    register={patchRegister}
                    registerOptions={{ required: false }}
                    watch={patchWatch}
                    setValue={setPatchValue}
                    alter={modifying}
                    props={{ placeholder: e.nombre_centro }}
                  />
                  <Input
                    id='ubicacion'
                    register={patchRegister}
                    registerOptions={{ required: false }}
                    watch={patchWatch}
                    setValue={setPatchValue}
                    alter={modifying}
                    props={{ placeholder: e.ubicacion }}
                  />
                  <Input
                    id='direccion'
                    register={patchRegister}
                    registerOptions={{ required: false }}
                    watch={patchWatch}
                    setValue={setPatchValue}
                    alter={modifying}
                    props={{ placeholder: e.direccion }}
                  />
                  <td className='p-2 border-e border-gray-400'>
                    <div className='size-full flex gap-2'>
                      <HourSelector
                        id='horario_apertura'
                        defaultOption={{
                          label: e.horario_apertura,
                          value: e.horario_apertura
                        }}
                        register={patchRegister}
                        registerOptions={{ required: true }}
                        watch={patchWatch}
                        setValue={setPatchValue}
                        alter={modifying}
                      />
                      ➜
                      <HourSelector
                        id='horario_cierre'
                        defaultOption={{
                          label: e.horario_cierre,
                          value: e.horario_cierre
                        }}
                        register={patchRegister}
                        registerOptions={{ required: true }}
                        watch={patchWatch}
                        setValue={setPatchValue}
                        alter={modifying}
                      />
                    </div>
                  </td>
                  <td className='relative p-2 flex flex-col justify-center items-start border-e border-gray-400'>
                    <span className='absolute z-50 top-3 right-6 text-red-500 text-sm'>
                      *
                    </span>
                    <Select
                      options={workingDays.map(day => ({
                        value: day,
                        label: day
                      }))}
                      defaultValue={e.dias.map((day: any) => ({
                        value: day.descripcion,
                        label: day.descripcion
                      }))}
                      placeholder='...'
                      isMulti
                      onChange={(e: any) => {
                        handleMultiSelectChange(e, setPatchValue)
                      }}
                      className='w-full'
                    />
                  </td>
                </Fragment>
              ) : (
                <Fragment>
                  <td className='p-2 border-e border-gray-400'>
                    {e.nombre_centro}
                  </td>
                  <td className='p-2 border-e border-gray-400'>{e.ubicacion}</td>
                  <td className='p-2 border-e border-gray-400'>{e.direccion}</td>
                  <td className='p-2 border-e border-gray-400'>{`${e.horario_apertura} ➜ ${e.horario_cierre}`}</td>
                  <td className='p-2 font-medium text-gray-600 text-start border-e border-gray-400'>
                    {e.dias
                      .map((day: any) => day.descripcion[0] + day.descripcion[1])
                      .join(', ')}
                  </td>
                </Fragment>
              )}
              <td className='p-2 text-center'>
                {modifying === e.id_centro ? (
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
                  e.borrado == false ? <div className='size-full flex justify-center items-center gap-2'>
                    <Button
                      type='button'
                      disabled={submiting || modifying > -1}
                      onClick={() => { _handleBorrarCentro(e.id_centro) }}
                      className='w-max text-white rounded-lg py-[10px] outline-transparent	outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                    >
                      <FileMinus />
                    </Button>
                    <Button
                      type='button'
                      disabled={submiting || modifying > -1}
                      onClick={() => {
                        handleSetPatchModify(e.id_centro, e.dias)
                      }}
                      className='w-max text-white rounded-lg py-[10px] outline-transparent	outline bg-orange-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-orange-700 hover:outline-orange-700 active:text-white active:bg-orange-700 duration-200'
                    >
                      <FilePenLine />
                    </Button>
                  </div> : <p className='text-rose-700 font-semibold text-sm'>CENTRO ELIMINADO</p>
                )}

              </td>
            </tr>
          )
        }
      })
      //console.log(centerL[1].props.children[0].props.children[1].props.children);

      return locationChecked == 'Todos'
        ? centerL
        : centerL.filter(
          (x: any) => x.props.children[0].props.children[1].props.children == locationChecked
        )
    }
  }


  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false) // Cambia isLoading a false después de 2 segundos
    }, 400)
  }, [])
  // const handleChangeLocation = (event: any) => {
  //   console.log(event.targe.value);

  //   setLocationChecked(event.target.value);
  // };
  const _handleBorrarCentro = async (e: number) => {
    const idCentro = {
      idCentro: e
    }
    await axios
      .post(`${FRONT_BASE_URL}centers/delete`, idCentro)
      .then(async () => {
        console.log('Borrado');
        await router.push('/')
        await router.push('/center-list')
        alert(`Centro ${e} eliminado con exito`)
      })
      .catch((error: { response: { data: { message: string } } }) => {
        if (error) {
          alert(error.response.data.message);
        }
      });

  }
  const _handleModificarCentro = async (e: number) => {
    console.log('Centro a modificar: ' + e);
  }

  return (
    <RootLayout user={user}>
      {isLoading ? (
        <div className='flex justify-center mt-[50px]'>
          <div className=''>
            <Loading />
          </div>
        </div>
      ) : centersRaw.length === 0 ? (
        <p className='text-2xl font-bold text-gray-500 mt-[20px] m-auto'>
          No hay centros cargados en el sistema
        </p>
      ) : (
        <div className='p-8 flex flex-col justify-center items-center gap-8'>
          <div className='w-full flex m-auto'>
            <div className='w-[100%] flex justify-between'>
              <div>
                <select
                  id='location-select'
                  value={locationChecked}
                  onChange={handleLocationChange}
                  className='hover:cursor-pointer w-[300px] h-[40px] font-semibold text-black border border-gray-400'
                >
                  <option value='Todos'>Todos los centros</option>
                  {hiddeCards == false ? locationList() : <></>}

                </select>
                <button
                  key='hiddenPosts'
                  className='ms-[20px] text-white rounded-lg py-[10px] px-14 outline-transparent	outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                  onClick={() => {
                    setHiddeCards(true)
                  }}
                >
                  Vaciar centros
                </button>
              </div>
            </div>
          </div>
          <form
            noValidate
            className='w-full'
            onSubmit={
              modifying > -1
                ? handlePatchSubmit(onPatchSubmit)
                : handlePostSubmit(onPostSubmit)
            }
          >
            <table className='w-full'>
              <thead>
                <tr className='border border-gray-400 text-left text-gray-600'>
                  <th className='p-2 border-e border-gray-400'>Nombre</th>
                  <th className='p-2 border-e border-gray-400'>Ubicacion</th>
                  <th className='p-2 border-e border-gray-400'>Direccion</th>
                  <th className='p-2 border-e border-gray-400'>
                    Desde ➜ Hasta
                  </th>
                  <th className='p-2 border-e border-gray-400'>Días</th>
                  <th className='p-2'>Acciones</th>

                </tr>
              </thead>
              <tbody className='text-black'>
                <tr className='border border-gray-400 h-[50px]'>
                  <Input
                    id='nombre_centro'
                    register={postRegister}
                    registerOptions={{ required: true }}
                    props={{ disabled: modifying > -1 }}
                  />
                  <Input
                    id='ubicacion'
                    register={postRegister}
                    registerOptions={{ required: true }}
                    props={{ disabled: modifying > -1 }}
                  />
                  <Input
                    id='direccion'
                    register={postRegister}
                    registerOptions={{ required: true }}
                    props={{ disabled: modifying > -1 }}
                  />
                  <td className='p-2 border-e border-gray-400'>
                    <div className='size-full flex gap-2'>
                      <HourSelector
                        id='horario_apertura'
                        register={postRegister}
                        registerOptions={{ required: true }}
                        watch={postWatch}
                        props={{ disabled: modifying > -1 }}
                      />
                      ➜
                      <HourSelector
                        id='horario_cierre'
                        register={postRegister}
                        registerOptions={{ required: true }}
                        watch={postWatch}
                        props={{ disabled: modifying > -1 }}
                      />
                    </div>
                  </td>
                  <td className='relative p-2 flex flex-col justify-center items-start border-e border-gray-400'>
                    <span className='absolute z-50 top-3 right-6 text-red-500 text-sm'>
                      *
                    </span>
                    <Select
                      options={workingDays.map(day => ({
                        value: day,
                        label: day
                      }))}
                      placeholder='...'
                      isMulti
                      onChange={(e: any) => {
                        handleMultiSelectChange(e, setPostValue)
                      }}
                      className='w-full'
                      isDisabled={modifying > -1}
                    />
                  </td>
                  <td className='p-2 text-center'>
                    <Button
                      type='submit'
                      disabled={submiting || modifying > -1}
                      className='w-max text-white rounded-lg py-[10px] outline-transparent	outline bg-green-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-green-700 hover:outline-green-700 active:text-white active:bg-green-700 duration-200'
                    >
                      <FilePlus />
                    </Button>
                  </td>
                </tr>
                {centerList()}
              </tbody>
            </table>
          </form>
          {hiddeCards ? <p className='text-2xl font-bold text-gray-500 mt-[10px] m-auto'>
            No hay centros cargados en el sistema
          </p>:<></>}
        </div>
      )}
    </RootLayout>
  )
}
