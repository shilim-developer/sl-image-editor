import { getEmitter } from "@/utils/mitt";
import { WPageType } from "./w-page-type";
import { PowerPartial } from "@/stores/modules/design/design-type";

export type WPageEvent = {
  CHANGE_INPUT_FORM: PowerPartial<WPageType>;
};
export const wPageEmitter = getEmitter<WPageEvent>();
export const useWPageEvent = <T extends keyof WPageEvent>(
  event: T,
  fun: (params: WPageEvent[T]) => void,
) => {
  wPageEmitter.on(event, fun);
  onBeforeUnmount(() => {
    wPageEmitter.off(event, fun);
  });
};
