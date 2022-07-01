import { useLayout } from '../../../hooks/layout';
import { useOnboarding } from '../../../hooks/onboarding';
import { ArrowLink } from '../../commons/ArrowLink';
import { Button } from '../../commons/Button';
import { TipBox } from '../../commons/TipBox';
import { Typography } from '../../commons/Typography';

const BOTTOM_HEIGHT = 80;

export function ConnectTrackersPage() {
  const { layoutHeight, ref } = useLayout<HTMLDivElement>();
  const { applyProgress } = useOnboarding();

  applyProgress(0.4);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col w-full h-full justify-center items-center">
        <div className="flex gap-10 h-full ">
          <div className="flex flex-col max-w-sm">
            <ArrowLink to="/onboarding/wifi-creds">
              Go Back to WiFi credentials
            </ArrowLink>
            <Typography variant="main-title">Connect trackers</Typography>
            <Typography color="secondary">
              Now onto the fun part, connecting all the trackers!
            </Typography>
            <Typography color="secondary">
              Simply connect all that aren't connected yet, through a USB port.
            </Typography>
            <div className="flex flex-col gap-2 py-5">
              <ArrowLink
                to="/onboarding/connect"
                direction="right"
                variant="boxed"
              >
                I have other types of trackers
              </ArrowLink>
              <ArrowLink
                to="/onboarding/connect"
                direction="right"
                variant="boxed"
              >
                I'm having trouble connecting!
              </ArrowLink>
            </div>
            <TipBox>
              Not sure which tracker is which? Shake a tracker and it will
              highlight the corresponding item.
            </TipBox>
          </div>
          <div className="flex flex-col gap-3">
            <Typography color="secondary" bold>
              3 trackers connected
            </Typography>
            <div
              className="flex-grow overflow-y-scroll"
              ref={ref}
              style={{ height: layoutHeight - BOTTOM_HEIGHT }}
            >
              <div className="grid grid-cols-2 gap-3 ">
                {Array.from({ length: 40 }).map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-background-70 w-80 h-14"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: BOTTOM_HEIGHT }} className="flex items-center">
        <div className="w-full flex flex-row">
          <div className="flex flex-grow">
            <Button variant="secondary" to="/">
              Skip setup
            </Button>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" to="/onboarding/connect">
              I connected all trackers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
