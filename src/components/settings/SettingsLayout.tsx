import { ReactChild } from 'react';
import { useLayout } from '../../hooks/layout';
import { Navbar } from '../Navbar';
import { TopBar } from '../TopBar';
import { SettingsSidebar } from './SettingsSidebar';

export function SettingsLayoutRoute({ children }: { children: ReactChild }) {
  const { layoutHeight, ref } = useLayout<HTMLDivElement>();

  return (
    <>
      <TopBar></TopBar>
      <div ref={ref} className="flex-grow" style={{ height: layoutHeight }}>
        <div className="flex h-full pb-4">
          <Navbar></Navbar>
          <div className="h-full w-full mr-4 gap-3 grid grid-flow-col">
            <SettingsSidebar></SettingsSidebar>
            <div className="w-full flex flex-col overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
