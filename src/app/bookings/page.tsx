import { BookingsList } from '@/components/bookings-list'

export default function BookingsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>
            <BookingsList />
        </div>
    )
}