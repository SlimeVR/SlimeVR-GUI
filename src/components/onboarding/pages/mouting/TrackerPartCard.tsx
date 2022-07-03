import classNames from 'classnames';
import { BodyPart } from 'solarxr-protocol';
import { FlatDeviceTracker } from '../../../../hooks/app';
import { Typography } from '../../../commons/Typography';

export function TrackerPartCard({
  td,
  label,
  role,
  direction,
}: {
  td: FlatDeviceTracker[];
  label: string;
  role: BodyPart;
  direction: 'left' | 'right';
}) {
  return (
    <div
      className={classNames(
        'flex flex-col gap-1 control px-2 w-32',
        direction === 'left' ? 'items-start' : 'items-end'
      )}
      id={BodyPart[role]}
    >
      <Typography color="secondary">{label}</Typography>
      {td?.map(({ tracker }, index) => (
        <Typography key={index}>
          {`${tracker.info?.customName || tracker.info?.displayName}` ||
            'no name'}
        </Typography>
      ))}
      {!td && <Typography>Unassigned</Typography>}
    </div>
  );
}
