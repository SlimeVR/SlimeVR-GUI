import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DataFeedConfigT,
  DataFeedMessage,
  DataFeedUpdateT,
  DeviceDataMaskT,
  StartDataFeedT,
  TrackerDataMaskT,
} from 'solarxr-protocol';
import { useConfig } from './config';
import { useWebsocketAPI } from './websocket-api';

type AppStateAction = { type: 'datafeed'; value: DataFeedUpdateT };

export interface AppState {
  datafeed: DataFeedUpdateT;
}

export interface AppContext {
  state: AppState;
  dispatch: Dispatch<AppStateAction>;
}

export function reducer(state: AppState, action: AppStateAction) {
  switch (action.type) {
    case 'datafeed':
      return { ...state, datafeed: action.value };
    default:
      throw new Error(`unhandled state action ${action.type}`);
  }
}

export function useProvideAppContext(): AppContext {
  const { sendDataFeedPacket, useDataFeedPacket, isConnected } =
    useWebsocketAPI();
  const { config } = useConfig();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    datafeed: new DataFeedUpdateT(),
  });

  useEffect(() => {
    if (isConnected) {
      const trackerData = new TrackerDataMaskT();
      trackerData.position = true;
      trackerData.rotation = true;
      trackerData.info = true;
      trackerData.status = true;
      trackerData.temp = true;

      const dataMask = new DeviceDataMaskT();
      dataMask.deviceData = true;
      dataMask.trackerData = trackerData;

      const config = new DataFeedConfigT();
      config.dataMask = dataMask;
      config.minimumTimeSinceLast = 100;
      config.syntheticTrackersMask = trackerData;

      const startDataFeed = new StartDataFeedT();
      startDataFeed.dataFeeds = [config];
      sendDataFeedPacket(DataFeedMessage.StartDataFeed, startDataFeed);
    }
  }, [isConnected]);

  useEffect(() => {
    if (config && !config.doneOnboarding) {
      navigate('/onboarding/home');
    }
  }, [config]);

  useDataFeedPacket(
    DataFeedMessage.DataFeedUpdate,
    (packet: DataFeedUpdateT) => {
      dispatch({ type: 'datafeed', value: packet });
    }
  );

  return {
    state,
    dispatch,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppContextC = createContext<AppContext>(undefined as any);

export function useAppContext() {
  const context = useContext<AppContext>(AppContextC);
  if (!context) {
    throw new Error('useAppContext must be within a AppContext Provider');
  }
  return context;
}
