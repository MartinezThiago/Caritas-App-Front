import { GetSSPropsResult, User } from '@/types'
import { deleteCookie } from 'cookies-next'

export const requirePermission = (user: User): GetSSPropsResult => {
  const props = { user }
  if (user.role === 'non-registered') {
    return { props, redirect: { destination: '/' } }
  } else {
    return { props }
  }
}

export const clearCookies = (req: any, res: any, destination?: string) => {
  deleteCookie('access', { req, res })
  return { redirect: { destination: destination ?? '/' } }
}

export const requireNothing = (user: User): GetSSPropsResult => {
  const props = { user }
  return { props }
}

export const requireNoPermission = (user: User): GetSSPropsResult => {
  const props = { user }
  if (user.role !== 'non-registered') {
    return { props, redirect: { destination: '/' } }
  } else {
    return { props }
  }
}
