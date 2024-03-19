import './globals.css'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import type { Metadata } from 'next'
import { User } from '@/types'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'InterCáritas',
  description: 'Sistema de intercambios solidarios'
}

const user: User = {
  name: 'johndoe',
  email: 'johndoe@email.com',
  role: 'volunter'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <html lang='en'>
    <body className={inter.className}>
      <header>
        <Link href='/'>Inicio</Link>
        <Link href='/nosotros'>Nosotros</Link>
        <Link href='/preguntas'>Preguntas</Link>
        {
          user.role === undefined ? <>
            <div className='flex-grow'></div>
            <Link href='/iniciar-sesion'>Iniciar Sesión</Link>
            <Link href='/registrarse'>Registrarse</Link>
          </> :
            user.role === 'nominal' ? <>
              <div className='flex-grow'></div>
              <Link href='/cerrar-sesión'>{user.name}</Link>
              <Link href='/cerrar-sesión'>Cerrar Sesión</Link>
            </> : <>
              <Link href='/cerrar-sesión'>Estadísticas</Link>
              <div className='flex-grow'></div>
              <Link href='/cerrar-sesión'>{user.name}</Link>
              <Link href='/cerrar-sesión'>Cerrar Sesión</Link>
            </>
        }
      </header>
      {children}
    </body>
  </html>
}
