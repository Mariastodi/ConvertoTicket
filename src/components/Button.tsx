import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'dark' | 'outline' | 'ghost'
type Size = 'md' | 'lg' | 'sm'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-yellow text-ink hover:bg-yellow-deep hover:text-paper',
  dark: 'bg-ink text-paper hover:bg-[#2a2620]',
  outline: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink hover:text-yellow-deep',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-5 text-[14.5px]',
  lg: 'h-14 px-7 text-[15.5px]',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth,
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const chamfer = variant === 'ghost' ? '' : 'ticket-notch-sm'
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold tracking-[-0.01em] transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${chamfer} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  )
}
