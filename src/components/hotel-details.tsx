'use client'

import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from './ui/card'
import { Star } from 'lucide-react'

interface HotelDetailsProps {
    id: string
}

export function HotelDetails({ id }: HotelDetailsProps) {
    const { data: hotel, isLoading } = useQuery({
        queryKey: ['hotel', id],
        queryFn: async () => {
            const res = await fetch(`/api/hotels/${id}`)
            if (!res.ok) throw new Error('Failed to fetch hotel')
            return res.json()
        }
    })

    if (isLoading) return <div>Loading...</div>
    if (!hotel) return <div>Hotel not found</div>

    return (
        <Card className="mb-8">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold">{hotel.name}</h1>
                    <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-lg">{hotel.rating}</span>
                    </div>
                </div>
                <p className="text-gray-600">{hotel.address}</p>
            </CardHeader>
            <CardContent>
                <div className="relative h-96 w-full mb-6">
                    <Image
                        src={hotel.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'}
                        alt={hotel.name}
                        fill
                        sizes="100vw"
                        priority
                        className="object-cover rounded"
                    />
                </div>
                <p className="text-lg">{hotel.description}</p>
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Available Rooms</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hotel.rooms.map((room: any) => (
                            <Card key={room.id} className="p-4">
                                <h3 className="text-xl font-semibold">{room.type}</h3>
                                <p className="text-gray-600">Capacity: {room.capacity} guests</p>
                                <p className="text-lg font-bold mt-2">${room.price} per night</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}