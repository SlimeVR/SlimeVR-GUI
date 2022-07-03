import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CloseSerialRequestT,
  OpenSerialRequestT,
  RpcMessage,
  SerialUpdateResponseT,
  SetWifiRequestT,
  TrackerStatus,
} from 'solarxr-protocol';
import { useAppContext } from '../../../hooks/app';
import { useLayout } from '../../../hooks/layout';
import { useOnboarding } from '../../../hooks/onboarding';
import { useWebsocketAPI } from '../../../hooks/websocket-api';
import { ArrowLink } from '../../commons/ArrowLink';
import { Button } from '../../commons/Button';
import { LoaderIcon } from '../../commons/icon/LoaderIcon';
import { TipBox } from '../../commons/TipBox';
import { Typography } from '../../commons/Typography';
import { TrackerCard } from '../../tracker/TrackerCard';

const BOTTOM_HEIGHT = 80;
type ConnectionStatus =
  | 'CONNECTING'
  | 'CONNECTED'
  | 'HANDSHAKE'
  | 'ERROR'
  | 'START-CONNECTING';

const statusLabelMap = {
  ['CONNECTING']: 'Sending wifi credentials',
  ['CONNECTED']: 'Connected to WiFi',
  ['ERROR']: 'Unable to connect to Wifi',
  ['START-CONNECTING']: 'Looking for trackers',
  ['HANDSHAKE']: 'Connected to the Server',
};

export function ConnectTrackersPage() {
  const { layoutHeight, ref } = useLayout<HTMLDivElement>();
  const { trackers } = useAppContext();
  const { applyProgress, state } = useOnboarding();
  const navigate = useNavigate();
  const { sendRPCPacket, useRPCPacket } = useWebsocketAPI();
  const [isSerialOpen, setSerialOpen] = useState(false);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('START-CONNECTING');

  applyProgress(0.4);

  const connectedTrackers = useMemo(
    () =>
      trackers.filter(
        ({ tracker }) => tracker.status !== TrackerStatus.DISCONNECTED
      ),
    [trackers]
  );

  useEffect(() => {
    if (!state.wifi) {
      navigate('/onboarding/wifi-creds');
    }

    sendRPCPacket(RpcMessage.OpenSerialRequest, new OpenSerialRequestT());
    return () => {
      sendRPCPacket(RpcMessage.CloseSerialRequest, new CloseSerialRequestT());
    };
  }, []);

  useRPCPacket(
    RpcMessage.SerialUpdateResponse,
    (data: SerialUpdateResponseT) => {
      if (data.closed) {
        setSerialOpen(false);
        setConnectionStatus('START-CONNECTING');
        setTimeout(() => {
          sendRPCPacket(RpcMessage.OpenSerialRequest, new OpenSerialRequestT());
        }, 1000);
      }

      if (!data.closed && !isSerialOpen) {
        setSerialOpen(true);
        setConnectionStatus('START-CONNECTING');
      }

      if (data.log) {
        const log = data.log as string;
        if (connectionStatus === 'START-CONNECTING' && state.wifi) {
          setConnectionStatus('CONNECTING');
          if (!state.wifi) return;
          const wifi = new SetWifiRequestT();
          wifi.ssid = state.wifi.ssid;
          wifi.password = state.wifi.password;
          sendRPCPacket(RpcMessage.SetWifiRequest, wifi);
        }

        if (log.includes('Connected successfully to SSID')) {
          setConnectionStatus('CONNECTED');
        }

        if (log.includes('Handshake successful')) {
          setConnectionStatus('HANDSHAKE');
          setTimeout(() => {
            setConnectionStatus('START-CONNECTING');
          }, 3000);
        }

        if (
          // eslint-disable-next-line prettier/prettier
          log.includes("Can't connect from any credentials")
        ) {
          setConnectionStatus('ERROR');
        }
      }
    }
  );

  useEffect(() => {
    const id = setInterval(() => {
      if (!isSerialOpen)
        sendRPCPacket(RpcMessage.OpenSerialRequest, new OpenSerialRequestT());
      else clearInterval(id);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [isSerialOpen, sendRPCPacket]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-10 w-full max-w-5xl">
        <div className="flex flex-col w-96">
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
            <ArrowLink to="/settings/serial" direction="right" variant="boxed">
              I'm having trouble connecting!
            </ArrowLink>
          </div>
          <TipBox>
            Not sure which tracker is which? Shake a tracker and it will
            highlight the corresponding item.
          </TipBox>

          <div
            className={classNames(
              'rounded-xl bg-background-70 h-16 flex gap-2 p-3 lg:w-full mt-4',
              connectionStatus === 'ERROR' && 'border-2 border-status-critical'
            )}
          >
            <div className="flex flex-col justify-center fill-background-10">
              <LoaderIcon
                youSpinMeRightRoundBabyRightRound={connectionStatus !== 'ERROR'}
              ></LoaderIcon>
            </div>
            <div className="flex flex-col">
              <Typography bold>USB Tracker</Typography>
              <Typography color="secondary">
                {statusLabelMap[connectionStatus]}
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow">
          <Typography color="secondary" bold>
            {connectedTrackers.length} trackers connected
          </Typography>

          <div
            className="flex-grow overflow-y-scroll"
            ref={ref}
            style={{ height: layoutHeight - BOTTOM_HEIGHT }}
          >
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-2 mx-3 pt-3">
              {Array.from({
                ...connectedTrackers,
                length: Math.max(trackers.length, 20),
              }).map((tracker, index) => (
                <div key={index}>
                  {!tracker && (
                    <div className="rounded-xl bg-background-70 h-16"></div>
                  )}
                  {tracker && (
                    <TrackerCard
                      tracker={tracker.tracker}
                      device={tracker.device}
                      smol
                    ></TrackerCard>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ height: BOTTOM_HEIGHT }}
        className="flex items-center w-full"
      >
        <div className="w-full flex">
          <div className="flex flex-grow">
            <Button variant="secondary" to="/">
              Skip setup
            </Button>
          </div>
          <div className="flex gap-3">
            <Button variant="primary" to="/onboarding/mounting">
              I connected all my trackers
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
