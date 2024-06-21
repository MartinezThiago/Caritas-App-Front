import Select from '@/components/inputs/select'
import { Loading } from '@/components/loading'
import { ButtonEnum } from '@/components/types'
import { FRONT_BASE_URL } from '@/constants'
import RootLayout from '@/layouts/root-layout'
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

export async function getServerSideProps({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res))
}
export interface centerInfo {
  dias: any[],
  direccion: string,
  horario_apertura: string,
  horario_cierre: string,
  id_centro: string,
  nombre_centro: string,
  ubicacion: string,

}


export default function UsersSistemList({ user }: { user: User }) {
  const router = useRouter()
  const [centersRaw, setCentersRaw] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [locationChecked, setLocationChecked] = useState('Todos')

  useEffect(() => {
    const getCentersList = async () => {
      await axios
        .get<any[]>(`${FRONT_BASE_URL}/centers/get`)
        .then((res: any) => {
          setCentersRaw(res.data)
        })
        .catch((err: any) => {
          setCentersRaw([])
        })
    }
    getCentersList();

  }, [])
  const getFirstLetter = (day: string) => {
    return day[0] + day[1]
  }
  const getFirstLettersDays = (days: any[]) => {
    //console.log(days);
    const diasList: string[] = []
    days.map((e) => {
      diasList.push(getFirstLetter(e.descripcion))
    })

    return diasList.join(', ')

  };

  const LocationList = () => {
    if (centersRaw) {
      const rawLocationL = centersRaw!.map((e: any) => e.ubicacion);
      const noDupsLocationL = Array.from(new Set(rawLocationL))
      return noDupsLocationL.map((e) =>
        <option key={e} value={e}>{e}</option>
      )
    }
  }

  const CenterList = () => {
    if (centersRaw) {
      const centerL = centersRaw!.map((e: any) => {
        return (
          <tr key={e.id_centro} className='border-b-[1px] h-[50px]'>
            <td className='p-[8px] border-s-[1px] border-gray-300'>{e.nombre_centro}</td>
            <td className='p-[8px]'>{e.ubicacion}</td>
            <td className='p-[8px]'>{e.direccion}</td>
            <td className='p-[8px]'>{`${e.horario_apertura} ➜ ${e.horario_cierre}`}</td>
            <td className='p-[8px] font-medium text-gray-600 text-start'>{getFirstLettersDays(e.dias)}</td>
            <td className='border-e-[1px] border-gray-300 p-[8px]'>
              <button
                key='confirm-trade'
                className='w-[100px] mx-[10px] py-[5px] bg-rose-700 rounded-bl-[10px] text-white hover:font-semibold hover:bg-white hover:text-rose-700 hover:border-[2px] hover:border-rose-700'
                type={ButtonEnum.BUTTON}
                onClick={() => {
                  _handleBorrarCentro(e.id_centro)

                }}
              >
                Borrar
              </button>
              <button
                key='confirm-trade'
                className='w-[100px] py-[5px] bg-blue-900 rounded-br-[10px] text-white hover:font-semibold hover:bg-white hover:text-blue-900 hover:border-[2px] hover:border-blue-900'
                type={ButtonEnum.BUTTON}
                onClick={() => {
                  _handleModificarCentro(e.id_centro)

                }}
              >
                Modificar
              </button>
            </td>
          </tr>
        )
      })
      return locationChecked == 'Todos' ? centerL : centerL.filter(x => x.props.children[1].props.children == locationChecked)
    }
  }

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false) // Cambia isLoading a false después de 2 segundos
    }, 400)
  }, [])
  const handleChange = (event: any) => {
    setLocationChecked(event.target.value);
  };
  const _handleBorrarCentro = async (e: number) => {
    console.log('Centro a borrar: ' + e);
  }
  const _handleModificarCentro = async (e: number) => {
    console.log('Centro a modificar: ' + e);
  }
  return (
    <RootLayout user={user}>
      {isLoading ? (
        <div className="flex justify-center mt-[50px]">
          <div className="">
            <Loading />
          </div>
        </div>
      ) : centersRaw.length === 0 ? <p className="text-2xl font-bold text-gray-500 mt-[20px] m-auto">No hay centros cargados en el sistema</p> :
        <div className='mt-[40px]'>
          <div className='w-[75vw] flex m-auto'>
            <div className=' w-[100%] flex justify-between'>
              <select id="location-select" value={locationChecked} onChange={handleChange} className='ps-[10px] hover:cursor-pointer w-[300px] h-[40px] font-semibold text-black'>
                <option value="Todos">Todos los centros</option>
                {LocationList()}
              </select>
              <button
                key='Post'
                className=' text-white rounded-lg py-[10px] px-14 outline-transparent	outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                onClick={() => router.push('/')}
              >
                Crear centro
              </button>
            </div>
          </div>
          <div className='flex justify-center mt-[40px]'>

            <table style={{ width: '75vw', borderCollapse: 'collapse' }}>
              <thead>
                <tr className='text-gray-600'>
                  <th className='border-b-[1px] border-s-[1px] border-gray-300 p-[8px]'>Nombre</th>
                  <th className='border-b-[1px] border-x-[1px] border-gray-300 p-[8px]'>Ubicacion</th>
                  <th className='border-b-[1px] border-x-[1px] border-gray-300 p-[8px]'>Direccion</th>
                  <th className='border-b-[1px] border-x-[1px] border-gray-300 p-[8px]'>Desde ➜ Hasta</th>
                  <th className='border-b-[1px] border-x-[1px] border-gray-300 p-[8px]'>Dias</th>
                  <th className='border-b-[1px] border-x-[1px] border-e-[1px] border-gray-300 p-[8px]'>Action</th>
                </tr>
              </thead>
              <tbody className='text-center text-black'>
                {CenterList()}
              </tbody>
            </table>
          </div>
        </div>
      }
    </RootLayout >
  )
}
