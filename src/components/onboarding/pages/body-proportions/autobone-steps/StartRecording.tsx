import { useAutobone } from '../../../../../hooks/autobone';
import { Button } from '../../../../commons/Button';
import { TipBox } from '../../../../commons/TipBox';
import { Typography } from '../../../../commons/Typography';

export function StartRecording({ nextStep }: { nextStep: () => void }) {
  const { startRecording } = useAutobone();

  const start = () => {
    nextStep();
    startRecording();
  };

  return (
    <>
      <div className="flex flex-col flex-grow">
        <div className="flex flex-grow flex-col gap-4 max-w-sm">
          <Typography variant="main-title" bold>
            Make some moves
          </Typography>
          <div>
            <Typography color="secondary">
              We're now going to record some specific poses and
            </Typography>
            <Typography color="secondary">
              moves. these will be prompted in the next screen.
            </Typography>
          </div>
          <div className="flex">
            <TipBox>
              Make sure you do not move your heels, they must stay at the same
              place while recording.
            </TipBox>
          </div>
        </div>

        <div className="flex">
          <Button variant="primary" onClick={start}>
            Start Recording
          </Button>
        </div>
      </div>
    </>
  );
}
