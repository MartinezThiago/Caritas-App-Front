import { IntroComponent } from '@/components'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`
        w-[100vw] h-[100vh]
        flex flex-col
        justify-top items-center
        bg-zinc-900 text-zinc-300
        ${inter.className}
    `}
    >
      <h1 className='max-w-max'>Next.js + Tailwind CSS + TypeScript</h1>
      <IntroComponent />
    </main>
  )
}
