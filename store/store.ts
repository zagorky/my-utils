import type { EventEmitterType } from './event-emitter.ts';
import { createEventEmitter } from './event-emitter.ts';

// types
export type StoreObject<T> = Pick<EventEmitterType<{ update: T }>, 'on' | 'off'> & {
  useSelector: <R>(selector: (s: T) => R) => R;
  getData: () => T;
  update: (data: Partial<T>) => void;
  on<E extends keyof { update: T }>(event: E, callback: (data: { update: T }[E]) => void): void;
  off<E extends keyof { update: T }>(event: E, callback: (data: { update: T }[E]) => void): void;
};

// add stores in store, emit store elem and update

// function
function createAppStore<T>(data: T): StoreObject<T> {
  let storeData = structuredClone(data);

  const emitter = createEventEmitter<{ update: T }>();

  const update = (newData: Partial<T>): void => {
    storeData = { ...storeData, ...newData };
    emitter.emit('update', storeData);
  };

  return {
    useSelector: <R>(selector: (s: T) => R) => selector(storeData),
    getData: (): T => storeData,
    on: (event, callback) => emitter.on(event, callback),
    off: (event, callback) => emitter.off(event, callback),
    update,
  };
}

export { createAppStore };
