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
export interface userInfo {
  foto: string,
  nombre: string,
  apellido: string,
  dni: string,
  email: string,
  fechaNacimiento: string,
  registradoDesde: string,
  center: string
  rol: string
}


export default function UsersSistemList({ user }: { user: User }) {
  const router = useRouter()
  const [userRaw, setUserRaw] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [rolChecked, setRolChecked] = useState('Todos')
  const rolesOrder = ['administrador', 'voluntario', 'basico'];
  function parseText(rol: string) {
    if (rol === 'usuario_basico') {
      return 'basico'
    } else if (rol === 'admin_centro') {
      return 'administrador'
    } else {
      return 'voluntario'
    }
  }
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
    getUserList();

  }, [])
  const getBorderColor = (rol: string, styles: string) => {
    if (rol === 'admin_centro') {
      return `border-s-rose-700 ${styles}`;
    } else if (rol === 'voluntario') {
      return `border-s-blue-900 ${styles}`;
    } else {
      return `border-s-gray-400 ${styles}`;
    }
  };
  const UserList = (rolUser: string) => {
    if (userRaw) {
      const userL = userRaw!.map((e: any) => {
        console.log(e);
        
        return (
          <tr key={e.email} className='border-b-[1px]'>
            <td className={getBorderColor(e.rol, 'border-s-[4px] border-gray-300 p-[8px] flex justify-center')}>
              <img src={e.foto} alt="Foto" className='w-[45px] h-[45px] rounded-[50%]' />
            </td>
            <td className='p-[8px]'>{e.nombre} <span className='font-semibold text-black'>{user.email === e.mail ? '(Tú)' : ''}</span></td>
            <td className='p-[8px]'>{e.apellido}</td>
            <td className='p-[8px]'>{e.dni}</td>
            <td className='p-[8px]'>{e.mail}</td>
            <td className='p-[8px]'>{e.fecha_nacimiento}</td>
            <td className='p-[8px]'>{e.fecha_registro}</td>
            <td className='p-[8px]'>{e.centro === -1 ? '-' : e.centro}</td>
            <td className='p-[8px]'>{parseText(e.rol)}</td>
            <td className='border-e-[1px] border-gray-300 p-[8px]'> {e.rol === 'voluntario' ?
              <div>
                <button
                  key='confirm-trade'
                  className='w-[100px] mx-[10px] py-[5px] bg-rose-700 rounded-bl-[10px] text-white hover:font-semibold hover:bg-white hover:text-rose-700 hover:border-[2px] hover:border-rose-700'
                  type={ButtonEnum.BUTTON}
                  onClick={() => {
                    _handleBorrarVoluntario(e.id)

                  }}
                >
                  Borrar
                </button>
                <button
                  key='confirm-trade'
                  className='w-[100px] py-[5px] bg-blue-900 rounded-br-[10px] text-white hover:font-semibold hover:bg-white hover:text-blue-900 hover:border-[2px] hover:border-blue-900'
                  type={ButtonEnum.BUTTON}
                  onClick={() => {
                    _handleModificarVoluntario(e.id)

                  }}
                >
                  Modificar
                </button>
              </div> : '-'}</td>
          </tr>
        )
      })
      console.log(userL);

      //userL.sort((a, b) => a.props.children[8].props.children - b.props.children[8].props.children)
      userL.sort((a, b) => {
        return rolesOrder.indexOf(a.props.children[8].props.children) - rolesOrder.indexOf(b.props.children[8].props.children)
      })
      return rolUser == 'Todos' ? userL : userL.filter(x => x.props.children[8].props.children == rolUser)
    }
  }

  useEffect(() => {
    // Simula una carga de datos
    setTimeout(() => {
      setIsLoading(false) // Cambia isLoading a false después de 2 segundos
    }, 400)
  }, [])
  const handleChange = (event: any) => {
    setRolChecked(event.target.value);
  };
  const _handleBorrarVoluntario = async (e: number) => {
    console.log('Voluntario a borrar: ' + e);
  }
  const _handleModificarVoluntario = async (e: number) => {
    console.log('Voluntario a modificar: ' + e);
  }
  return (
    <RootLayout user={user}>
      {isLoading ? (
        <div className="flex justify-center mt-[50px]">
          <div className="">
            <Loading />
          </div>
        </div>
      ) : userRaw.length === 0 ? <p className="text-2xl font-bold text-gray-500 mt-[20px] m-auto">No hay usuarios en el sistema</p> :
        <div className='mt-[40px]'>
          <div className='w-[75vw] flex m-auto'>
            <div className='w-[100%] flex justify-between'>
              <select id="role-select" value={rolChecked} onChange={handleChange} className='ps-[10px] hover:cursor-pointer w-[200px] h-[40px] font-semibold text-black'>
                <option value="Todos">Todos</option>
                <option value="usuario_basico">Básico</option>
                <option value="voluntario">Voluntario</option>
                <option value="admin_centro">Administrador</option>
              </select>
              <button
                key='Post'
                className=' text-white rounded-lg py-[10px] px-14 outline-transparent	outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                onClick={() => router.push('/')}
              >
                Crear voluntario
              </button>
            </div>
          </div>
          <div className='flex justify-center mt-[40px]'>

            <table style={{ width: '75vw', borderCollapse: 'collapse' }}>
              <thead>
                <tr className='text-gray-600 '>
                  <th className='border-b-[1px] border-s-[1px] border-gray-300 p-[8px]'>Foto</th>
                  <th className='border-b-[1px] border-x-[1px] border-gray-300 p-[8px]'>Nombre</th>
                  <th className='border-b-[1px] border-x-[1px] border-gray-300 p-[8px]'>Apellido</th>
                  <th className='border-b-[1px] border-x-[1px] border-gray-300 p-[8px]'>DNI</th>
                  <th className='border-b-[1px] border-x-[1px] border-gray-300 p-[8px]'>E-mail</th>
                  <th className='border-b-[1px] border-x-[1px] border-gray-300 p-[8px]'>Fecha de nacimiento</th>
                  <th className='border-b-[1px] border-x-[1px] border-gray-300 p-[8px]'>Registrado desde</th>
                  <th className='border-b-[1px] border-x-[1px] border-gray-300 p-[8px]'>Center</th>
                  <th className='border-b-[1px] border-x-[1px] border-gray-300 p-[8px]'>Rol</th>
                  <th className='border-b-[1px] border-e-[1px] border-gray-300 p-[8px]'>Action</th>
                </tr>
              </thead>
              <tbody className='text-center text-black'>
                {rolChecked == 'voluntario' ? UserList('voluntario') : rolChecked == 'admin_centro' ? UserList('administrador') : rolChecked == 'usuario_basico' ? UserList('basico') : UserList('Todos')}
              </tbody>
            </table>
          </div>

        </div>}
    </RootLayout>
  )
}
