'use client'

import {useSession} from "next-auth/react";
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    const {status, data: session} = useSession()
    return (
        <div className="flex p-3 space-x-3">
            <Link href="/" className="mr-5">Inicio</Link>
            <Link href="/share">Compartir</Link>
            {status === 'loading' && <div>Loading...</div>}
            {status === 'authenticated' &&
                <div className="flex space-x-3">
                    <span>{session.user!.name}</span>
                    <Link href="/api/auth/signout">Sign Out</Link>
                </div>
            }
            {status === 'unauthenticated' && <Link href="/api/auth/signin">Login</Link>}
        </div>
    )
}

export default NavBar