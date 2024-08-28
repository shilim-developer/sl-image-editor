import { inputNumberProps } from "naive-ui";

const { ...newInputNumberProps } = inputNumberProps;
export const slInputNumberProps = {
  ...newInputNumberProps,
};

export const slInputNumberEmits = {
  endInput: (val: Number) => val instanceof Number,
};
