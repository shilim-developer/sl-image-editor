import { emitsBind } from "@/utils/utils";
import { computed } from "vue";

export const useExtendBindValue = <T, U extends { [key: string]: Function }>(
  props: T,
  emits?: [emitsData: U, emitsFunction: Function],
  attrs?: any,
) => {
  return computed(() => ({
    ...(attrs || {}),
    ...props,
    ...(emits ? emitsBind<U>(emits[0], emits[1]) : {}),
  }));
};
