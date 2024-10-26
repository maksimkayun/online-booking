import { ButtonHTMLAttributes, forwardRef } from 'react'
import classNames from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'primary', className, children, ...props }, ref) => {
        const baseStyles = 'px-4 py-2 rounded focus:outline-none focus:ring'
        const variantStyles = {
            primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300',
            secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300',
        }

        return (
            <button
                ref={ref}
                className={classNames(baseStyles, variantStyles[variant], className)}
                {...props}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export { Button }