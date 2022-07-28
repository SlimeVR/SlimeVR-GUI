import { useOnboarding } from '../../../../hooks/onboarding';
import { ArrowLink } from '../../../commons/ArrowLink';
import { Button } from '../../../commons/Button';
import { Typography } from '../../../commons/Typography';

export function AutomaticProportionsPage() {
  const { applyProgress, skipSetup, state } = useOnboarding();

  applyProgress(0.9);

  return (
    <>
      <div className="flex flex-col gap-5 h-full items-center w-full justify-center">
        <div className="flex flex-col w-full h-full justify-center px-20">
          <div className="flex gap-8">
            <div className="flex flex-col max-w-lg gap-3">
              {!state.alonePage && (
                <ArrowLink to="/onboarding/reset-tutorial" direction="left">
                  Go Back to Reset tutorial
                </ArrowLink>
              )}
              <Typography variant="main-title">
                Calibrating body proportions
                <span className="mx-2 p-1 bg-accent-background-30 text-standard rounded-md">
                  Work in progress
                </span>
              </Typography>
              <Typography color="secondary">Autobone goes here</Typography>
            </div>
          </div>
        </div>
        <div className="w-full py-4 flex flex-row">
          <div className="flex flex-grow">
            {!state.alonePage && (
              <Button variant="secondary" to="/" onClick={skipSetup}>
                Skip setup
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              state={{ alonePage: state.alonePage }}
              to="/onboarding/body-proportions/manual"
            >
              Manual calibration
            </Button>
            {!state.alonePage && (
              <Button variant="primary" to="/onboarding/done">
                Continue
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
