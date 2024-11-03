'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { HotelCard } from './hotel-card'

export function HotelList() {
    const searchParams = useSearchParams()

    const { data: hotels, isLoading } = useQuery({
        queryKey: ['hotels', searchParams.toString()],
        queryFn: async () => {
            const res = await fetch(`/api/hotels?${searchParams.toString()}`)
            if (!res.ok) throw new Error('Failed to fetch hotels')
            return res.json()
        }
    })

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    )

    if (!hotels?.length) {
        return (
            <div className="text-center py-8">
                <h2 className="text-xl font-semibold mb-2">No hotels found</h2>
                <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel: any) => (
                <HotelCard key={hotel.id} hotel={hotel} />
            ))}
        </div>
    )
}