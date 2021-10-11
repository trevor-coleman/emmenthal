import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export type AnimationState = 'entering' | 'entered' | 'exiting' | 'exited';

export function useTransitionState(
  duration: number = 200
): [
  AnimationState | undefined,
  Dispatch<SetStateAction<AnimationState | undefined>>
] {
  const [state, setState] = useState<AnimationState>();

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (state === 'entering') {
      timerId = setTimeout(() => setState('entered'), duration);
    } else if (state === 'exiting') {
      timerId = setTimeout(() => setState('exited'), duration);
    }

    return () => {
      timerId && clearTimeout(timerId);
    };
  });

  return [state, setState];
}

export function useTransitionControl(
  duration?: number
): [AnimationState | undefined, () => void, () => void] {
  const [state, setState] = useTransitionState(duration);
  const enter = () => {
    if (state !== 'exiting') {
      setState('entering');
    }
  };
  const exit = () => {
    if (state !== 'entering') {
      setState('exiting');
    }
  };
  return [state, enter, exit];
}
