import type {
  NextApiRequest,
  NextApiResponse
} from 'next'
import axios from 'axios'
import RootLayout from '../layouts/root-layout'
import { CardProduct } from '@/components'
import { User } from '@/types'
import { getUser } from '@/utils'
import {
  useEffect,
  useState
} from 'react'
import { FRONT_BASE_URL } from '@/constants'

export async function getServerSideProps({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<{
  props: {
    user: User
  }
}> {
  return {
    props: {
      user: getUser(
        req,
        res
      )
    }
  }
}

export default function Home({ user }: { user: User }) {
  const [cardsData, setCardsData] = useState<any[]>()

  useEffect(() => {
    const getProducts = async () => {
      const {data:cardsData} = await axios.get<any[]>(`${FRONT_BASE_URL}posts/get`)

      setCardsData(cardsData)
    }
    getProducts()
  }, [])
  if(!cardsData){
    return null
  }
  const CardsProducts=()=>{
    const cards = cardsData!.map((e: any) => {
      return (
        <CardProduct
          key={e.id}
          id={e.id}
          multimedia={e.img_src}
          titulo={e.titulo}
          descripcion={e.descripcion}
          nombre_categoria_producto={e.nombre_categoria_producto}
          nombre_estado_producto={e.nombre_estado_producto}
          ubicacion_trade={e.ubicacion_trade}
        />
      )
    })
    return cards;
  }

  return <RootLayout user={user}>
    <main className='flex'>
      <div className='bg-white w-[30vw] border-r-4 border-r-blue-900'>
      </div>
      <div className='flex flex-wrap justify-center items-center mt-[1rem] w-[70vw]'>
        {CardsProducts()}
      </div>
    </main>
  </RootLayout>
}
