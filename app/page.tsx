import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-4 p-24">
      <h1 className="text-6xl font-extrabold text-center">Searching for a person with the same <span className='purple_gradient'> coding</span> prefferences?</h1>
      <p className="text-4xl font-bold text-center">We got you covered!</p>
      <div>
        <Image src="/assets/user.png" width={50} height={50} alt='user' />
        
      </div>
    </main>
  )
}
