import '@/public/phosphor/duotone/duotone.css';
import '@/public/phosphor/regular/regular.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Plantinhas',
    description: 'Aprenda a cuidar de plantas',
    openGraph: {
        title: 'Plantinhas',
        description: 'Aprenda a cuidar de plantas',
        siteName: 'Plantinhas',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </head>

            <body
                className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
