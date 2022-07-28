import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import ReactModal from 'react-modal';
import { useElemHeight, useLayout } from '../../../../hooks/layout';
import { Button } from '../../../commons/Button';
import { FootIcon } from '../../../commons/icon/FootIcon';
import { Typography } from '../../../commons/Typography';

function MoutingOrientationCard({
  orientation,
  onClick,
}: {
  orientation: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <div
      onClick={onClick}
      className="h-32 bg-background-60 rounded-md flex justify-between p-4 hover:bg-background-50"
    >
      <div className="flex flex-col justify-center">
        <Typography variant="main-title">{orientation}</Typography>
      </div>
      <div className="flex flex-col justify-center fill-white">
        <FootIcon width={58}></FootIcon>
      </div>
    </div>
  );
}

export function MountingSelectionMenu({
  isOpen = true,
  onClose,
  onDirectionSelected,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDirectionSelected: (direction: number) => void;
}) {
  const { ref: refTrackers, layoutHeight: trackersHeight } =
    useLayout<HTMLDivElement>();
  const { ref: refOptions, height: optionsHeight } =
    useElemHeight<HTMLDivElement>();

  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      onRequestClose={onClose}
      overlayClassName={classNames(
        'fixed top-0 right-0 left-0 bottom-0 flex flex-col items-center w-full h-full bg-black bg-opacity-90 z-20'
      )}
      className={classNames(
        'focus:ring-transparent focus:ring-offset-transparent focus:outline-transparent outline-none mt-20 z-10'
      )}
    >
      <div className="flex w-full h-full flex-col ">
        <Typography variant="main-title" bold>
          Where do you want this tracker to be?
        </Typography>
        <div
          className="flex w-full flex-col flex-grow items-center gap-3 justify-center"
          ref={refTrackers}
          style={{ height: trackersHeight - optionsHeight }}
        >
          <div className="grid grid-cols-2 grid-rows-2 gap-6 w-full">
            <MoutingOrientationCard
              orientation="LEFT"
              onClick={() => onDirectionSelected(90)}
            />
            <MoutingOrientationCard
              orientation="RIGHT"
              onClick={() => onDirectionSelected(-90)}
            />
            <MoutingOrientationCard
              orientation="FRONT"
              onClick={() => onDirectionSelected(180)}
            />
            <MoutingOrientationCard
              orientation="BACK"
              onClick={() => onDirectionSelected(0)}
            />
          </div>
        </div>
      </div>
      <div
        className="flex w-full justify-between absolute bottom-0 left-0 p-10 z-0"
        onClick={onClose}
        ref={refOptions}
      >
        <div className="flex flex-col justify-end pointer-events-auto">
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </ReactModal>
  );
}
