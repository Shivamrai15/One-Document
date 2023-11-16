import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import './globals.css';

import { ThemeProvider } from '@/providers/theme-provider';
import { ConvexClientProvider } from '@/providers/convex-provider';
import { ModalProvider } from '@/providers/modal-provider';
import { EdgeStoreProvider } from '@/lib/edgestore';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'One Notebook',
    description : "One Notebook is a revolutionary document editing platform that empowers your ideas with seamless organization, boundless creativity, and user-friendly features.",
    keywords : ["document editing",
    "organization",
    "creativity",
    "user-friendly",
    "infinite child documents",
    "customizable icons",
    "cover images",
    "expandable sidebar",
    "mobile support",
    "file management",
    "trash can",
    "soft delete",
    "publish to web",
    "collapsible sidebar",
    "landing page",
    "recover deleted files",
    "innovative",
    "user-centric design"]
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <link rel="icon" href="/logo.ico" sizes="any" />
            <body className={inter.className}>
                <ConvexClientProvider>
                    <EdgeStoreProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                            storageKey = "onenotebook-theme"
                        >
                            <Toaster position='bottom-center'/>
                            <ModalProvider/>
                            {children}
                        </ThemeProvider>
                    </EdgeStoreProvider>
                </ConvexClientProvider>
            </body>
        </html>
    )
}
