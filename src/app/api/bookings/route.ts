import { prisma } from "@/lib/db"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
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
            }
        })

        return NextResponse.json(bookings)
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
    }
}