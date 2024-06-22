import CenterDescription from '@/components/center-description'
import { FRONT_BASE_URL } from '@/constants'
import RootLayout from '@/layouts/root-layout'
import { GetSSPropsResult, User, days } from '@/types'
import { getUser } from '@/utils'
import { requirePermission } from '@/utils/permissions'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import Image from 'next/image'
import router from 'next/router'
import profilePicDefault from 'public/profile-pic-default.jpg'
import { useEffect, useState } from 'react'

export async function getServerSideProps({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<GetSSPropsResult> {
  return requirePermission(getUser(req, res))
}

interface centerBody {
  id_centro: number
  nombre_centro: string
  ubicacion: string
  direccion: string
  horario_apertura: string
  horario_cierre: string
  dias: days[]
}

export default function UserInfo({ user }: { user: User }) {
  // console.log(user);
  const [rol, setRol] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [centersUser, setCentersUser] = useState([])
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pic = localStorage.getItem('profilePic')
      if (pic) {
        setProfilePic(pic)
      }
    }
    if (user.role == 'usuario_basico') {
      setRol('Basico')
    } else if (user.role == 'admin_centro') {

      setRol('Administrador')
    } else {
      setRol('Voluntario')
    }
  }, [])

  useEffect(() => {
    if (user.role == 'usuario_basico' || user.role == 'voluntario') {
      const getCenters = async () => {
        await axios.get(`${FRONT_BASE_URL}centers-user/get`).then((res: any) => {
          user.role == 'voluntario' ? setCentersUser([res.data as never]) : setCentersUser(res.data)

        })
      }
      getCenters()
    }
  }, [])

  const Centers = () => {
    const center = centersUser!.map((e: centerBody) => {
      return (
        <CenterDescription
          key={e.id_centro}
          idCenter={e.id_centro}
          name={e.nombre_centro}
          location={e.ubicacion}
          address={e.direccion}
          openingTime={e.horario_apertura}
          closingTime={e.horario_cierre}
          workDays={e.dias}
          onPost={false}
          //CAMBIAR
          deletedCenter={true}
        />
      )
    })
    return center
  }

  return (
    <RootLayout user={user}>
      <div>
        <div className='flex justify-center mt-[30px] h-[40vh]'>
          <div className='bg-rose-700 w-[0.5px] h-[100%] mx-[30px]'></div>
          <div className='text-black flex flex-col justify-between'>
            <div>
              <p className='font-bold text-black text-xl'>Datos personales</p>
              <div className='mt-[10px] ms-[15px]'>
                <p className='my-[5px]'>
                  <span className='font-semibold'>Nombre: </span>
                  {user.name}
                </p>
                <p className='my-[5px]'>
                  <span className='font-semibold'>Apellido: </span>
                  {user.surname}
                </p>
                <p className='my-[5px]'>
                  <span className='font-semibold'>DNI: </span>
                  {user.dni}
                </p>
                <p className='my-[5px]'>
                  <span className='font-semibold'>Fecha de nacimiento: </span>
                  {user.birthdate}
                </p>
                <p className='my-[5px]'>
                  <span className='font-semibold'>Correo: </span>
                  {user.email}
                </p>
                <p className='my-[5px]'>
                  <span className='font-semibold'>Tipo de usuario: </span>
                  {rol}
                </p>
              </div>
            </div>
            {user.role == 'usuario_basico' ? (
              <button
                key='ChangeData'
                className='w-[100%] text-white rounded-lg py-[10px] outline-transparent outline bg-rose-700 font-semibold hover:bg-white hover:outline-[3px] hover:text-rose-700 hover:outline-rose-700 active:text-white active:bg-rose-700 duration-200'
                onClick={() => router.push('/user/update')}
              >
                Cambiar datos personales
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className='bg-rose-700 w-[0.5px] h-[100%] mx-[30px]'></div>
          <div className='flex flex-col items-center'>
            <p className='font-bold text-black text-xl '>Foto de perfil</p>
            <Image
              alt={`userProfilePic`}
              className={'w-[200px] rounded-full mt-[10px]'}
              src={profilePic ? profilePic : profilePicDefault}
              width={0}
              height={0}
            />
          </div>
          <div className='bg-rose-700 w-[0.5px] h-[100%] mx-[30px]'></div>
          <div>
            {user.role == 'usuario_basico' ? (
              <div className=''>
                <p className='font-bold text-black text-xl'>
                  Centros elegidos:
                </p>
                <div className='mt-[10px] ms-[15px]'>{Centers()}</div>
              </div>
            ) : user.role == 'voluntario' ? (
              <div>
                <p className='font-bold text-black text-xl'>Voluntario en</p>
                <div className='mt-[10px] ms-[15px]'>{Centers()}</div>
              </div>
            ) : (
              <></>
            )}
          </div>

          {user.role != 'admin_centro' ? <div className="bg-rose-700 w-[0.5px] h-[100%] mx-[30px]"></div> : <></>}

        </div>
      </div>
    </RootLayout>
  )
}
