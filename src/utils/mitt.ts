import mitt, { Emitter, EventType } from "mitt";
const emitter = mitt();

export const getEmitter = <T extends Record<EventType, unknown>>() =>
  emitter as Emitter<T>;
