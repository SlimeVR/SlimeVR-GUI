import classNames from 'classnames';
import { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { BodyPart, TrackerDataT } from 'solarxr-protocol';
import { FlatDeviceTracker } from '../../hooks/app';
import { useTracker } from '../../hooks/tracker';
import { Typography } from '../commons/Typography';

function Tracker({
  tracker,
  updateVelocity,
}: {
  tracker: TrackerDataT;
  updateVelocity: (velocity: number) => void;
}) {
  const { useVelocity } = useTracker(tracker);

  const velocity = useVelocity();

  useEffect(() => {
    updateVelocity(velocity);
  }, [velocity]);

  return (
    <Typography>
      {`${tracker.info?.customName || tracker.info?.displayName}` || 'no name'}
    </Typography>
  );
}

export function TrackerPartCard({
  td,
  label,
  role,
  direction,
  onlyAssigned,
  onClick,
}: {
  td: FlatDeviceTracker[];
  label: string;
  role: BodyPart;
  onlyAssigned: boolean;
  direction: 'left' | 'right';
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  const [velocities, setVelocities] = useState<number[]>([]);

  const updateVelocity = (vel: number) => {
    if (velocities.length > 3) {
      velocities.shift();
    }
    velocities.push(vel);
    setVelocities(velocities);
  };

  const globalVelocity = useMemo(
    () => velocities.reduce((curr, v) => curr + v, 0) / (td?.length || 1),
    [velocities, td]
  );

  const showCard = useMemo(
    () => (onlyAssigned && td && td.length > 0) || !onlyAssigned,
    [onlyAssigned, td]
  );

  return (
    (showCard && (
      <div
        className={classNames(
          'flex flex-col gap-1 control w-32 hover:bg-background-50 p-2 rounded-md',
          direction === 'left' ? 'items-start' : 'items-end'
        )}
        id={BodyPart[role]}
        onClick={onClick}
        style={{
          boxShadow: `0px 0px ${globalVelocity * 3}px ${
            globalVelocity * 3
          }px #183951`,
        }}
      >
        <Typography color="secondary">{label}</Typography>
        {td?.map(({ tracker }, index) => (
          <Tracker
            tracker={tracker}
            key={index}
            updateVelocity={(vel) => updateVelocity(vel)}
          />
        ))}
        {!td && <Typography>Unassigned</Typography>}
      </div>
    )) || <></>
  );
}
