import '@styles/globals.css'
import Nav from "@components/Nav"
import Footer from '@components/Footer'


export const metadata = {
    title: "Coding Buddy",
    descripton: "An app that allows you to find people with same coding prefferences as you.",
}

function RootLayout({children}) {
  return (
    <html lang="en">
        <body>
            <div className='main'>
                <div className='gradient'/>
            </div>
            <main className='app'>
                <Nav />
                {children}
                <Footer />
            </main>
        </body>
    </html>
  )
}

export default RootLayout