import { useEffect, useMemo, useRef, useState } from 'react';

export function useLayout<T extends HTMLElement>() {
  const [layoutHeight, setLayoutHeigt] = useState(window.innerHeight);
  const [layoutWidth, setLayoutWidth] = useState(window.innerWidth);
  const ref = useRef<T | null>(null);

  const computeLayoutHeight = (windowHeight: number, windowWidth: number) => {
    if (ref.current) {
      setLayoutHeigt(windowHeight - ref.current.getBoundingClientRect().top);
      setLayoutWidth(windowWidth - ref.current.getBoundingClientRect().left);
    }
  };

  const onWindowResize = () => {
    computeLayoutHeight(window.innerHeight, window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    computeLayoutHeight(window.innerHeight, window.innerWidth);
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  });

  return {
    layoutHeight,
    layoutWidth,
    ref,
  };
}

export function useElemHeight<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [height, setHeight] = useState(0);

  const computeHeight = () => {
    if (ref.current) {
      setHeight(ref.current?.getBoundingClientRect().height || 0);
    }
  };

  const onWindowResize = () => {
    computeHeight();
  };

  useEffect(() => {
    window.addEventListener('resize', onWindowResize);
    computeHeight();
    return () => {
      window.removeEventListener('resize', onWindowResize);
    };
  });

  return {
    ref,
    height,
  };
}
