import { ReactChild } from 'react';
import { NavLink } from 'react-router-dom';
import { CloseIcon } from './commons/icon/CloseIcon';
import { MaximiseIcon } from './commons/icon/MaximiseIcon';
import { MinimiseIcon } from './commons/icon/MinimiseIcon';
import { SlimeVRIcon } from './commons/icon/SimevrIcon';
import { appWindow } from '@tauri-apps/api/window';
import { ProgressBar } from './commons/ProgressBar';
import { Typography } from './commons/Typography';

export function TopBar({
  progress,
}: {
  children?: ReactChild;
  progress?: number;
}) {
  return (
    <div data-tauri-drag-region className="flex gap-2 h-[38px]">
      <div
        className="flex px-2 pb-1 mt-3 justify-around"
        data-tauri-drag-region
      >
        <div className="flex gap-1" data-tauri-drag-region>
          <NavLink
            to="/"
            className="flex justify-around flex-col select-all"
            data-tauri-drag-region
          >
            <SlimeVRIcon></SlimeVRIcon>
          </NavLink>
          <div className="flex justify-around flex-col" data-tauri-drag-region>
            <Typography>SlimeVR</Typography>
          </div>
          <div
            className="mx-2 flex justify-around flex-col text-standard-bold text-status-success bg-status-success bg-opacity-20 rounded-lg px-3"
            data-tauri-drag-region
          >
            v1.5.2
          </div>
        </div>
      </div>
      <div
        className="flex flex-grow flex-col justify-center px-10 h-full"
        data-tauri-drag-region
      >
        {progress !== undefined && (
          <ProgressBar progress={progress} height={3}></ProgressBar>
        )}
      </div>
      <div className="flex justify-end px-2 gap-2" data-tauri-drag-region>
        <div
          className="flex flex-col justify-around "
          onClick={() => appWindow.minimize()}
        >
          <MinimiseIcon className="rounded-full hover:bg-purple-gray-700"></MinimiseIcon>
        </div>
        <div
          className="flex flex-col justify-around "
          onClick={() => appWindow.toggleMaximize()}
        >
          <MaximiseIcon className="rounded-full hover:bg-purple-gray-700"></MaximiseIcon>
        </div>
        <div
          className="flex flex-col justify-around "
          onClick={() => appWindow.close()}
        >
          <CloseIcon className="rounded-full hover:bg-purple-gray-700"></CloseIcon>
        </div>
      </div>
    </div>
  );
}
