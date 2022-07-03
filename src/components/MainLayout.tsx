import { ReactNode } from 'react';
import { ResetType } from 'solarxr-protocol';
import { useLayout } from '../hooks/layout';
import { BVHButton } from './BVHButton';
import { Navbar } from './Navbar';
import { ResetButton } from './home/ResetButton';
import { TopBar } from './TopBar';

export function MainLayoutRoute({ children }: { children: ReactNode }) {
  const { layoutHeight, ref } = useLayout<HTMLDivElement>();

  return (
    <>
      <TopBar></TopBar>
      <div ref={ref} className="flex-grow" style={{ height: layoutHeight }}>
        <div className="flex h-full pb-3">
          <Navbar></Navbar>
          <div className="flex gap-2 mr-3 w-full">
            <div className="flex flex-grow gap-10 flex-col rounded-xl bg-background-70">
              {children}
            </div>
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
          </div>
        </div>
      </div>
    </>
  );
}
