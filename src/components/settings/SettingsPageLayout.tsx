import classNames from 'classnames';
import { ReactChild } from 'react';
import { GearIcon } from '../commons/icon/GearIcon';

export function SettingsPageLayout({
  children,
  className,
  ...props
}: { children: ReactChild } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={classNames(
        'bg-background-70 rounded-lg p-8 flex gap-8',
        className
      )}
      {...props}
    >
      <div className="flex">
        <div className="w-10 h-10 bg-accent-background-40 flex justify-center items-center rounded-full fill-background-10">
          <GearIcon></GearIcon>
        </div>
      </div>
      <div className="flex-col">{children}</div>
    </div>
  );
}
