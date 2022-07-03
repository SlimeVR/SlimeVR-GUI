import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { BodyPart } from 'solarxr-protocol';
import { useAppContext } from '../../../../hooks/app';
import { useOnboarding } from '../../../../hooks/onboarding';
import { ArrowLink } from '../../../commons/ArrowLink';
import { Button } from '../../../commons/Button';
import { CheckBox } from '../../../commons/Checkbox';
import { EmptyModal } from '../../../commons/Modal';
import { TipBox } from '../../../commons/TipBox';
import { Typography } from '../../../commons/Typography';
import { BodyAssignment } from './BodyAssignment';

function TrackerSelection() {
  return <EmptyModal isOpen></EmptyModal>;
}

export function MountingPage() {
  const { trackers } = useAppContext();
  const { applyProgress } = useOnboarding();
  const { control, getValues } = useForm<{ advanced: boolean }>({
    defaultValues: { advanced: false },
  });

  const { advanced } = getValues();

  applyProgress(0.5);

  const assignedTrakers = useMemo(
    () =>
      trackers.filter(
        ({ tracker }) => tracker.info?.bodyPart !== BodyPart.NONE
      ),
    [trackers]
  );

  return (
    <>
      <TrackerSelection></TrackerSelection>
      <div className="flex flex-col gap-5 h-full items-center w-full justify-center">
        <div className="flex flex-col w-full h-full justify-center items-center">
          <div className="flex gap-8">
            <div className="flex flex-col max-w-sm gap-3">
              <ArrowLink to="/onboarding/wifi-creds" direction="left">
                Go Back to Wifi Credentials
              </ArrowLink>
              <Typography variant="main-title">Assign trackers</Typography>
              <Typography color="secondary">
                Let's choose which tracker goes where. Click on a location where
                you want to place a tracker
              </Typography>
              <div className="flex gap-1">
                <Typography>{assignedTrakers.length}</Typography>
                <Typography color="secondary">
                  of {trackers.length} trackers assigned
                </Typography>
              </div>
              <TipBox>
                Not sure which tracker is which? Shake a tracker and it will
                highlight the corresponding item.
              </TipBox>
              <CheckBox
                control={control}
                label="Show advanced assign locations"
                name="advanced"
                variant="toggle"
              ></CheckBox>
            </div>
            <div className="flex flex-col flex-grow gap-3 rounded-xl fill-background-50">
              <BodyAssignment advanced={advanced}></BodyAssignment>
            </div>
          </div>
        </div>
        <div className="w-full py-4 flex flex-row">
          <div className="flex flex-grow">
            <Button variant="secondary" to="/">
              Skip setup
            </Button>
          </div>
          <div className="flex gap-3">
            <Button type="submit" variant="primary">
              I Assigned all the trackers
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
