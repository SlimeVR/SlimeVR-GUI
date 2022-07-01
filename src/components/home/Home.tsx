import { useMemo } from 'react';
import { BodyPart, DeviceDataT, TrackerDataT } from 'solarxr-protocol';
import { useAppContext } from '../../hooks/app';
import { Typography } from '../commons/Typography';
import { TrackerCard } from '../tracker/TrackerCard';

interface FlatDeviceTracker {
  device?: DeviceDataT;
  tracker: TrackerDataT;
}

export function Home() {
  const { state } = useAppContext();

  const trackers = useMemo(
    () =>
      (state.datafeed?.devices || []).reduce<FlatDeviceTracker[]>(
        (curr, device) => [
          ...curr,
          ...device.trackers.map((tracker) => ({ tracker, device })),
        ],
        []
      ),
    [state]
  );

  const asignedTrackers = useMemo(
    () =>
      trackers.filter(({ tracker: { info } }) => {
        return info && info.bodyPart !== BodyPart.NONE;
      }),
    [trackers]
  );

  const unasignedTrackers = useMemo(
    () =>
      trackers.filter(({ tracker: { info } }) => {
        return info && info.bodyPart === BodyPart.NONE;
      }),
    [trackers]
  );

  return (
    <div className="overflow-y-auto flex flex-col gap-2">
      <div className="flex px-5 pt-5">
        <Typography variant="section-title">Assigned Trackers</Typography>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-5 sm:grid-cols-1 px-8 my-4">
        {asignedTrackers.map(({ tracker, device }, index) => (
          <TrackerCard key={index} tracker={tracker} device={device} smol />
        ))}
      </div>
      {/* {syntheticlist.length > 0 &&
                <>
                    <div className="flex px-5 pt-3">
                        <Typography>External Trackers</Typography>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-5 sm:grid-cols-1 px-8">
                        {syntheticlist.map((tracker, index) => <TrackerCard key={index} tracker={tracker} />)}
                    </div>
                </>

            } */}
      {unasignedTrackers.length > 0 && (
        <>
          <div className="flex px-5 pt-3">
            <Typography>Unassigned Trackers</Typography>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-5 sm:grid-cols-1 px-8">
            {unasignedTrackers.map(({ tracker, device }, index) => (
              <TrackerCard key={index} tracker={tracker} device={device} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
