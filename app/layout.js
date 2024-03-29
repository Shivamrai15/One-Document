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
    description : "Craft worlds of words and visuals. Nest & Embed lets you create interconnected documents, enrich them with images, and share your immersive journeys. Dive deep, organize seamlessly, and express yourself like never before",
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
    "user-centric design"],
    openGraph: {
        images: ["https://res.cloudinary.com/dkaj1swfy/image/upload/v1707840762/zlhgsol9dxeuwwq8cvfk.png"],
        type : "website",
    },
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
