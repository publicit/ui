'use client'

import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div className="flex p-3 space-x-3">
        <Link href="/" className="mr-5">Inicio</Link>
        <Link href="/share">Compartir</Link>
    </div>
  )
}

export default NavBar