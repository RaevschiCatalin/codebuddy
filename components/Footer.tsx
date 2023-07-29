'use client';

import {Footer} from 'flowbite-react';
import Image from 'next/image';

export default function FooterWithLogo() {
    return (
        <Footer container className='fixed bottom-0'>
            <div className="w-full text-center">
                <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">

                    <Footer.LinkGroup className='gap-7'>
                        <Footer.Link href="/">
                            About
                        </Footer.Link>
                        <Footer.Link href="/">
                            Privacy Policy
                        </Footer.Link>
                        <Footer.Link href="/">
                            Licensing
                        </Footer.Link>
                        <Footer.Link href="/">
                            Contact
                        </Footer.Link>
                    </Footer.LinkGroup>
                    <Footer.Copyright
                        by="CodingBuddy™"
                        href="/"
                        year={2023}
                    />
                </div>
            </div>

        </Footer>
    )
}


