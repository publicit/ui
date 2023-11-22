import {Inter} from "next/font/google";
import "./globals.css";
import {ColorSchemeScript, MantineProvider} from '@mantine/core';
import AuthProvider from "@/app/api/auth/Provider";
import NavBar from "@/app/NavBar";


const inter = Inter({subsets: ["latin"]});

const env = process.env;
const versionInfo = {
    version: env["NEXT_PUBLIC_TAG_NAME"],
    hash: env["NEXT_PUBLIC_GIT_COMMIT"],
};
if (versionInfo.version) {
    // TODO: make this work with nextjs deployments
    console.table(versionInfo);
}

export const metadata = {
    title: 'Publicit UX',
    description: '',
};

export default function RootLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <head>
            <ColorSchemeScript/>
        </head>
        <body>
        <MantineProvider>
            <AuthProvider>
                <NavBar/>
                {children}
            </AuthProvider>
        </MantineProvider>
        </body>
        </html>
    );
}
