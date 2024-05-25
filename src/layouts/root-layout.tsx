import Image from 'next/image'
import Link from 'next/link'
import caritasLogo from 'public/caritas-logo.svg'
import profilePicDefault from 'public/profile-pic-default.jpg'
import { User } from '@/types'
import { useEffect, useState } from 'react'

export default function RootLayout({
  user,
  children
}: Readonly<{
  user: User
  children: React.ReactNode
}>) {
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pic = localStorage.getItem('profilePic');
      if (pic) {
        setProfilePic(pic);
      }
    }
  }, []);
  return <><header
    className='font-semibold h-[3rem]'
  >
    <Image
      alt='Logo Cáritas'
      src={caritasLogo}
      className='w-[3rem] h-[3rem] '
    />
    <Link
      key='link-home'
      href='/'
    >
      Inicio
    </Link>
    {/* <Link
      key='link-we'
      href='/we'
    >
      Nosotros
    </Link> */}
    {
      user.role === 'non-registered' ? <>
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
          className='me-[10px]'
        >
          Registrarse
        </Link>
      </> :
        user.role === 'usuario_basico' ? <>
          <Link
            key='link-user-posts'
            href='/user/posts'
          >
            Mis publicaciones
          </Link>
          <Link
            key='link-user-favs'
            href='/user/favs'
            
          >
            Favoritos
          </Link>
          <Link
            key='link-trade-user-offers'
            href='/user/trade-offers'
          >
            Ofertas de intercambio
          </Link>
          <Link
            key='link-pending-trades-user-'
            href='/user/pending-trades'
          >
            Intercambios pendientes
          </Link>
          
          <div
            key='header-separator'
            className='flex-grow'
          />
          <Link
            key='link-user'
            href='/user'
          >
            <div className='flex items-center'>
              <Image alt={`userProfilePic`} className={'me-[10px] w-[30px] rounded-full'} src={profilePic ? profilePic : profilePicDefault} width={0} height={0} />
              {user.name}
            </div>
          </Link>
          <Link
            key='link-signout'
            href='/sign/out/a'
            className='me-[10px]'
          >
            Cerrar Sesión
          </Link>
        </> : <>
          {/* <Link
            key='link-statistics'
            href='/statistics'
          >
            Estadísticas
          </Link> */}
          <div
            key='header-separator'
            className='flex-grow'
          />
          <Link
            key='link-user'
            href='/user'
          >
            <div className='flex items-center'>
              <Image alt={`userProfilePic`} className={'me-[10px] w-[30px] rounded-full'} src={profilePic ? profilePic : profilePicDefault} width={0} height={0} />
              {user.name}
            </div>
          </Link>
          <Link
            key='link-signout'
            href='/sign/out/sign-in'
            className='me-[10px]'
          >
            Cerrar Sesión
          </Link>
        </>
    }
  </header>
    {children}
  </>
}
