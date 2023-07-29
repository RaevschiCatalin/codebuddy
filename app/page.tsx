import DisplayLogButton from '@components/DisplayLogButton';

export default function Home() {


  return (
    <main className="flex flex-col min-h-screen items-center justify-center mb-24 p-6">
  <h1 className="text-6xl head_text font-extrabold mb-4 mt-8 text-center" style={{ lineHeight: 1.4 }}>
    Searching for a person with the same <span className="purple_gradient">coding</span> preferences?
  </h1>
  <p className="text-4xl font-bold text-center mb-8 mt-8" style={{ lineHeight: 1.1 }}>
    We got you <span className="blue_gradient">covered!</span>
  </p>
  <DisplayLogButton />
</main>

  )
}
