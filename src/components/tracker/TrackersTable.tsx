import classNames from 'classnames';
import { ReactChild } from 'react';
import {
  TrackerDataT,
  TrackerStatus as TrackerStatusEnum,
} from 'solarxr-protocol';
import { FlatDeviceTracker } from '../../hooks/app';
import { useTracker } from '../../hooks/tracker';
import { FootIcon } from '../commons/icon/FootIcon';
import { Typography } from '../commons/Typography';
import { TrackerBattery } from './TrackerBattery';
import { TrackerStatus } from './TrackerStatus';
import { TrackerWifi } from './TrackerWifi';

export function TrackerNameCol({ tracker }: { tracker: TrackerDataT }) {
  const { useName } = useTracker(tracker);

  const name = useName();

  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-col justify-center items-center fill-background-10">
        <FootIcon></FootIcon>
      </div>
      <div className="flex flex-col flex-grow whitespace-nowrap">
        <Typography bold>{name}</Typography>
        <TrackerStatus status={tracker.status}></TrackerStatus>
      </div>
    </div>
  );
}

export function TrackerRotCol({ tracker }: { tracker: TrackerDataT }) {
  const { useRotation } = useTracker(tracker);

  const rot = useRotation();

  return (
    <Typography color="secondary">
      <span className="whitespace-nowrap">
        {`${rot.x.toFixed(0)} / ${rot.y.toFixed(0)} / ${rot.z.toFixed(0)}`}
      </span>
    </Typography>
  );
}

export function RowContainer({
  children,
  rounded = 'none',
}: {
  children: ReactChild;
  rounded?: 'left' | 'right' | 'none';
}) {
  return (
    <div
      className={classNames(
        'h-14 bg-background-60 flex flex-col justify-center px-3',
        rounded === 'left' && 'rounded-l-lg',
        rounded === 'right' && 'rounded-r-lg'
      )}
    >
      {children}
    </div>
  );
}

export function TrackersTable({
  flatTrackers,
}: {
  flatTrackers: FlatDeviceTracker[];
}) {
  return (
    <div className="flex w-full overflow-x-auto py-2">
      <div className="flex flex-col gap-2">
        <div className="flex px-3">Tracker</div>
        {flatTrackers.map(({ tracker }, index) => (
          <RowContainer key={index} rounded="left">
            <TrackerNameCol tracker={tracker}></TrackerNameCol>
          </RowContainer>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex px-3">Type</div>
        {flatTrackers.map(({ device }, index) => (
          <RowContainer key={index}>
            <Typography color="secondary">
              {device?.hardwareInfo?.manufacturer || '--'}
            </Typography>
          </RowContainer>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex px-3">Battery</div>
        {flatTrackers.map(({ device, tracker }, index) => (
          <RowContainer key={index}>
            {(device &&
              device.hardwareStatus &&
              device.hardwareStatus.batteryPctEstimate && (
                <TrackerBattery
                  value={device.hardwareStatus.batteryPctEstimate / 100}
                  disabled={tracker.status === TrackerStatusEnum.DISCONNECTED}
                />
              )) || <></>}
          </RowContainer>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex px-3">Ping</div>
        {flatTrackers.map(({ device, tracker }, index) => (
          <RowContainer key={index}>
            {(device &&
              device.hardwareStatus &&
              device.hardwareStatus.rssi &&
              device.hardwareStatus.ping && (
                <TrackerWifi
                  rssi={device.hardwareStatus.rssi}
                  ping={device.hardwareStatus.ping}
                  disabled={tracker.status === TrackerStatusEnum.DISCONNECTED}
                ></TrackerWifi>
              )) || <></>}
          </RowContainer>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex px-3 whitespace-nowrap">Rotation X/Y/Z</div>
        {flatTrackers.map(({ tracker }, index) => (
          <RowContainer key={index}>
            <TrackerRotCol tracker={tracker} />
          </RowContainer>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex px-3 whitespace-nowrap">Position X/Y/Z</div>
        {flatTrackers.map(({ tracker }, index) => (
          <RowContainer key={index}>
            <Typography color="secondary">
              <span className="whitespace-nowrap">
                {`${tracker.position?.x.toFixed(
                  0
                )} / ${tracker.position?.y.toFixed(
                  0
                )} / ${tracker.position?.z.toFixed(0)}`}
              </span>
            </Typography>
          </RowContainer>
        ))}
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex px-3">URL</div>
        {flatTrackers.map(({ device }, index) => (
          <RowContainer key={index} rounded="right">
            <Typography color="secondary">{device?.customName}</Typography>
          </RowContainer>
        ))}
      </div>
    </div>
  );
}
