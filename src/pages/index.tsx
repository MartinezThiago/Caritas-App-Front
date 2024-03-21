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
      const { data: cardsData } = await axios.get<any[]>(`${FRONT_BASE_URL}posts/get`)
      console.log(cardsData)
      setCardsData(cardsData)
    }
    getProducts()
  }, [])

  if (!cardsData) {
    return null
  }

  const cards = cardsData.map((e: any) => {
    return (
      <CardProduct
        key={e.id_post}
        id={e.id_post}
        image_source={e.img_src}
        title={e.title}
        desc={e.description}
        categorie={e.categorie}
        state={e.state}
        style_class_card={'vertical'}
      />
    )
  })

  return <RootLayout user={user}>
    <main>
      {cards}
    </main>
  </RootLayout>
}
