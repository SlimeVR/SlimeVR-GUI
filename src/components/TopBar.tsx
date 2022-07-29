import { ReactChild } from 'react';
import { NavLink } from 'react-router-dom';
import { CloseIcon } from './commons/icon/CloseIcon';
import { MaximiseIcon } from './commons/icon/MaximiseIcon';
import { MinimiseIcon } from './commons/icon/MinimiseIcon';
import { SlimeVRIcon } from './commons/icon/SimevrIcon';
import { appWindow } from '@tauri-apps/api/window';
import { ProgressBar } from './commons/ProgressBar';
import { Typography } from './commons/Typography';
import packagejson from '../../package.json';

export function TopBar({
  progress,
}: {
  children?: ReactChild;
  progress?: number;
}) {
  return (
    <div data-tauri-drag-region className="flex gap-2 h-[38px] z-50">
      <div
        className="flex px-2 pb-1 mt-3 justify-around z-50"
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
            v{packagejson.version}
          </div>
        </div>
      </div>
      <div
        className="flex flex-grow items-center h-full justify-center z-50"
        data-tauri-drag-region
      >
        <div
          className="flex max-w-xl h-full items-center w-full"
          data-tauri-drag-region
        >
          {progress !== undefined && (
            <ProgressBar progress={progress} height={3} parts={3}></ProgressBar>
          )}
        </div>
      </div>
      <div className="flex justify-end px-2 gap-2 z-50" data-tauri-drag-region>
        <div
          className="flex flex-col justify-around"
          onClick={() => appWindow.minimize()}
        >
          <MinimiseIcon className="rounded-full"></MinimiseIcon>
        </div>
        <div
          className="flex flex-col justify-around"
          onClick={() => appWindow.toggleMaximize()}
        >
          <MaximiseIcon className="rounded-full"></MaximiseIcon>
        </div>
        <div
          className="flex flex-col justify-around"
          onClick={() => appWindow.close()}
        >
          <CloseIcon className="rounded-full"></CloseIcon>
        </div>
      </div>
    </div>
  );
}
