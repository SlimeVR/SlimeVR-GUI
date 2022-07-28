import { useNavigate } from 'react-router-dom';
import { TrackerDataT } from 'solarxr-protocol';
import { useTrackers } from '../../hooks/tracker';
import { Typography } from '../commons/Typography';
import { TrackerCard } from '../tracker/TrackerCard';

export function Home() {
  const { useAssignedTrackers, useUnassignedTrackers } = useTrackers();
  const navigate = useNavigate();

  const asignedTrackers = useAssignedTrackers();
  const unasignedTrackers = useUnassignedTrackers();

  const sendToSettings = (tracker: TrackerDataT) => {
    navigate(
      `/tracker/${tracker.trackerId?.trackerNum}/${tracker.trackerId?.deviceId?.id}`
    );
  };

  return (
    <div className="overflow-y-auto flex flex-col gap-2">
      <div className="flex px-5 pt-5">
        <Typography variant="section-title">Assigned Trackers</Typography>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3  px-8 my-4">
        {asignedTrackers.map(({ tracker, device }, index) => (
          <TrackerCard
            key={index}
            tracker={tracker}
            device={device}
            onClick={() => sendToSettings(tracker)}
            smol
            interactable
          />
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
      {/* {unasignedTrackers.length > 0 && (
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
      )} */}
    </div>
  );
}
