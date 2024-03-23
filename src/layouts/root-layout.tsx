import Image from 'next/image'
import Link from 'next/link'
import caritasLogo from 'public/caritas-logo.svg'

import { User } from '@/types'

export default function RootLayout({
  user,
  children
}: Readonly<{
  user: User
  children: React.ReactNode
}>) {
  return <><header
    className='font-bold'
  >
    <Image
      alt='Logo Cáritas'
      src={caritasLogo}
      className='w-[3rem]'
    />
    <Link
      key='link-home'
      href='/'
    >
      Inicio
    </Link>
    <Link
      key='link-we'
      href='/we'
    >
      Nosotros
    </Link>
    {
      user.Rol === 'non-registered' ? <>
        <div
          key='header-separator'
          className='flex-grow'
        />
        <Link
          key='link-signin'
          href='/sign/in'
        >
          Iniciar Sesión
        </Link>
        <Link
          key='link-signup'
          href='/sign/up'
        >
          Registrarse
        </Link>
      </> :
        user.Rol === 'usuario_basico' ? <>
          <div
            key='header-separator'
            className='flex-grow'
          />
          <Link
            key='link-user'
            href='/user'
          >
            {user.Nombre}
          </Link>
          <Link
            key='link-signout'
            href='/signout'
          >
            Cerrar Sesión
          </Link>
        </> : <>
          <Link
            key='link-statistics'
            href='/statistics'
          >
            Estadísticas
          </Link>
          <div
            key='header-separator'
            className='flex-grow'
          />
          <Link
            key='link-user'
            href='/user'
          >
            {user.Nombre}
          </Link>
          <Link
            key='link-signout'
            href='/signout'
          >
            Cerrar Sesión
          </Link>
        </>
    }
  </header>
    {children}
  </>
}
