import {
  GetSSPropsResult,
  User
} from '@/types'

export const requirePermission = (user: User): GetSSPropsResult => {
  const props = { user };
  if (user.Rol === 'non-registered') {
    return { props, redirect: { destination: '/' } };
  } else {
    return { props };
  }
}

export const requireNoPermission = (user: User): GetSSPropsResult => {
  const props = { user };
  if (user.Rol !== 'non-registered') {
    return { props, redirect: { destination: '/' } };
  } else {
    return { props };
  }
}
