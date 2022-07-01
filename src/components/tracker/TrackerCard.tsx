import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BodyPart,
  DeviceDataT,
  TrackerDataT,
  TrackerStatus as TrackerStatusEnum,
} from 'solarxr-protocol';
import { QuaternionFromQuatT } from '../../maths/quaternion';
import { Typography } from '../commons/Typography';
import { TrackerBattery } from './TrackerBattery';
import { TrackerWifi } from './TrackerWifi';
import { TrackerStatus } from './TrackerStatus';
import { FootIcon } from '../commons/icon/FootIcon';

function TrackerBig({
  device,
  tracker,
  trackerName,
}: {
  tracker: TrackerDataT;
  device?: DeviceDataT;
  trackerName: string | Uint8Array;
}) {
  return (
    <div className="flex flex-col justify-center rounded-md py-3 pr-4 pl-4 w-full gap-2 box-border my-8 px-6 h-52">
      <div className="flex justify-center fill-background-10">
        <FootIcon></FootIcon>
      </div>
      <div className="flex justify-center">
        <Typography bold>{trackerName}</Typography>
      </div>
      <TrackerStatus status={tracker.status}></TrackerStatus>
      <div className="flex text-default justify-center gap-5 flex-wrap">
        {device && device.hardwareStatus && (
          <>
            {device.hardwareStatus.batteryPctEstimate && (
              <TrackerBattery
                value={device.hardwareStatus.batteryPctEstimate / 100}
                disabled={tracker.status === TrackerStatusEnum.DISCONNECTED}
              />
            )}
            <div className="flex gap-2">
              {device.hardwareStatus.rssi && device.hardwareStatus.ping && (
                <TrackerWifi
                  rssi={device.hardwareStatus.rssi}
                  ping={device.hardwareStatus.ping}
                  disabled={tracker.status === TrackerStatusEnum.DISCONNECTED}
                ></TrackerWifi>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TrackerSmol({
  device,
  tracker,
  trackerName,
}: {
  tracker: TrackerDataT;
  device?: DeviceDataT;
  trackerName: string | Uint8Array;
}) {
  return (
    <div className="flex rounded-md py-5 px-5 w-full gap-4 box-border">
      <div className="flex flex-col justify-center items-center fill-background-10">
        <FootIcon></FootIcon>
      </div>
      <div className="flex flex-col flex-grow">
        <Typography bold>{trackerName}</Typography>
        <TrackerStatus status={tracker.status}></TrackerStatus>
      </div>
      {device && device.hardwareStatus && (
        <>
          <div className="flex flex-col justify-center items-center">
            {device.hardwareStatus.batteryPctEstimate && (
              <TrackerBattery
                value={device.hardwareStatus.batteryPctEstimate / 100}
                disabled={tracker.status === TrackerStatusEnum.DISCONNECTED}
              />
            )}
          </div>
          <div className="flex flex-col justify-center items-center">
            {device.hardwareStatus.rssi && device.hardwareStatus.ping && (
              <TrackerWifi
                rssi={device.hardwareStatus.rssi}
                ping={device.hardwareStatus.ping}
                disabled={tracker.status === TrackerStatusEnum.DISCONNECTED}
              ></TrackerWifi>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export function TrackerCard({
  tracker,
  device,
  smol = false,
}: {
  tracker: TrackerDataT;
  device?: DeviceDataT;
  smol?: boolean;
}) {
  const previousRot = useRef<{ x: number; y: number; z: number; w: number }>(
    tracker.rotation || { x: 0, y: 0, z: 0, w: 1 }
  );
  const [velocity, setVelocity] = useState<number>(0);
  const [rots, setRotation] = useState<number[]>([]);

  useEffect(() => {
    if (tracker.rotation) {
      const rot = QuaternionFromQuatT(tracker.rotation).mul(
        QuaternionFromQuatT(previousRot.current).inverse()
      );
      const dif = Math.min(1, (rot.x ** 2 + rot.y ** 2 + rot.z ** 2) * 2.5);
      // Use sum of rotation of last 3 frames (0.3sec) for smoother movement and better detection of slow movement.
      if (rots.length === 3) {
        rots.shift();
      }
      rots.push(dif);
      setRotation(rots);
      setVelocity(
        Math.min(
          1,
          Math.max(
            0,
            rots.reduce((a, b) => a + b)
          )
        )
      );
      previousRot.current = tracker.rotation;
    }
  }, [tracker.rotation]);

  const trackerName = useMemo(() => {
    if (device?.customName) return device.customName;
    if (tracker.info?.bodyPart) return BodyPart[tracker.info?.bodyPart];
    return device?.hardwareInfo?.displayName || 'NONE';
  }, [tracker.info, device?.customName, device?.hardwareInfo?.displayName]);

  return (
    <div
      className="bg-background-60 rounded-lg"
      style={{
        boxShadow: `0px 0px ${velocity * 15}px ${velocity * 15}px #183951`,
      }}
    >
      {smol && (
        <TrackerSmol
          tracker={tracker}
          device={device}
          trackerName={trackerName}
        ></TrackerSmol>
      )}
      {!smol && (
        <TrackerBig
          tracker={tracker}
          device={device}
          trackerName={trackerName}
        ></TrackerBig>
      )}
    </div>
  );
}
