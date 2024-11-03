import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HotelCardProps {
    hotel: {
        id: string
        name: string
        description: string
        rating: number
        address: string
        images: string[]
        rooms: Array<{
            capacity: number
            price: number
        }>
    }
}

export function HotelCard({ hotel }: HotelCardProps) {
    const minPrice = Math.min(...hotel.rooms.map(room => room.price))
    const maxCapacity = Math.max(...hotel.rooms.map(room => room.capacity))

    return (
        <article className="hotel-card">
            <div className="hotel-card-image">
                <Image
                    src={hotel.images[0]}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
                <div className="hotel-card-rating">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{hotel.rating.toFixed(1)}</span>
                </div>
            </div>

            <div className="hotel-card-content">
                <h3 className="hotel-card-title">{hotel.name}</h3>

                <div className="hotel-card-location">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm truncate">{hotel.address}</span>
                </div>

                <div className="mt-2 flex items-center gap-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">Up to {maxCapacity} guests</span>
                </div>

                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{hotel.description}</p>

                <div className="mt-4 flex items-center justify-between">
                    <div className="hotel-card-price">
                        <span className="hotel-card-price-amount">${minPrice}</span>
                        <span className="hotel-card-price-period">/night</span>
                    </div>

                    <Button asChild className="px-6">
                        <Link href={`/hotels/${hotel.id}`}>
                            View Details
                        </Link>
                    </Button>
                </div>
            </div>
        </article>
    )
}