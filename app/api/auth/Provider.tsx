'use client'

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface Params {
    children: ReactNode
}

const AuthProvider = ({children}: Params ) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default AuthProvider