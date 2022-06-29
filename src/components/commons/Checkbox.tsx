import classNames from 'classnames';
import { forwardRef, ReactChild, useMemo, useState } from 'react'

export const CheckBox = forwardRef<HTMLInputElement, { label: string | ReactChild, variant?: 'checkbox' | 'toggle' }>(({ label, variant = 'checkbox', ...props }, ref) => {
    const [checked, setChecked] = useState(false);

    const classes = useMemo(() => {
        const vriantsMap = {
            checkbox: {
                checkbox:  classNames('bg-background-50 border-background-50 rounded-md w-5 h-5 text-accent-background-30 focus:border-accent-background-40 focus:ring-transparent focus:ring-offset-transparent focus:outline-transparent'),
                toggle: '',
                pin: '',
            },
            toggle: {
                checkbox:  classNames('hidden'),
                toggle: classNames('w-12 h-4 rounded-full relative transition-colors', { 'bg-accent-background-30': checked, 'bg-background-50': !checked }),
                pin: classNames('h-2 w-2 bg-background-10 rounded-full absolute m-1', { 'left-0': !checked,  'right-0': checked})
            }
        }
        return vriantsMap[variant];
    }, [checked, variant])

    const handleChange = () => {
        setChecked(!checked)
    }


    return (
        <div className="flex items-center gap-3">
            <label className="w-full py-3 text-background-30 flex gap-3 items-center">
                <input ref={ref} checked={checked} onChange={handleChange} className={classes.checkbox} type="checkbox" {...props} />
                {variant === 'toggle' &&
                    <div className={classes.toggle}>
                        <div className={classes.pin}></div>
                    </div>
                }
                {label}
            </label>
        </div>
    )
});