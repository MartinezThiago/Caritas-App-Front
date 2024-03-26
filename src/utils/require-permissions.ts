import {
  GetSSPropsResult,
  Role,
  User
} from '@/types'

/**
 * Function to require a specific role to access a page.
 * @arg {User} user : User object to check the role.
 * @arg {Role} requiredRole : Role required to access the page.
 * @arg {string} destination : Destination to redirect.
 */
export const requirePermission = (
  user: User,
  requiredRole: Role = 'non-registered',
  destination: string = '/'
): GetSSPropsResult => {
  const props = { user }
  if (requiredRole === 'non-registered' && user.role !== 'non-registered') {
    return { props, redirect: { destination: '/' } }
  }
  if (user.role !== requiredRole) {
    return { props, redirect: { destination: destination ? destination : '/' } }
  }
  return { props }
}
