import { ReactNode } from 'react'

interface CardProps {
    children: ReactNode
    className?: string
}

export function Card({ children, className }: CardProps) {
    return <div className={`bg-white shadow rounded ${className}`}>{children}</div>
}

interface CardHeaderProps {
    children: ReactNode
    className?: string
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return <div className={`border-b p-4 ${className}`}>{children}</div>
}

interface CardContentProps {
    children: ReactNode
    className?: string
}

export function CardContent({ children, className }: CardContentProps) {
    return <div className={`p-4 ${className}`}>{children}</div>
}

interface CardFooterProps {
    children: ReactNode
    className?: string
}

export function CardFooter({ children, className }: CardFooterProps) {
    return <div className={`border-t p-4 ${className}`}>{children}</div>
}