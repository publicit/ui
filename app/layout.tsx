import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Publicit UX',
  description: '',
}

const versionInfo = {
  // TODO: this is not showing up, need to include in Dockerfile
  version: process.env.REACT_APP_TAG_NAME,
  hash: process.env.REACT_APP_GIT_COMMIT,
};
if (versionInfo.version) {
  console.table(versionInfo);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <NavBar />
        <div className="content-baseline">
          {children}
        </div>
      </body>
    </html>
  )
}
