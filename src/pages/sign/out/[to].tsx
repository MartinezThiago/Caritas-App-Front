import { clearCookies } from '@/utils/permissions'

import { NextApiRequest, NextApiResponse } from 'next'

/**
 * Gets the user from the request and response objects in the server side and pass it
 * to the page component.
 */
export async function getServerSideProps ({
  req,
  res,
  params
}: Readonly<{
  req: NextApiRequest
  res: NextApiResponse
  params: { to: string }
}>): Promise<any> {
  const to = params.to
  return clearCookies(
    req,
    res,
    to.length > 1 ? '/' + to.replaceAll('-', '/') : '/'
  )
}

export default function Signout () {
  return <></>
}
