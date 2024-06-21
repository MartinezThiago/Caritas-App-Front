import { SimpleBarCharts, SimplePieCharts } from '@/components'
import ExtendedPostCard from '@/components/extended-post-card'
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

export default function UsersSistemList({ user }: { user: User }) {
  const router = useRouter()
  const [postData, setPostData] = useState<PostDataAdapter>()

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

  return (
    <RootLayout user={user}>
      <div className='flex flex-col items-center'>
        <div className=''>
          <p className="text-xl font-semibold text-blue-900  mt-[20px] m-auto">
            ESTADISTICAS
          </p>
        </div>
        <div>
          <div className='flex mt-[40px]'>
            <div className='me-[60px]'>
              <SimpleBarCharts
                data={[
                  {
                    nombre: "Santa Rosa", CantidadConfirmados: 41, CantidadRechazados: 10
                  },
                  {
                    nombre: "Saladillo", CantidadConfirmados: 10, CantidadRechazados: 4
                  },
                  {
                    nombre: "La Plata", CantidadConfirmados: 13, CantidadRechazados: 3
                  }
                ]}
                type='center' />
            </div>
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
          </div>
          <div className='w-[800px] bg-blue-900 rounded-[10px]'>
            <div className='w-[100%] h-[100%] p-[20px] text-white '>
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
                  Estadistica 3: </span>
              </p>
              <p className="text-lg flex justify-between">
                <span className='font-semibold text-lg'>
                  Estadistica 4: </span>
              </p>
              <p className="text-lg flex justify-between">
                <span className='font-semibold text-lg'>
                  Estadistica 5: </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  )
}
