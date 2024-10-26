import { HotelList } from '@/components/hotel-list'
import { SearchForm } from '@/components/search-form'

export default function Home() {
  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Find Your Perfect Stay</h1>
        <SearchForm />
        <HotelList />
      </div>
  )
}