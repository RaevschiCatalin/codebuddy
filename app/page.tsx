import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">Searching for a person with the same <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'> coding</span> prefferences?</h1>
      <p className="text-2xl text-center">We got you covered!</p>
      
    </main>
  )
}
