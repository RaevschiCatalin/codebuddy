import React, { ReactNode } from 'react'; // Import ReactNode type

import '@styles/globals.css';
import Nav from "@components/Nav";
import Footer from '@components/Footer';

export const metadata = {
    title: "Coding Buddy",
    descripton: "An app that allows you to find people with same coding prefferences as you.",
    icons: {
        icon: '/assets/favicon.ico',
    },
}

function RootLayout({ children }: { children: ReactNode }) { // Explicitly define children type as ReactNode
    return (
        <html lang="en">
            <body>
                <div className='main'>
                    <div className='gradient' />
                </div>
                <main className='app'>
                    <Nav />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    );
}

export default RootLayout;
