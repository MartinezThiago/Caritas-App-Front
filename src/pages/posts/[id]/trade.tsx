import { GetSSPropsResult } from '@/types'
import { getUser, requirePermission } from '@/utils'
import { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'

export async function getServerSideProps ({
  req,
  res
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
}>): Promise<GetSSPropsResult> {
  return requirePermission(getUser(req, res), 'usuario_basico')
}

export default function Trade () {
  const router = useRouter()
  return (
    <div>
      <h1>Trade, {router.query.id}</h1>
    </div>
  )
}
