import { HotelDetails } from '@/components/hotel-details'
import { BookingForm } from '@/components/booking-form'

export default function HotelPage({ params }: { params: { id: string } }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <HotelDetails id={params.id} />
            <BookingForm hotelId={params.id} />
        </div>
    )
}
