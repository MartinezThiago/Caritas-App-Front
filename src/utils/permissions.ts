import {
  GetSSPropsResult,
  TokenName,
  User
} from '@/types'
import { getCookies, setCookie, getCookie, hasCookie, deleteCookie } from 'cookies-next';
import { NextApiRequest } from 'next/types';

export const requirePermission = (user: User): GetSSPropsResult => {
  const props = { user };
  if (user.Rol === 'non-registered') {
    return { props, redirect: { destination: '/' } };
  } else {
    return { props };
  }
}

export const clearCookies = (req:any,res:any)=> {
  deleteCookie('access',{req,res});
  return { redirect: { destination: '/' } }; 
}

export const requireNothing = (user: User): GetSSPropsResult => {
  const props = { user };
  return { props};
}

export const requireNoPermission = (user: User): GetSSPropsResult => {
  const props = { user };
  if (user.Rol !== 'non-registered') {
    return { props, redirect: { destination: '/' } };
  } else {
    return { props };
  }
}
