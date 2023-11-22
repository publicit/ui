import type {Metadata} from "next";
import "./globals.css";
import NavBar from "./NavBar";
import AuthProvider from "./api/auth/Provider";

export const metadata: Metadata = {
    title: "Publicit UX",
    description: "",
};

export default function RootLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" data-theme="dark">
        <AuthProvider>
            <body>
            <NavBar/>
            <div className="content-baseline">{children}</div>
            </body>
        </AuthProvider>
        </html>
    );
}
