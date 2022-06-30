import classNames from 'classnames';
import React, { ReactChild, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { LoaderIcon } from './icon/LoaderIcon';

export function Button({
  children,
  variant,
  disabled,
  to,
  loading = false,
  state = {},
  icon,
  rounded = false,
  ...props
}: {
  children?: ReactChild;
  icon?: ReactChild;
  variant: 'primary' | 'secondary' | 'tierciary';
  to?: string;
  loading?: boolean;
  rounded?: boolean;
  state?: any;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = useMemo(() => {
    const variantsMap = {
      primary: classNames({
        'bg-accent-background-30 hover:bg-accent-background-20 text-standard text-background-10':
          !disabled,
        'bg-accent-background-40 hover:bg-accent-background-40 cursor-not-allowed text-accent-background-10':
          disabled,
      }),
      secondary: classNames({
        'bg-background-60 hover:bg-background-50 text-standard text-background-10':
          !disabled,
        'bg-background-60 hover:bg-background-60 cursor-not-allowed text-background-40':
          disabled,
      }),
      tierciary: classNames({
        'bg-background-50 hover:bg-background-40 text-standard text-background-10':
          !disabled,
        'bg-background-50 hover:bg-background-50 cursor-not-allowed text-background-40':
          disabled,
      }),
    };
    return classNames(
      variantsMap[variant],
      'focus:ring-4 text-center relative',
      {
        'rounded-full p-2 text-center min-h-[35px] min-w-[35px]': rounded,
        'rounded-md px-5 py-2.5': !rounded,
      }
    );
  }, [variant, disabled]);

  const ButtonContent = () => (
    <>
      <div
        className={classNames(
          { 'opacity-0': loading },
          'flex flex-row gap-2 justify-center'
        )}
      >
        {icon && (
          <div className="flex justify-center items-center fill-background-10 w-5 h-5">
            {icon}
          </div>
        )}
        {children}
      </div>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <LoaderIcon youSpinMeRightRoundBabyRightRound></LoaderIcon>
        </div>
      )}
    </>
  );

  return to ? (
    <NavLink to={to} className={classes} state={state}>
      <ButtonContent />
    </NavLink>
  ) : (
    <button type="button" {...props} className={classes} disabled={disabled}>
      <ButtonContent />
    </button>
  );
}
