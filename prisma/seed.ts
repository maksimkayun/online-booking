import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // Создаем отели
    const hotels = await Promise.all([
        prisma.hotel.create({
            data: {
                name: "Luxury Resort & Spa",
                description: "Experience ultimate luxury in our 5-star resort with stunning ocean views",
                address: "123 Beach Road, Paradise City",
                rating: 4.8,
                images: [
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd"
                ],
                rooms: {
                    create: [
                        {
                            type: "Deluxe Ocean View",
                            price: 350.00,
                            capacity: 2,
                            available: true
                        },
                        {
                            type: "Premium Suite",
                            price: 550.00,
                            capacity: 4,
                            available: true
                        }
                    ]
                }
            }
        }),
        prisma.hotel.create({
            data: {
                name: "City Center Hotel",
                description: "Modern comfort in the heart of downtown",
                address: "456 Main Street, Metropolitan",
                rating: 4.5,
                images: [
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd"
                ],
                rooms: {
                    create: [
                        {
                            type: "Standard Room",
                            price: 150.00,
                            capacity: 2,
                            available: true
                        },
                        {
                            type: "Business Suite",
                            price: 250.00,
                            capacity: 2,
                            available: true
                        }
                    ]
                }
            }
        }),
        prisma.hotel.create({
            data: {
                name: "Mountain View Lodge",
                description: "Cozy retreat with breathtaking mountain views",
                address: "789 Highland Road, Mountain Valley",
                rating: 4.6,
                images: [
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd"
                ],
                rooms: {
                    create: [
                        {
                            type: "Cabin Suite",
                            price: 200.00,
                            capacity: 3,
                            available: true
                        },
                        {
                            type: "Family Lodge",
                            price: 300.00,
                            capacity: 6,
                            available: true
                        }
                    ]
                }
            }
        })
    ])

    console.log({ hotels })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })