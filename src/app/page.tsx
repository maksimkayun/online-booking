import { HotelList } from '@/components/hotel-list'
import { SearchForm } from '@/components/search-form'
import Image from 'next/image'

export default function Home() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[600px]">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d"
                        alt="Luxury Hotel"
                        fill
                        priority
                        className="object-cover brightness-50"
                    />
                </div>

                {/* Hero Content */}
                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-full flex flex-col justify-center items-center text-center text-white">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl">
                            Find Your Perfect Stay
                        </h1>
                        <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90">
                            Discover amazing places to stay around the world at the best prices
                        </p>
                    </div>
                </div>
            </div>

            {/* Search Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="transform -translate-y-24">
                    <SearchForm />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 -mt-8">
                {/* Featured Section */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Hotels</h2>
                            <p className="text-gray-600 mt-1">Handpicked properties for your comfort</p>
                        </div>
                    </div>
                    <HotelList />
                </div>

                {/* Why Choose Us Section */}
                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
                        <p className="text-gray-600">Find a lower price? We'll match it and give you an extra 10% off.</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
                        <p className="text-gray-600">Your payment and personal information is always protected.</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                        <p className="text-gray-600">Our team is here to help you whenever you need assistance.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}