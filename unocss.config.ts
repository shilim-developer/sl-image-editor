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
  shortcuts: [
    [/^ph-\[?(.*?)\]?$/, ([, size]) => `pl-${size} pr-${size}`],
    [/^pv-\[?(.*?)\]?$/, ([, size]) => `pt-${size} pb-${size}`],
  ],
  presets: [presetMini(), presetUno(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
