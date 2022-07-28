import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CloseSerialRequestT,
  OpenSerialRequestT,
  RpcMessage,
  SerialUpdateResponseT,
  SetWifiRequestT,
} from 'solarxr-protocol';
import { useLayout } from '../../../hooks/layout';
import { useWebsocketAPI } from '../../../hooks/websocket-api';
import { Button } from '../../commons/Button';
import { Input } from '../../commons/Input';
import { Typography } from '../../commons/Typography';

export interface WifiForm {
  ssid: string;
  password: string;
}

export function Serial() {
  const {
    layoutHeight,
    layoutWidth,
    ref: consoleRef,
  } = useLayout<HTMLDivElement>();

  const { useRPCPacket, sendRPCPacket } = useWebsocketAPI();
  // const consoleRef = useRef<HTMLPreElement>(null);
  const [consoleContent, setConsole] = useState('');
  const [isSerialOpen, setSerialOpen] = useState(false);

  useEffect(() => {
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
        setTimeout(() => {
          sendRPCPacket(RpcMessage.OpenSerialRequest, new OpenSerialRequestT());
        }, 1000);
      }

      if (!data.closed) {
        setSerialOpen(true);
      }

      if (data.log && consoleRef.current) {
        setConsole((console) => console + data.log);
      }
    }
  );

  useEffect(() => {
    if (consoleRef.current)
      consoleRef.current.scrollTo({
        top: consoleRef.current.scrollHeight,
      });
  }, [consoleContent]);

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
    <div className="flex flex-col h-full gap-2 flex-grow bg-background-70 p-5 rounded-md overflow-hidden">
      <Typography variant="main-title">Serial Console</Typography>
      <Typography color="secondary">
        This is a live information feed for serial communication. May be useful
        if you need to know the firmware is acting up.
      </Typography>
      <div className="w-full h-full overflow-x-auto overflow-y-auto bg-background-80 rounded-lg p-3">
        <div
          ref={consoleRef}
          style={{ height: layoutHeight, width: layoutWidth }}
          className="flex select-text"
        >
          <pre>
            {isSerialOpen
              ? consoleContent
              : 'Connection to serial lost, Reconnecting...'}
          </pre>
        </div>
      </div>
    </div>
  );
}
