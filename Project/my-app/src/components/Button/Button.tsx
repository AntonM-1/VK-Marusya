import clsx from "clsx"

type Props = {
    variant?: 'accent' | 'small' | 'modal'
    as?: React.ElementType
    to?: string
    children: React.ReactNode
    onClick?: () => void
    className?: string
}

const Button = ({ variant, as: Component = 'button', to, children, onClick, className }: Props) => {
    return (
        <Component
            type={Component === 'button' ? 'button' : undefined}
            onClick={onClick}
            className={clsx('btn', variant && `btn--${variant}`, className)}
            {... (to && { to })}
        >
            {children}
        </Component>
    )
}

export default Button