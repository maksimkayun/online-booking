'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Button } from './ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'

const bookingFormSchema = z.object({
    roomId: z.string(),
    checkIn: z.date(),
    checkOut: z.date(),
})

interface BookingFormProps {
    hotelId: string
}

export function BookingForm({ hotelId }: BookingFormProps) {
    const { data: session } = useSession()
    const router = useRouter()

    const { data: hotel } = useQuery({
        queryKey: ['hotel', hotelId],
        queryFn: async () => {
            const res = await fetch(`/api/hotels/${hotelId}`)
            if (!res.ok) throw new Error('Failed to fetch hotel')
            return res.json()
        }
    })

    const form = useForm<z.infer<typeof bookingFormSchema>>({
        resolver: zodResolver(bookingFormSchema),
        defaultValues: {
            checkIn: new Date(),
            checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000), // следующий день
        }
    })

    async function onSubmit(values: z.infer<typeof bookingFormSchema>) {
        if (!session) {
            router.push('/api/auth/signin')
            return
        }

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })

            if (!res.ok) throw new Error('Failed to create booking')

            router.push('/bookings')
        } catch (error) {
            console.error('Failed to create booking:', error)
        }
    }

    const { watch } = form
    const checkInDate = watch('checkIn')

    if (!hotel) return null

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="roomId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Room</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a room" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {hotel.rooms.map((room: any) => (
                                        <SelectItem key={room.id} value={room.id}>
                                            {room.type} - ${room.price}/night
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="checkIn"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Check in</FormLabel>
                            <FormControl>
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date: Date | null) => field.onChange(date || new Date())}
                                    minDate={new Date()}
                                    dateFormat="MMM d, yyyy"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholderText="Select check-in date"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="checkOut"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Check out</FormLabel>
                            <FormControl>
                                <DatePicker
                                    selected={field.value}
                                    onChange={(date: Date | null) => field.onChange(date || new Date())}
                                    minDate={checkInDate || new Date()}
                                    dateFormat="MMM d, yyyy"
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholderText="Select check-out date"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Book Now
                </Button>
            </form>
        </Form>
    )
    }