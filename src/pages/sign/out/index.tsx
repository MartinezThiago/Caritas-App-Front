import { GetSSPropsResult } from "@/types"
import { getUser } from "@/utils/cookies"
import { clearCookies, requireNoPermission, requireNothing, requirePermission } from "@/utils/permissions"
import {serialize} from 'cookie';
import { getCookie, hasCookie } from "cookies-next";
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
}>): Promise<any> {
  return clearCookies(req, res)
}

export default function Signout() {
    return(
        <></>
    )
}

