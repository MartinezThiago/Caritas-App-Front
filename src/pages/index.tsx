import type {
  NextApiRequest,
  NextApiResponse
} from 'next'
import { CardProductProps } from '@/types'
import axios from 'axios'
import RootLayout from '../layouts/root-layout'
import TradeOfferProduct from '@/components/trade-offer-product'
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
          key={e.id_post}
          id_post={e.id_post}
          img_src={e.img_src}
          title={e.title}
          description={e.description}
          categorie={e.categorie}
          state={e.state}
        />
      )
    })
    return cards;
  }

  return <RootLayout user={user}>
    <main className=''>
      {/*<div className='bg-white w-[30vw] border-r-4 border-r-blue-900'>
        DIV SEARCHBAR
      </div>
      */}
      <div className='flex flex-wrap justify-center items-center mt-[1rem] w-[70vw]'>
        {CardsProducts()}
      </div>
      <div className='flex'>
        <TradeOfferProduct
            key={1}
            id_post={'1'}
            img_src={''}
            title={'Fibrones'}
            description={'Estos son fibrones usados'}
            categorie={'utiles'}
            state={'usado'}
          />
        </div>
    </main>
  </RootLayout>
}
