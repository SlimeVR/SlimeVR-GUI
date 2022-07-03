import classNames from 'classnames';
import { ReactChild } from 'react';
import ReactModal from 'react-modal';

export function EmptyModal({
  children,
  ...props
}: { children?: ReactChild } & ReactModal.Props) {
  return (
    <ReactModal
      {...props}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      overlayClassName={classNames(
        'fixed top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center h-full bg-background-90 bg-opacity-60 z-20'
      )}
      className="mx-20 items-center my-20 focus:ring-transparent focus:ring-offset-transparent focus:outline-transparent outline-none"
    >
      {children}
    </ReactModal>
  );
}
