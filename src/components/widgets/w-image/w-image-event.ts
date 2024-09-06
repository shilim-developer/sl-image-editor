import { getEmitter } from "@/utils/mitt";
import { WImageType } from "./w-image-type";
import { PowerPartial } from "@/stores/modules/design/design-type";

export type WImageEvent = {
  CHANGE_INPUT_FORM: PowerPartial<WImageType>;
};
export const wImageEmitter = getEmitter<WImageEvent>();
export const useWImageEvent = <T extends keyof WImageEvent>(
  event: T,
  fun: (params: WImageEvent[T]) => void,
) => {
  wImageEmitter.on(event, fun);
  onBeforeUnmount(() => {
    wImageEmitter.off(event, fun);
  });
};
