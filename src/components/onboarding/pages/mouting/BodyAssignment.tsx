import { useMemo } from 'react';
import { BodyPart } from 'solarxr-protocol';
import { FlatDeviceTracker, useAppContext } from '../../../../hooks/app';
import { BodyInteractions } from '../../../commons/BodyInteractions';
import { TrackerPartCard } from './TrackerPartCard';

export function BodyAssignment({ advanced }: { advanced: boolean }) {
  const { trackers } = useAppContext();

  const assignedTrakers = useMemo(
    () =>
      trackers.filter(
        ({ tracker }) => tracker.info?.bodyPart !== BodyPart.NONE
      ),
    [trackers]
  );

  const trackerPartGrouped = useMemo(
    () =>
      assignedTrakers.reduce<{ [key: number]: FlatDeviceTracker[] }>(
        (curr, td) => {
          const key = td.tracker.info?.bodyPart || BodyPart.NONE;
          return {
            ...curr,
            [key]: [...(curr[key] || []), td],
          };
        },
        {}
      ),
    [assignedTrakers]
  );

  const assignedRoles = useMemo(
    () =>
      assignedTrakers.map(
        ({ tracker }) => tracker.info?.bodyPart || BodyPart.NONE,
        {}
      ),
    [assignedTrakers]
  );

  return (
    <BodyInteractions
      assignedRoles={assignedRoles}
      leftControls={
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-3">
            {advanced && (
              <TrackerPartCard
                label="HMD"
                td={trackerPartGrouped[BodyPart.HMD]}
                role={BodyPart.HMD}
                direction="right"
              />
            )}
            {advanced && (
              <TrackerPartCard
                label="NECK"
                td={trackerPartGrouped[BodyPart.NECK]}
                role={BodyPart.NECK}
                direction="right"
              />
            )}
          </div>

          <div className="flex flex-col gap-3">
            {advanced && (
              <TrackerPartCard
                label="RIGHT SHOULDER"
                td={trackerPartGrouped[BodyPart.RIGHT_SHOULDER]}
                role={BodyPart.RIGHT_SHOULDER}
                direction="right"
              />
            )}
            <TrackerPartCard
              label="RIGHT UPPER ARM"
              td={trackerPartGrouped[BodyPart.RIGHT_UPPER_ARM]}
              role={BodyPart.RIGHT_UPPER_ARM}
              direction="right"
            />
          </div>
          <div className="flex flex-col gap-3">
            <TrackerPartCard
              label="RIGHT LOWER ARM"
              td={trackerPartGrouped[BodyPart.RIGHT_LOWER_ARM]}
              role={BodyPart.RIGHT_LOWER_ARM}
              direction="right"
            />

            {advanced && (
              <TrackerPartCard
                label="RIGHT HAND"
                td={trackerPartGrouped[BodyPart.RIGHT_HAND]}
                role={BodyPart.RIGHT_HAND}
                direction="right"
              />
            )}
          </div>
          <div className="flex flex-col gap-3">
            <TrackerPartCard
              label="RIGHT_UPPER_LEG"
              td={trackerPartGrouped[BodyPart.RIGHT_UPPER_LEG]}
              role={BodyPart.RIGHT_UPPER_LEG}
              direction="right"
            />

            <TrackerPartCard
              label="RIGHT LOWER LEG"
              td={trackerPartGrouped[BodyPart.RIGHT_LOWER_LEG]}
              role={BodyPart.RIGHT_LOWER_LEG}
              direction="right"
            />
            <TrackerPartCard
              label="RIGHT FOOT"
              td={trackerPartGrouped[BodyPart.RIGHT_FOOT]}
              role={BodyPart.RIGHT_FOOT}
              direction="right"
            />
          </div>
        </div>
      }
      rightControls={
        <div className="flex flex-col justify-between h-full">
          <TrackerPartCard
            label="CHEST"
            td={trackerPartGrouped[BodyPart.CHEST]}
            role={BodyPart.CHEST}
            direction="left"
          />

          <div className="flex flex-col gap-3">
            {advanced && (
              <TrackerPartCard
                label="LEFT SHOULDER"
                td={trackerPartGrouped[BodyPart.LEFT_SHOULDER]}
                role={BodyPart.LEFT_SHOULDER}
                direction="left"
              />
            )}

            <TrackerPartCard
              label="LEFT UPPER ARM"
              td={trackerPartGrouped[BodyPart.LEFT_UPPER_ARM]}
              role={BodyPart.LEFT_UPPER_ARM}
              direction="left"
            />
          </div>

          <div className="flex flex-col gap-3">
            <TrackerPartCard
              label="LEFT LOWER ARM"
              td={trackerPartGrouped[BodyPart.LEFT_LOWER_ARM]}
              role={BodyPart.LEFT_LOWER_ARM}
              direction="left"
            />
            {advanced && (
              <TrackerPartCard
                label="LEFT HAND"
                td={trackerPartGrouped[BodyPart.LEFT_HAND]}
                role={BodyPart.LEFT_HAND}
                direction="left"
              />
            )}
          </div>

          <div className="flex flex-col gap-3">
            <TrackerPartCard
              label="WAIST"
              td={trackerPartGrouped[BodyPart.WAIST]}
              role={BodyPart.WAIST}
              direction="left"
            />
            <TrackerPartCard
              label="HIP"
              td={trackerPartGrouped[BodyPart.HIP]}
              role={BodyPart.HIP}
              direction="left"
            />
          </div>
          <div className="flex flex-col gap-3">
            <TrackerPartCard
              label="LEFT UPPER LEG"
              td={trackerPartGrouped[BodyPart.LEFT_UPPER_LEG]}
              role={BodyPart.LEFT_UPPER_LEG}
              direction="left"
            />

            <TrackerPartCard
              label="LEFT LOWER LEG"
              td={trackerPartGrouped[BodyPart.LEFT_LOWER_LEG]}
              role={BodyPart.LEFT_LOWER_LEG}
              direction="left"
            />
            <TrackerPartCard
              label="LEFT FOOT"
              td={trackerPartGrouped[BodyPart.LEFT_FOOT]}
              role={BodyPart.LEFT_FOOT}
              direction="left"
            />
          </div>
        </div>
      }
    ></BodyInteractions>
  );
}
