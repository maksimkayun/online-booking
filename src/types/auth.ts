import { PrismaAdapter } from "@auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "./db"

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        session: async ({ session, user }) => {
            if (session?.user) {
                session.user.id = user.id
            }
            return session
        },
    },
    pages: {
        signIn: '/auth/signin',
    },
}