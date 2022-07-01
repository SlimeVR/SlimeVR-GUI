import { ReactChild } from 'react';
import { useLayout } from '../../hooks/layout';
import { useOnboarding } from '../../hooks/onboarding';
import { TopBar } from '../TopBar';

export function OnboardingLayout({ children }: { children: ReactChild }) {
  const { layoutHeight, ref } = useLayout<HTMLDivElement>();
  const { progress } = useOnboarding();

  return (
    <>
      <TopBar progress={progress}></TopBar>
      <div
        ref={ref}
        className="flex-grow pt-10 mx-4"
        style={{ height: layoutHeight }}
      >
        {children}
      </div>
    </>
  );
}
