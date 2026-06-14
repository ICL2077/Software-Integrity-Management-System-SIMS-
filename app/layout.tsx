import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Aside from './components/Aside';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import QueryPersistProvider from './providers/queryPersistProvider';

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
        <html lang="en" className={`${rubik.variable} antialiased`}>
            <body className="h-screen flex flex-col relative">
                <QueryPersistProvider>
                    <Header />
                    <main className="overflow-hidden h-full text-black bg-white flex flex-row">
                        <AppRouterCacheProvider>
                            <Aside />
                            <div className="w-full p-1">{children}</div>
                        </AppRouterCacheProvider>
                    </main>
                </QueryPersistProvider>
            </body>
        </html>
    );
}
