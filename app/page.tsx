import Link from "next/link"

export default function Home() {



  return (
    <main className="flex flex-col min-h-screen items-center justify-center mb-24 p-6">
  {/* Flex layout */}
  <h1 className="text-6xl head_text font-extrabold mb-4 mt-8 text-center" style={{ lineHeight: 1.4 }}>
    {/* Adjust line height */}
    Searching for a person with the same <span className="purple_gradient">coding</span> preferences?
  </h1>
  <p className="text-4xl font-bold text-center mb-8 mt-8" style={{ lineHeight: 1.1 }}>
    {/* Adjust line height and reduce top margin */}
    We got you <span className="blue_gradient">covered!</span>
  </p>
  <Link href="/find-buddy">
    <button className="black_btn h-20 w-72 mt-4">
      {/* Reduce top margin */}
      <h1 className="text-4xl font-extrabold">Explore</h1>
    </button>
  </Link>
</main>

  

  )
}
