import type {
  NextApiRequest,
  NextApiResponse
} from 'next'

import RootLayout from '../layouts/root-layout'
import { User } from '@/types'
import { getUser } from '@/utils'

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
  return <RootLayout user={user}>
    <main>
      <h1>InterCáritas</h1>
    </main>
  </RootLayout>
}
