import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star } from 'lucide-react'

interface HotelCardProps {
    hotel: {
        id: string
        name: string
        description: string
        rating: number
        price: number
        image: string
    }
}

export function HotelCard({ hotel }: HotelCardProps) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                    <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{hotel.name}</h3>
                    <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1">{hotel.rating}</span>
                    </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{hotel.description}</p>
                <p className="text-lg font-bold">
                    From ${hotel.price} <span className="text-sm font-normal">per night</span>
                </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <Link href={`/hotels/${hotel.id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}