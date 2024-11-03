import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const guests = searchParams.get('guests')

    try {
        const hotels = await prisma.hotel.findMany({
            where: {
                address: location ? {
                    contains: location,
                    mode: 'insensitive',
                } : undefined,
                rooms: {
                    some: {
                        capacity: guests ? {
                            gte: parseInt(guests)
                        } : undefined,
                        bookings: {
                            none: {
                                OR: [
                                    {
                                        checkIn: {
                                            lte: checkOut ? new Date(checkOut) : undefined,
                                        },
                                        checkOut: {
                                            gte: checkIn ? new Date(checkIn) : undefined,
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
            include: {
                rooms: true,
            },
        })

        return NextResponse.json(hotels)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch hotels' },
            { status: 500 }
        )
    }
}