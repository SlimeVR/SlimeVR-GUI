import classNames from "classnames";
import { ReactChild, useMemo } from "react";
import { NavLink } from "react-router-dom";

export function Button({ children, variant, disabled, to, ...props }: { children: ReactChild, variant: 'primary', to?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const classes = useMemo(() => {
        const variantsMap  = {
            primary: classNames('text-field-title focus:ring-4 focus:outline-none focus:ring-primary-2', { 'bg-accent-background-20 hover:bg-accent-background-40': !disabled, 'bg-accent-background-20 hover:bg-accent-background-20 text-section-indicator': disabled }),
        }
        return classNames(variantsMap[variant], 'focus:ring-4 rounded-lg px-5 py-2.5 text-center');
    }, [variant, disabled])
    return (
        to ? <NavLink to={to} className={classes}>{children}</NavLink>
           : <button type="button" {...props} className={classes} disabled={disabled}>{children}</button>
    )
}