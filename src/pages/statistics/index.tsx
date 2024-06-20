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

export async function getServerSideProps ({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<GetSSPropsResult> {
  return requireNothing(getUser(req, res))
}

export default function UsersSistemList ({ user }: { user: User }) {
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
      <></>
    </RootLayout>
  )
}
