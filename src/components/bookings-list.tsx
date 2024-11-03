'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader } from './ui/card'
import { format } from 'date-fns'

export function BookingsList() {
    const { data: bookings, isLoading } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await fetch('/api/bookings')
            if (!res.ok) throw new Error('Failed to fetch bookings')
            return res.json()
        }
    })

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="space-y-4">
            {bookings?.map((booking: any) => (
                <Card key={booking.id}>
                    <CardHeader>
                        <h2 className="text-xl font-semibold">{booking.room.hotel.name}</h2>
                        <p className="text-gray-600">{booking.room.type}</p>
                    </CardHeader>
                    <CardContent>
                        <p>Check-in: {format(new Date(booking.checkIn), 'PP')}</p>
                        <p>Check-out: {format(new Date(booking.checkOut), 'PP')}</p>
                        <p className="mt-2 font-semibold">Status: {booking.status}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}