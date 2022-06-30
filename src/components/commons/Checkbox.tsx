import classNames from 'classnames';
import { ReactChild, useMemo } from 'react';
import { Control, Controller } from 'react-hook-form';

export function CheckBox({
  label,
  variant = 'checkbox',
  control,
  outlined = true,
  name,
  ...props
}: {
  label: string | ReactChild;
  control: Control<any>;
  name: string;
  variant?: 'checkbox' | 'toggle';
  outlined?: boolean;
}) {
  const classes = useMemo(() => {
    const vriantsMap = {
      checkbox: {
        checkbox: classNames(
          'bg-background-50 border-background-50 rounded-md w-5 h-5 text-accent-background-30 focus:border-accent-background-40 focus:ring-transparent focus:ring-offset-transparent focus:outline-transparent'
        ),
        toggle: '',
        pin: '',
      },
      toggle: {
        checkbox: classNames('hidden'),
        toggle: classNames('w-10 h-4 rounded-full relative transition-colors'),
        pin: classNames('h-2 w-2 bg-background-10 rounded-full absolute m-1'),
      },
    };
    return vriantsMap[variant];
  }, [variant]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref } }) => (
        <div
          className={classNames(
            {
              'bg-background-60 rounded-lg px-3 text-white': outlined,
              'text-background-30': !outlined,
            },
            'flex items-center gap-3'
          )}
        >
          <label className="w-full py-3 flex gap-3 items-center text-standard-bold">
            <input
              ref={ref}
              onChange={onChange}
              checked={value}
              className={classes.checkbox}
              type="checkbox"
              {...props}
            />
            {variant === 'toggle' && (
              <div
                className={classNames(classes.toggle, {
                  'bg-accent-background-30': value,
                  'bg-background-50': !value,
                })}
              >
                <div
                  className={classNames(classes.pin, {
                    'left-0': !value,
                    'right-0': value,
                  })}
                ></div>
              </div>
            )}
            {label}
          </label>
        </div>
      )}
    />
  );
}
