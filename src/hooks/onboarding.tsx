import {
  createContext,
  Reducer,
  useContext,
  useEffect,
  useReducer,
} from 'react';

type OnboardingAction =
  | { type: 'progress'; value: number }
  | { type: 'wifi-creds'; ssid: string; password: string };

interface OnboardingState {
  progress: number;
  wifi?: { ssid: string; password: string };
}

export interface OnboardingContext {
  state: OnboardingState;
  applyProgress: (value: number) => void;
  setWifiCredentials: (ssid: string, password: string) => void;
}

export function reducer(state: OnboardingState, action: OnboardingAction) {
  switch (action.type) {
    case 'wifi-creds':
      return {
        ...state,
        wifi: { ssid: action.ssid, password: action.password },
      };
    case 'progress':
      return {
        ...state,
        progress: action.value,
      };
    default:
      throw new Error(`unhandled state action ${(action as any).type}`);
  }
}

export function useProvideOnboarding(): OnboardingContext {
  const [state, dispatch] = useReducer<
    Reducer<OnboardingState, OnboardingAction>
  >(reducer, {
    progress: 0,
  });

  return {
    state,
    applyProgress: (value: number) => {
      useEffect(() => {
        dispatch({ type: 'progress', value });
      }, []);
    },
    setWifiCredentials: (ssid: string, password: string) => {
      console.log('ssid', ssid);
      dispatch({ type: 'wifi-creds', ssid, password });
    },
  };
}

export const OnboardingContextC = createContext<OnboardingContext>(
  undefined as any
);

export function useOnboarding() {
  const context = useContext<OnboardingContext>(OnboardingContextC);
  if (!context) {
    throw new Error(
      'useOnboarding must be within a OnboardingContext Provider'
    );
  }
  return context;
}
