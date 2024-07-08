declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type GetArrayItemType<T extends unknown[]> = T extends Array<infer S>
  ? S
  : never;

declare type TargetContext = "_self" | "_blank";

declare type Extends<T, K> = T extends infer K ? true : false;

declare global {
  import { MessageApiInjection } from "naive-ui/es/message/src/message";
  interface Window {
    $message: MessageApiInjection;
  }
}
export {};
