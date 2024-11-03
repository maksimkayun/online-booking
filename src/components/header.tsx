'use client'

import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from './ui/button'

export function Header() {
    const { data: session } = useSession()

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold">
                    Hotel Booking
                </Link>
                <nav className="flex gap-4 items-center">
                    {session ? (
                        <>
                            <Link href="/bookings">My Bookings</Link>
                            <Button onClick={() => signOut()}>Sign Out</Button>
                        </>
                    ) : (
                        <Button onClick={() => signIn('google')}>Sign In</Button>
                    )}
                </nav>
            </div>
        </header>
    )
}