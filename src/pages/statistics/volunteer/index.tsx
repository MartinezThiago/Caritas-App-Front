import { MultiSelect, SimpleBarCharts, SimplePieCharts } from '@/components'
import ExtendedPostCard from '@/components/extended-post-card'
import { FRONT_BASE_URL } from '@/constants'
import { BarList, Legend } from '@tremor/react';
import { DonutChart } from '@tremor/react';
import RootLayout from '@/layouts/root-layout'
import { useForm } from "react-hook-form";
import {
  GetSSPropsResult,
  PostDataAdapter,
  User
} from '@/types'
import { getUser } from '@/utils'
import { requireNothing } from '@/utils/permissions'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ButtonEnum } from '@/components/types';
import CenterDescription from '@/components/center-description';

interface FormData {
  fecha_inicio: string,
  fecha_fin: string
}

export async function getServerSideProps({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res))
}

export default function UsersSistemList({ user }: { user: User }) {
  const router = useRouter()
  const [postData, setPostData] = useState<PostDataAdapter>()
  const [dayFrom, setDayFrom] = useState<string>('')
  const [dayTo, setDayTo] = useState<string>('')
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    clearErrors,
    resetField
  } = useForm<FormData>()

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const { data: postData } = await axios.post<PostDataAdapter>(
  //       `${FRONT_BASE_URL}post/get`,
  //       { id: router.query.id }
  //     )
  //     console.log(postData);

  //     setPostData(postData)
  //   }
  //   getProducts()
  // }, [])
  // if (!postData) {
  //   return null
  // }


  const datahero = [
    { name: 'Ropa', value: 456 },
    { name: 'Utiles escolares', value: 351 },
    { name: 'Alimento', value: 51 },
    { name: 'Limpieza', value: 51 },
  ];
  const trades = [
    {
      name: 'Confirmados',
      trades: 20,
    },
    {
      name: 'Rechazados',
      trades: 13,
    },
    {
      name: 'Cancelados',
      trades: 14,
    }
  ];
  const _handleSubmit = async (formData: FormData) => {
    // if (dayTo < dayFrom) {
    //   alert(`La fecha 'Hasta' no puede ser menor a la fecha 'Desde'`)
    //   setDayFrom('')
    //   setDayTo('')
    //   return
    // }
    const formDataAux = {
      fecha_inicio: dayFrom,
      fecha_fin: dayTo
    }
    console.log(formDataAux);
    // await axios
    //   .post(`${FRONT_BASE_URL}/`, formDataAux)
    //   .then(async () => {
    //     await router.push('/')
    //     await router.push('/user/pending-trades')
    //     alert('Cancelacion exitosa de intercambio')
    //   })
    //   .catch((error: { response: { data: { message: string } } }) => {
    //     console.log(error)
    //   })
  }
  const Field = ({
    text,
    options,
    handleClick,
    datePickerValue,
    dis,
  }: {
    text: string
    options?: Array<{ value: string; label: string }>
    handleClick: (value: string) => void
    datePickerValue?: string
    dis: boolean
    datepickerText?: string
  }): React.ReactNode => {
    return (
      <div className=' flex flex-col'>
        <h1 className='text-center text-lg font-semibold text-black place-self-start'>{text}</h1>
        <div className='w-[200px] mt-[5px]'>
          <>
            <input
              type='date'
              className='w-full h-[2.5rem] py-2 px-3 appearance-none border shadow text-zinc-700 focus:outline-none focus:shadow-lg border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 hover:cursor-pointer'
              onChange={(e: any) => handleClick(e.target.value)}
              // min={new Date().toISOString().split('T')[0]}
              value={datePickerValue}
              disabled={dis}
            />
          </>
        </div>
      </div>
    )
  }
  const handleDayFromClick = (value: string) => {
    setDayFrom(value)
    console.log(value);
  }
  const handleDayToClick = (value: string) => {
    if (value < dayFrom) {
      alert(`La fecha 'Hasta' no puede ser menor a la fecha 'Desde'`)
      setDayTo('')
    } else {
      setDayTo(value)
    }
  }
  const validateDay = (): boolean => {

    return dayTo < dayFrom
  }
  const valueFormatter = (number: number) =>
    `Total: ${Intl.NumberFormat('us').format(number).toString()}`;

  return (
    <RootLayout user={user}>
      <div className=''>
        <div className='w-[100vw] flex justify-center'>
          <p className="text-xl font-semibold text-blue-900  mt-[20px] m-auto">
            ESTADISTICAS EN EL CENTRO X
          </p>
        </div>
        <div className='flex justify-center mt-[40px]'>
          <div className='w-[65vw] flex justify-between bg-blue-900 bg-opacity-10 p-[25px] rounded-[10px] items-center'>
            <form
              key='request-date-form'
              noValidate
              onSubmit={handleSubmit(_handleSubmit)}
              className='  '
            >
              <div className='flex items-end'>
                <div className='me-[40px]'>
                  <Field
                    text='Desde'
                    handleClick={handleDayFromClick}
                    datePickerValue={dayFrom}
                    dis={false}
                  />
                </div>
                <div className='me-[40px]'>
                  <Field
                    text='Hasta'
                    handleClick={handleDayToClick}
                    datePickerValue={dayTo}
                    dis={dayFrom == ''}
                  />
                </div>
                <button
                  key='request-date-form-submit-button'
                  type={ButtonEnum.SUBMIT}
                  className=' h-[2.5rem] px-6 w-[150px] outline-transparent outline disabled:bg-gray-500 disabled:hover:text-white disabled:hover:outline-none disabled:hover:bg-gray-600 bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 duration-200 text-white active:text-white active:bg-rose-700'
                  disabled={dayFrom == '' || dayTo == ''}
                >
                  Consultar
                </button>
              </div>
            </form >
            <div className='text-black flex flex-col items-center'>
              <p className="text-lg font-bold text-[20px]">Informacion del Centro J</p>
              <div className="w-[300px]">
                <p className='w-auto flex justify-between'><span className="font-semibold text-[18px]">Localidad: </span> Buenos Aires, La Plata</p>
                <p className='w-auto flex justify-between'><span className="font-semibold text-[18px]">Direccion: </span> 57 n1210</p>
                <p className='w-auto flex justify-between'><span className="font-semibold text-[18px]">Dias: </span>Lunes Martes Jueves</p>
                <p className='w-auto flex justify-between'><span className="font-semibold text-[18px]">Horarios:</span> 10:00 - 19:00</p>
              </div>
            </div>
          </div>
        </div>

        <div className=' flex justify-center '>
          {/* <div className='flex mt-[40px]'>
            
            <div className='me-[60px]'>
              <SimpleBarCharts
                data={[
                  {
                    nombre: "Utiles", CantidadConfirmados: 41
                  },
                  {
                    nombre: "Ropa", CantidadConfirmados: 10
                  },
                  {
                    nombre: "Alimentos", CantidadConfirmados: 13
                  }
                  ,
                  {
                    nombre: "Limpieza", CantidadConfirmados: 13
                  }
                ]}
                type='categories'
              />
            </div>
            <div>
              <SimplePieCharts />
            </div>
          </div> */}
          <div className='h-[100vh] w-[65vw]'>
            <div className='flex mt-[40px] justify-between'>
              <div className='flex flex-col bg-blue-900 bg-opacity-10 rounded-[10px] p-[25px] '>
                <h1 className='font-semibold text-black text-2xl'>Cantidad de intercambios por categoria</h1>
                <div className='mt-[20px]'>
                  <BarList data={datahero} className="w-[500px]" />
                </div>
              </div>
              <div className=' flex flex-col items-center bg-blue-900 bg-opacity-10 rounded-[10px] p-[25px]'>
                <h1 className='font-semibold text-black text-3xl'>Intercambios en el centro x</h1>
                <div className='flex justify-center items-center mt-[20px]'>
                  <div>
                    <DonutChart
                      data={trades}
                      category="trades"
                      index="name"
                      colors={[
                        'green-500',
                        'blue-900',
                        'rose-700'
                      ]}
                      showLabel={true}
                      showAnimation={true}
                      valueFormatter={valueFormatter}
                      className='w-[300px] h-[180px] font-semibold text-xl '
                    />
                  </div>
                  <div>
                    <Legend
                      categories={['Confirmados', 'Rechazados', 'Cancelados']}
                      colors={['green-500', 'blue-900', 'rose-700']}
                      className="w-[200px] text-black font-semibold h-[120px]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between'>

              <div className='w-[750px] bg-blue-900 bg-opacity-10 rounded-[10px] mt-[40px] '>
                <div className='w-[100%] h-[100%] p-[25px] text-black '>
                  <p className="text-lg flex justify-between">
                    <span className='font-semibold text-lg'>
                      Centro con mas intercambios: </span>
                    Centro Y La Pampa, Santa Rosa
                  </p>
                  <p className="text-lg flex justify-between">
                    <span className='font-semibold text-lg'>
                      Voluntario que mas audito intercambios: </span>
                    Matias Diz Centro Y La Pampa, Santa Rosa
                  </p>
                  <p className="text-lg flex justify-between">
                    <span className='font-semibold text-lg'>
                      Cantidad de intercambios con donacion: </span> 48
                  </p>
                  <p className="text-lg flex justify-between">
                    <span className='font-semibold text-lg'>
                      Motivo mas comun de Rechazo: </span> Uno de los usuarios no presento DNI
                  </p>
                  <p className="text-lg flex justify-between">
                    <span className='font-semibold text-lg'>
                      Motivo mas comun de Cancelacion: </span> Problemas con el transporte
                  </p>
                </div>

              </div>
              <div className='w-[400px] h-auto bg-blue-900 bg-opacity-10 rounded-[10px] mt-[40px] '>

              </div>
            </div>

          </div>
        </div>
      </div>
    </RootLayout>
  )
}
