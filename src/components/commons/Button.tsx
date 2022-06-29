import classNames from "classnames";
import { ReactChild, useMemo } from "react";
import { NavLink } from "react-router-dom";

export function Button({ children, variant, disabled, to, ...props }: { children: ReactChild, variant: 'primary' | 'secondary', to?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const classes = useMemo(() => {
        const variantsMap  = {
            primary: classNames(
                { 
                    'bg-accent-background-30 hover:bg-accent-background-20 text-standard': !disabled,
                    'bg-accent-background-40 hover:bg-accent-background-40 cursor-not-allowed text-accent-background-10': disabled,
                }
            ),
            secondary: classNames(
                { 
                    'bg-background-60 hover:bg-background-50 text-standard': !disabled,
                    'bg-background-60 hover:bg-background-60 cursor-not-allowed text-background-40': disabled,
                }
            ),
        }
        return classNames(variantsMap[variant], 'focus:ring-4 rounded-md px-5 py-2.5 text-center');
    }, [variant, disabled])
    return (
        to ? <NavLink to={to} className={classes}>{children}</NavLink>
           : <button type="button" {...props} className={classes} disabled={disabled}>{children}</button>
    )
}