import {
  defineConfig,
  presetMini,
  presetUno,
  presetAttributify,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  rules: [
    [
      /^(?:text|font)-size-(.+)$/,
      ([_, num]) => ({
        "font-size": `${num}px`,
      }),
    ],
  ],
  presets: [presetMini(), presetUno(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
