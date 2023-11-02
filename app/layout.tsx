import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import AuthProvider from "./api/auth/Provider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Publicit UX",
    description: "",
};
const env = process.env;
const versionInfo = {
    version: env["NEXT_PUBLIC_TAG_NAME"],
    hash: env["NEXT_PUBLIC_GIT_COMMIT"],
};
if (versionInfo.version) {
    // TODO: make this work with nextjs deployments
    console.table(versionInfo);
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="dark">
        <AuthProvider>
            <body className={inter.className}>
                <NavBar/>
                <div className="content-baseline">{children}</div>
            </body>
        </AuthProvider>
        </html>
    );
}
