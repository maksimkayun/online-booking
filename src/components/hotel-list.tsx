'use client'

import { useQuery } from '@tanstack/react-query'
import { HotelCard } from './hotel-card'

export function HotelList() {
    const { data: hotels, isLoading } = useQuery({
        queryKey: ['hotels'],
        queryFn: async () => {
            const res = await fetch('/api/hotels')
            if (!res.ok) throw new Error('Failed to fetch hotels')
            return res.json()
        }
    })

    if (isLoading) return <div>Loading...</div>

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels?.map((hotel: any) => (
                <HotelCard key={hotel.id} hotel={hotel} />
            ))}
        </div>
    )
}