import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface OnboardingContext {
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
  applyProgress: (value: number) => void;
}

export function useProvideOnboarding(): OnboardingContext {
  const [progress, setProgress] = useState(0);

  const applyProgress = (value: number) => {
    useEffect(() => {
      setProgress(value);
    }, []);
  };

  return {
    progress,
    setProgress,
    applyProgress,
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
