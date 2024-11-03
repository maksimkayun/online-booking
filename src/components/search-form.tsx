'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Search, Calendar, Users } from 'lucide-react'

const searchFormSchema = z.object({
    location: z.string().min(2, 'Location must be at least 2 characters'),
    checkIn: z.date(),
    checkOut: z.date(),
    guests: z.number().min(1).max(10),
})

type SearchFormValues = z.infer<typeof searchFormSchema>

export function SearchForm() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const form = useForm<SearchFormValues>({
        resolver: zodResolver(searchFormSchema),
        defaultValues: {
            location: searchParams.get('location') || '',
            guests: parseInt(searchParams.get('guests') || '1'),
            checkIn: searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')!) : new Date(),
            checkOut: searchParams.get('checkOut')
                ? new Date(searchParams.get('checkOut')!)
                : new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
    })

    function onSubmit(values: SearchFormValues) {
        const params = new URLSearchParams()
        params.set('location', values.location)
        params.set('checkIn', values.checkIn.toISOString())
        params.set('checkOut', values.checkOut.toISOString())
        params.set('guests', values.guests.toString())

        router.push(`/?${params.toString()}`)
    }

    const { watch } = form
    const checkInDate = watch('checkIn')

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg -mt-8 relative z-10 mx-4 lg:mx-auto max-w-6xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <FormControl>
                                            <Input
                                                placeholder="Where are you going?"
                                                {...field}
                                                className="pl-9"
                                            />
                                        </FormControl>
                                    </div>
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
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <FormControl>
                                            <DatePicker
                                                selected={field.value}
                                                onChange={(date: Date | null) => field.onChange(date || new Date())}
                                                minDate={new Date()}
                                                dateFormat="MMM d, yyyy"
                                                className="w-full pl-9 px-3 py-2 border rounded-md"
                                                placeholderText="Select date"
                                            />
                                        </FormControl>
                                    </div>
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
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <FormControl>
                                            <DatePicker
                                                selected={field.value}
                                                onChange={(date: Date | null) => field.onChange(date || new Date())}
                                                minDate={checkInDate || new Date()}
                                                dateFormat="MMM d, yyyy"
                                                className="w-full pl-9 px-3 py-2 border rounded-md"
                                                placeholderText="Select date"
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="guests"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Guests</FormLabel>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                max={10}
                                                className="pl-9"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" size="lg" className="w-full md:w-auto">
                            Search Hotels
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}