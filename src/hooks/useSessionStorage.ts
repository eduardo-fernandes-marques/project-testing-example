import React from 'react';

export const INITIAL_VALUES = {
  KEY: 'object',
  PAYLOAD: {},
};

export type UseSessionStorage<T> = {
  key?: string;
  payload?: T;
};
export type Props<T> = [T, SetState<T>];

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export const useSessionStorage = <T>({
  key = INITIAL_VALUES.KEY,
  payload = INITIAL_VALUES.PAYLOAD as T,
}: UseSessionStorage<T>): Props<T> => {
  const readValue = React.useCallback((): T => {
    try {
      const item = window.sessionStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : payload;
    } catch (error) {
      /* istanbul ignore next */
      return payload;
    }
  }, [payload, key]);

  const [state, setState] = React.useState<T>(readValue);

  const setValue: SetState<T> = React.useCallback(
    (value) => {
      try {
        const result = value instanceof Function ? value(state) : value;

        window.sessionStorage.setItem(key, JSON.stringify(result));

        setState(result);

        // eslint-disable-next-line no-empty
      } catch (error) {}
    },
    [key, state]
  );

  return [state, setValue];
};
