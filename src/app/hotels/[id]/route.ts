import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const hotel = await prisma.hotel.findUnique({
            where: {
                id: params.id,
            },
            include: {
                rooms: true,
            },
        })

        if (!hotel) {
            return NextResponse.json(
                { error: 'Hotel not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(hotel)
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch hotel' },
            { status: 500 }
        )
    }
}