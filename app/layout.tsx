import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Aside from './components/Aside';

const rubik = Rubik({
    variable: '--font-rubik',
    subsets: ['latin'],
    weight: ['400', '500', '700'], // pick the weights you need
});

export const metadata: Metadata = {
    title: 'SIMS',
    description: 'Software Instalation Management System',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${rubik.variable} h-full antialiased`}>
            <body>
                <Header />
                <main className="min-h-screen text-black bg-white  flex flex-col">
                    <Aside />
                    {children}
                </main>
            </body>
        </html>
    );
}
