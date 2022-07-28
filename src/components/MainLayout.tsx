import { ReactNode } from 'react';
import { ResetType } from 'solarxr-protocol';
import { useLayout } from '../hooks/layout';
import { BVHButton } from './BVHButton';
import { Navbar } from './Navbar';
import { ResetButton } from './home/ResetButton';
import { TopBar } from './TopBar';
import classNames from 'classnames';

export function MainLayoutRoute({
  children,
  background = true,
  widgets = true,
}: {
  children: ReactNode;
  background?: boolean;
  widgets?: boolean;
}) {
  const { layoutHeight, ref } = useLayout<HTMLDivElement>();

  return (
    <>
      <TopBar></TopBar>
      <div ref={ref} className="flex-grow" style={{ height: layoutHeight }}>
        <div className="flex h-full pb-3">
          <Navbar></Navbar>
          <div className="flex gap-2 mr-3 w-full">
            <div
              className={classNames(
                'flex flex-grow gap-10 flex-col rounded-xl',
                background && 'bg-background-70'
              )}
            >
              {children}
            </div>
            {widgets && (
              <div className="flex flex-col px-4 w-[274px] gap-2 pt-4 rounded-xl overflow-y-auto bg-background-70">
                <div className="flex">
                  <ResetButton type={ResetType.Quick}></ResetButton>
                </div>
                <div className="flex">
                  <ResetButton type={ResetType.Full}></ResetButton>
                </div>
                <div className="flex">
                  <BVHButton></BVHButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
