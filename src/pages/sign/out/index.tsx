import { GetSSPropsResult } from "@/types"
import { getUser } from "@/utils/cookies"
import { requireNoPermission, requirePermission } from "@/utils/permissions"
import { setCookie } from "cookies-next"
import { NextApiRequest, NextApiResponse } from "next"

/**
 * Gets the user from the request and response objects in the server side and pass it
 * to the page component.
 */
export async function getServerSideProps({
    req,
    res
  }: Readonly<{
    req: NextApiRequest
    res: NextApiResponse
  }>): Promise<GetSSPropsResult> {
    setCookie('access','')
    return requirePermission(getUser(req, res))
  }

export default function Signout() {


    return(
        <h1>juju</h1>
    )
}