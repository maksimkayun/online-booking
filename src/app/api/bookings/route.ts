import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const bookings = await prisma.booking.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                room: {
                    include: {
                        hotel: true
                    }
                }
            },
            orderBy: {
                checkIn: 'desc'
            }
        })

        return NextResponse.json(bookings)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json()
        const { roomId, checkIn, checkOut } = body

        // Проверяем доступность комнаты
        const existingBooking = await prisma.booking.findFirst({
            where: {
                roomId,
                OR: [
                    {
                        checkIn: {
                            lte: new Date(checkOut),
                        },
                        checkOut: {
                            gte: new Date(checkIn),
                        },
                    },
                ],
            },
        })

        if (existingBooking) {
            return NextResponse.json(
                { error: 'Room is not available for selected dates' },
                { status: 400 }
            )
        }

        const booking = await prisma.booking.create({
            data: {
                roomId,
                userId: session.user.id,
                checkIn: new Date(checkIn),
                checkOut: new Date(checkOut),
                status: 'confirmed',
            },
            include: {
                room: {
                    include: {
                        hotel: true,
                    },
                },
            },
        })

        return NextResponse.json(booking)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to create booking' },
            { status: 500 }
        )
    }
}