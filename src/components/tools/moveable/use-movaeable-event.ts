import { getEmitter } from "@/utils/mitt";
import {
  DraggableEvents,
  ResizableEvents,
  RotatableEvents,
} from "vue3-moveable";

export type MoveableEvent = DraggableEvents & RotatableEvents & ResizableEvents;

export const useMoveableEvent = <T extends keyof MoveableEvent>(
  event: T,
  fun: (params: MoveableEvent[T]) => void,
) => {
  const emitter = getEmitter<any>();
  emitter.on(event, fun);
  onBeforeUnmount(() => {
    emitter.off(event, fun);
  });
};
